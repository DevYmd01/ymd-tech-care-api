import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { LotTransactionType, LotRefDocType } from '../enums/lot-balance-type.enum'

export class CreateLotBalanceDto {
  item_id!: number;
  warehouse_id!: number;
  location_id!: number;
  branch_id?: number;
  lot_id!: number;
  qty!: number;
  remark?: string;
ref_doc_no!: string;
            trans_type!: LotTransactionType;   // ✔ FIXED
            ref_doc_type?: LotRefDocType;     // ✔ FIXED
}
