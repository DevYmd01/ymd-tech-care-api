import { IcOptionContext } from './ic-option.types';
import { IcOptionValidationResult } from '../result/ic-option-validation.result';

export class IcOptionRules {

  // =========================================================
  // IC OPTION RULE ENGINE
  // =========================================================
  // หน้าที่:
  // - ตรวจสอบ stock rule
  // - ตรวจสอบ scope rule
  // - ตรวจสอบ qty rule
  // - return result (is_valid / warnings / errors)
  // =========================================================

  static validate(
    option: any,
    ctx: IcOptionContext,
  ): IcOptionValidationResult {

    const errors: string[] = [];
    const warnings: string[] = [];

    // =====================================================
    // 1. NEGATIVE STOCK RULE
    // =====================================================

    // 1 = ห้ามติดลบ
    if (
      option.negative_stock_check === 1 &&
      ctx.qty > ctx.available_qty
    ) {
      errors.push('NEGATIVE_STOCK_NOT_ALLOWED');
    }

    // 2 = อนุญาตติดลบ
    if (
      option.negative_stock_check === 2 &&
      ctx.qty > ctx.available_qty
    ) {
      warnings.push('NEGATIVE_STOCK_ALLOWED');
    }

    // 3 = เตือนก่อนใช้
    if (
      option.negative_stock_check === 3 &&
      ctx.qty > ctx.available_qty
    ) {
      warnings.push('INSUFFICIENT_STOCK_WARNING');
    }

    // =====================================================
    // 2. QTY VALIDATION RULE
    // =====================================================

    if (
      option.quantity_validation_flag === 1 &&
      ctx.qty <= 0
    ) {
      errors.push('INVALID_QTY');
    }

    // =====================================================
    // 3. WAREHOUSE / LOCATION SCOPE RULE
    // =====================================================

    // mode:
    // 0 = item level
    // 1 = total
    // 2 = warehouse
    // 3 = warehouse + location

    if (option.negative_stock_mode === 2) {

      if (!ctx.warehouse_id) {
        errors.push('WAREHOUSE_REQUIRED');
      }

    }

    if (option.negative_stock_mode === 3) {

      if (!ctx.warehouse_id || !ctx.location_id) {
        errors.push('WAREHOUSE_LOCATION_REQUIRED');
      }

    }

    // =====================================================
    // 4. RESULT
    // =====================================================

    return {

      is_valid:
        errors.length === 0,

      errors,

      warnings,

    };

  }

}