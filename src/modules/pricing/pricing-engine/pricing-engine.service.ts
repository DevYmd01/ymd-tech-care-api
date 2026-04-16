import { Injectable } from '@nestjs/common';
import { CalculatePriceDto } from './dto/calculate-price.dto';
import { getPriceByPriority } from './engine/price-engine';
import { PricingContext } from './types/pricing-context';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PricingEngineService {
  constructor(private readonly prisma: PrismaService) {}

  async calculate(dto: CalculatePriceDto) {
    const {
      itemId,
      qty,
      uomId,
      customerId,
      branchId,
      date,
    } = dto;

    // =========================
    // 1. build context (สำคัญ)
    // =========================
    const ctx: PricingContext = {
      prisma: this.prisma,
      item_id: Number(itemId),
      qty,
      uom_id: uomId ? Number(uomId) : undefined,
      customer_id: customerId ? Number(customerId) : undefined,
      branch_id: branchId ? Number(branchId) : undefined,
      date: date ? new Date(date) : new Date(),
    };

    // =========================
    // 2. option config (set_price1-4)
    // 👉 ปกติจะมาจาก DB (ตอนนี้ mock หรือ inject มาก่อน)
    // =========================
    const option = await this.getPriceOption(ctx.branch_id);

    // =========================
    // 3. run pricing engine
    // =========================
    const result = await getPriceByPriority(option, ctx);

    // =========================
    // 4. fallback safety
    // =========================
    if (!result) {
      return {
        itemId,
        qty,
        unitPrice: 0,
        total: 0,
        breakdown: null,
        source: null,
      };
    }

    // =========================
    // 5. response format
    // =========================
    return {
      itemId,
      qty,
      unitPrice: result.price,
      total: result.price * qty,
      source: result.source,
      sourceName: result.source_name,
      priority: result.priority,
    };
  }

  // =========================
  // GET DB CONFIG
  // =========================
  private async getPriceOption(branchId?: number) {
    const config = await this.prisma.ic_option.findFirst({
      where: branchId ? { branch_id: branchId } : undefined,
    });

    if (config) {
      return {
        set_price1: config.set_price1,
        set_price2: config.set_price2,
        set_price3: config.set_price3,
        set_price4: config.set_price4,
      };
    }

    // Fallback if not found in DB
    return {
      set_price1: null,
      set_price2: null,
      set_price3: null,
      set_price4: null,
    };
  }
}