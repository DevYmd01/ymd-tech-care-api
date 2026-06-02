import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryMovementInput } from './interfaces/inventory-engine.types';
import { INVENTORY_POLICY } from '../inventory-policy/inventory-policy';

@Injectable()
export class InventoryEngineService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * บันทึกรายการเคลื่อนไหวของสต็อกสินค้า
   * @param input ข้อมูลการเคลื่อนไหว
   */
  async execute(input: InventoryMovementInput) {
    const policy = INVENTORY_POLICY[input.trans_type];

    if (!policy) {
      throw new BadRequestException(`ไม่พบนโยบายสำหรับประเภทรายการ: ${input.trans_type}`);
    }

  }
}
