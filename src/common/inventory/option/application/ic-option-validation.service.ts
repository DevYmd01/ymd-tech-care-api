import { Injectable } from '@nestjs/common';
import { IcOptionReader } from '../infrastructure/ic-option.reader';
import { IcOptionRules } from '../domain/ic-option.rules';
import { IcOptionContext } from '../domain/ic-option.types';
import { BalanceReader } from '../../lot-balance/domain/balance.reader';
import { IcOptionValidationResult } from '../result/ic-option-validation.result';
import { IcOptionContextDto } from '../dto/option-validation.dto';
import { UomConversionReader } from '../infrastructure/uom-conversion';



@Injectable()
export class IcOptionValidationService {

  // =========================================================
  // IC OPTION VALIDATION ENGINE
  // =========================================================
  // หน้าที่:
  // - โหลด ic_option ตาม document
  // - merge default + override
  // - validate business rules
  // - return result ให้ preview / commit ใช้ต่อ
  // =========================================================

  async validate(params: {
    system_document_code: string;
    context: IcOptionContextDto;
  }): Promise<IcOptionValidationResult> {

    // =====================================================
    // 1. LOAD IC OPTION
    // =====================================================

    const option =
      await IcOptionReader.getOption(
        params.system_document_code,
      );

    // =====================================================
    // 2. DEFAULT BEHAVIOR (SAFE MODE)
    // =====================================================

    if (!option) {

      return {
        is_valid: true,
        errors: [],
        warnings: [],
      };

    }

    // =====================================================
    // 3. NORMALIZE CONTEXT
    // =====================================================

    // ดึงยอดสต็อกจริงจากฐานข้อมูล (Real-time Balance Lookup)
    const balances = await BalanceReader.getBalances(
      params.context.item_id,
      params.context.warehouse_id,
      params.context.location_id,
    );

    // รวมยอด available จากทุก Lot ใน Scope ที่กำหนด
    const actualAvailableQty = balances.reduce(
      (sum, b) => sum + Number(b.qty_available),
      0
    );

    if (!params.context.item_uom_id) {
      throw new Error('item_uom_id is required');
    }

    // หาค่าจริงของหน่วยทั้งหมด
    const baseQty = await UomConversionReader.toBaseQty(
      params.context.item_uom_id,
      params.context.qty,
    );


    const ctx: IcOptionContext = {
      system_document_code:
        params.system_document_code,

      item_id:
        params.context.item_id,

      warehouse_id:
        params.context.warehouse_id,

      location_id:
        params.context.location_id,

      qty:
        baseQty,

      // Number(params.context.qty),

      available_qty:
        actualAvailableQty,
    };

    // =====================================================
    // 4. APPLY RULES ENGINE
    // =====================================================

    const result =
      IcOptionRules.validate(option, ctx);

    // =====================================================
    // 5. RETURN RESULT
    // =====================================================

    return {
      is_valid: result.is_valid,
      errors: result.errors,
      warnings: result.warnings,
    };
  }

}