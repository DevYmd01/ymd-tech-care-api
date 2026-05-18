import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StockTransactionType, StockRefDocType } from '../../../enums/stock-balance-type.enum';
import { StockTransactionService } from '../../../../stock-transaction/stock-transaction.service';
import { StockBalanceService } from '../../../stock-balance.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdjustStockService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly stockTransactionService: StockTransactionService,
        private readonly stockBalanceService: StockBalanceService,
    ) { }

    //   ======================================================
    //   EXECUTE ADJUSTMENT - INTERNAL (WITHIN EXISTING TRANSACTION)
    //   - This method is used when we are already within a transaction (e.g. during issue or receive)
    //   ======================================================
    private async executeInternal(
        data: {
            item_id: number;
            warehouse_id: number;
            location_id: number;
            branch_id: number;
            qty: number;
            remark?: string;
            ref_doc_no?: string;
            trans_type: StockTransactionType;   // ✔ FIXED
            ref_doc_type?: StockRefDocType;     // ✔ FIXED
        },
        tx: Prisma.TransactionClient,
    ) {

        // FIND BALANCE
        const balance = await this.stockBalanceService.findOne(
            {
                item_id: data.item_id,
                warehouse_id: data.warehouse_id,
                location_id: data.location_id,
                branch_id: data.branch_id,
            },
            tx,
        );

        // CHECK STOCK
        if (data.qty < 0) {
            const deductQty = Math.abs(data.qty);

            if (!balance || Number(balance.qty_on_hand) < deductQty) {
                throw new BadRequestException(
                    'Insufficient stock for adjustment',
                );
            }
        }
// console.log('AdjustStockService.execute - data:', data); 
        // CREATE TRANSACTION
        await this.stockTransactionService.create(
            {
                item_id: data.item_id,
                warehouse_id: data.warehouse_id,
                location_id: data.location_id,
                branch_id: data.branch_id,
                qty: data.qty,
                trans_type: data.trans_type ?? StockTransactionType.ADJUST,
                ref_doc_type:
                    data.ref_doc_type ?? StockRefDocType.ADJUST_STOCK,
                ref_doc_no: data.ref_doc_no,
                remark: data.remark,
            },
            tx,
        );

        // UPDATE BALANCE
        await this.stockBalanceService.adjust(
            {
                item_id: data.item_id,
                warehouse_id: data.warehouse_id,
                location_id: data.location_id,
                branch_id: data.branch_id,
                qty: data.qty,
            },
            tx,
        );

        return {
            success: true,
            message: 'Stock adjusted successfully',
            item_id: data.item_id,
            warehouse_id: data.warehouse_id,
            adjustment_qty: data.qty,
        };
    }


    //   ======================================================
    //   EXECUTE ADJUSTMENT - EXTERNAL (OUTSIDE TRANSACTION)
    //   - This method is used when we are calling adjustment from outside (e.g. from controller)
    //   - It will create its own transaction
    //   ======================================================
    async execute(
        data: {
            item_id: number;
            warehouse_id: number;
            location_id: number;
            branch_id: number;
            qty: number;
            remark?: string;
            ref_doc_no?: string;
            trans_type: StockTransactionType;   // ✔ FIXED
            ref_doc_type?: StockRefDocType;     // ✔ FIXED
        },
        tx?: Prisma.TransactionClient,
    ) {
        if (data.qty === 0) {
            throw new BadRequestException(
                'ReceiveStockService quantity cannot be 0',
            );
        }
// console.log('ReceiveStockService.execute - data:', data); 

        // ==================================================
        // USE EXISTING TRANSACTION
        // ==================================================
        if (tx) {
            return this.executeInternal(data, tx);
        }

        // ==================================================
        // CREATE NEW TRANSACTION
        // ==================================================
        return this.prisma.$transaction(async (trx) => {
            return this.executeInternal(data, trx);
        });
    }
}