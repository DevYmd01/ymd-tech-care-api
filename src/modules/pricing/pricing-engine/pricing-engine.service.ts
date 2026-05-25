import { Injectable } from '@nestjs/common';
import { CalculatePriceDto } from './dto/calculate-price.dto';
import { getPriceByPriority } from './engine/price-engine';
import { PricingContext } from './types/pricing-context';
import { PrismaService } from '@/prisma/prisma.service';
import { UomConversionService } from '@/common/uom/item-uom/service/uom-conversion.service';


@Injectable()
export class PricingEngineService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly uomConversionService: UomConversionService,
  ) {}

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
    // 1. convert to base qty
    // =========================

    let baseQty = qty;

    if (uomId) {
      baseQty =
        await this.uomConversionService.toBaseQty(
          Number(uomId),
          qty,
        );
    }

    // =========================
    // 2. build context
    // =========================

    const ctx: PricingContext = {
      prisma: this.prisma,
      item_id: Number(itemId),

      qty: baseQty,

      item_uom_id:
        uomId ? Number(uomId) : undefined,

      customer_id:
        customerId ? Number(customerId) : undefined,

      branch_id:
        branchId ? Number(branchId) : undefined,

      date:
        date ? new Date(date) : new Date(),
    };

    // =========================
    // 3. option config
    // =========================

    const option =
      await this.getPriceOption(ctx.branch_id);

    // =========================
    // 4. run pricing engine
    // =========================

    const result =
      await getPriceByPriority(option, ctx);

    // =========================
    // 5. fallback safety
    // =========================

    if (!result) {
      return {
        itemId,
        qty,
        baseQty,
        unitPrice: 0,
        total: 0,
        breakdown: null,
        source: null,
      };
    }

    // =========================
    // 6. response format
    // =========================

    return {
      itemId,

      qty,

      baseQty,

      unitPrice: result.price,

      total: result.price * qty,

      source: result.source_name,
      sourceName: result.source_name,
      priority: result.priority,
    };
  }

  private async getPriceOption(branchId?: number) {

    const config =
      await this.prisma.ic_option.findFirst({
        where:
          branchId
            ? { branch_id: branchId }
            : undefined,
      });

    if (config) {
      return {
        set_price1: config.set_price1,
        set_price2: config.set_price2,
        set_price3: config.set_price3,
        set_price4: config.set_price4,
      };
    }

    return {
      set_price1: null,
      set_price2: null,
      set_price3: null,
      set_price4: null,
    };
  }
}