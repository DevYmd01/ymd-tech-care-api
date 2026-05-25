import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class IcOptionReader {

  // =========================================================
  // LOAD IC OPTION (ERP RULE SOURCE)
  // =========================================================
  // หน้าที่:
  // - ดึง option ตาม system_document ก่อน
  // - fallback ไป default ic_option
  // - return normalized object สำหรับ rules engine
  // =========================================================

  static async getOption(system_document_code: string) {
  const systemDocument =
    await prisma.system_document.findFirst({
      where: { system_document_code },
    });

  if (!systemDocument) return null;

  const docOption =
    await prisma.ic_option_list.findFirst({
      where: {
        system_document_id: systemDocument.system_document_id,
      },
      include: {
        ic_option: true, // 👈 สำคัญมาก
      },
    });

  const globalOption =
    await prisma.ic_option.findFirst();

  if (!globalOption) {
    return {
      source: 'SYSTEM_DEFAULT_MISSING',
      negative_stock_check: 0,
      negative_stock_mode: 0,
      quantity_validation_flag: 0,
      issue_policy_allowed: [],
    };
  }

  const resolve = (docValue: any, globalValue: any) => {
    return docValue !== null && docValue !== undefined && docValue !== 0
      ? docValue
      : globalValue;
  };

  return {
    source: docOption ? 'DOCUMENT' : 'DEFAULT',

    system_document_id: systemDocument.system_document_id,
    option_list_id: docOption?.option_list_id,

    negative_stock_check: resolve(
      docOption?.negative_stock_check,
      docOption?.ic_option?.check_deficit ?? globalOption.check_deficit,
    ),

    negative_stock_mode: resolve(
      docOption?.negative_stock_mode,
      docOption?.ic_option?.check_deficit_option ?? globalOption.check_deficit_option,
    ),

    quantity_validation_flag: resolve(
      docOption?.quantity_validation_flag,
      docOption?.ic_option?.check_qty_flag ?? globalOption.check_qty_flag,
    ),
  };
}

  // static async getOption(system_document_code: string) {

  //   const systemDocument =
  //     await prisma.system_document.findFirst({

  //       where: {
  //         system_document_code,
  //       },

  //     });

  //   if (!systemDocument) {
  //     return null;
  //   }

  //   // =====================================================
  //   // 1. DOCUMENT LEVEL OPTION (highest priority)
  //   // =====================================================

  //   const docOption =
  //     await prisma.ic_option_list.findFirst({

  //       where: {
  //         system_document_id:
  //           systemDocument.system_document_id,
  //       },

  //       include: {
  //         ic_option: true,
  //         system_document: true,
  //       },

  //     });

  //   // =====================================================
  //   // 2. RETURN DOCUMENT OPTION
  //   // =====================================================

  //   if (docOption?.ic_option) {

  //     return {

  //       source: 'DOCUMENT',

  //       // ลำดับความสำคัญ:
  //       // Document Override > Global Default
  //       ...docOption.ic_option,

  //       negative_stock_check:
  //         docOption.negative_stock_check ??
  //         docOption.ic_option.check_deficit,

  //       negative_stock_mode:
  //         docOption.negative_stock_mode ??
  //         docOption.ic_option.check_deficit_option,

  //       quantity_validation_flag:
  //         docOption.quantity_validation_flag ??
  //         docOption.ic_option.check_qty_flag,

  //       // optional metadata
  //       system_document_id:
  //         systemDocument.system_document_id,

  //       option_list_id:
  //         docOption.option_list_id,

  //     };

  //   }

  //   // =====================================================
  //   // 3. FALLBACK → GLOBAL DEFAULT OPTION
  //   // =====================================================

  //   const defaultOption =
  //     await prisma.ic_option.findFirst({});

  //   if (!defaultOption) {

  //     // ===================================================
  //     // SAFE MODE (prevent crash ERP engine)
  //     // ===================================================

  //     return {

  //       source: 'SYSTEM_DEFAULT_MISSING',

  //       negative_stock_check: 0,
  //       negative_stock_mode: 0,
  //       quantity_validation_flag: 0,
  //       issue_policy_allowed: [],

  //     };

  //   }

  //   return {

  //     source: 'DEFAULT',

  //     ...defaultOption,

  //     negative_stock_check:
  //       defaultOption.check_deficit,

  //     negative_stock_mode:
  //       defaultOption.check_deficit_option,

  //     quantity_validation_flag:
  //       defaultOption.check_qty_flag,

  //   };

  // }

}