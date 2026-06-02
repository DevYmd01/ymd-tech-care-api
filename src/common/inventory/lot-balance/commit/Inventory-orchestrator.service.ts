import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
// import { AllocationLine } from './allocation.types';
import { IcOptionReader } from '../../option/infrastructure/ic-option.reader';
import { PolicyBuilder } from '../../inventory-policy/policy-builder';
import { StockCommitService } from '../../lot-balance/commit/stock-commit.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UomConversionService } from '@/common/uom/item-uom/service/uom-conversion.service';

@Injectable()
export class InventoryOrchestratorService {

     constructor(
      private readonly prisma: PrismaService,
      private readonly uomConversionService: UomConversionService,
   ) {}


    async process( tx: Prisma.TransactionClient, input:{
        // ---- getOption ----
        system_document_code: string,
        doc_type_no?: number,

        item_uom_id: number,


        // doc_type: string,
        ref_doc_no?: string,

        // ---- commit ----
        lot_id?: number,
        item_lot_balance_id: number,
        qty: number,

   } ){

//     console.log(
//   'uomConversionService = ',
//   this.uomConversionService
// );

    // ===================================================
    // หาค่า qty จำนวนมารตฐาน 
    // ===================================================
    const qtyBase = await this.uomConversionService.toBaseQty(
      input.item_uom_id,
      input.qty,
    );


    // console.log('Test qtyBase: ', qtyBase);




      // ==================================================
      // 1. READ OPTION
      // ==================================================
      const option =
        await IcOptionReader.getOption(
          input.system_document_code, 
          input.doc_type_no
        );

            const  transactionType = option?.stock_effect_ic
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

          qty: Number(qtyBase),
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

        reference_no: input.ref_doc_no,


        available_sign: policy.on_hand_sign,
      },
      tx
        );

        console.log('Test result: ', result);

      return {
        success: true,
        result
      };
    }
}
