import { PrismaClient } from '@prisma/client';
// import { AllocationLine } from './allocation.types';
import { IcOptionReader } from '../../option/infrastructure/ic-option.reader';
import { PolicyBuilder } from '../../inventory-policy/policy-builder';
import { StockCommitService } from '../../lot-balance/commit/stock-commit.service';

const prisma = new PrismaClient();

export class InventoryOrchestratorService {

    static async process(input:{
        // ---- getOption ----
        system_document_code: string,
        doc_type_no?: number,

        // doc_type: string,
        // ref_doc_no?: string,

        // ---- commit ----
        lot_id?: number,
        item_lot_balance_id: number,
        qty: number,

   } ){

        return prisma.$transaction(async () => {

      // ==================================================
      // 1. READ OPTION
      // ==================================================
      const option =
        await IcOptionReader.getOption(input.system_document_code, input.doc_type_no);
            let  transactionType = option?.stock_effect_ic
            console.log('Test option: ', option);

      // ==================================================
      // 2. BUILD POLICY
      // ==================================================
      const policy =
        PolicyBuilder.build({
        transaction_type: transactionType
        });
        console.log('Test policy: ', policy);

      // ==================================================
      // 3. SKIP IF NO STOCK EFFECT
      // ==================================================
      if (policy.affect_on_hand === false) {
        return {
          skipped: true,
          reason: 'NO STOCK EFFECT'
        };
      }

      // ==================================================
      // 4. (OPTIONAL) FIFO / ALLOCATION LOGIC
      // ==================================================
    //   const allocations = input.allocations;
      // future: FIFOEngine.run()

      // ==================================================
      // 5. COMMIT STOCK
      // ==================================================
      const result =
        await StockCommitService.commit(
         // ==================================================
      // ALLOCATIONS
      // ==================================================
      [
        {
          lot_id: Number(input.lot_id),

          item_lot_balance_id: Number(input.item_lot_balance_id),

          qty: Number(input.qty),
        },
      ],

      // ==================================================
      // POLICY
      // ==================================================
      {
        document_type: input.system_document_code,

        transaction_type: policy.document_type,

        on_hand_sign: policy.on_hand_sign,

        reserved_sign: 0,

        available_sign: policy.on_hand_sign,
      },
        );

        console.log('Test result: ', result);

      return {
        success: true,
        result
      };
        });
    }
}
