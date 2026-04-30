// d:/project01/ymd-tech-care-api/src/common/inventory/stock-options/ic-option-resolver.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockOptionsConfig } from '../dto/stock-options-config.dto';

@Injectable()
export class IcOptionResolverService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper to resolve a number value, treating 0, null, or undefined as a fallback to a default.
   * @param val The value to check.
   * @param def The default value if `val` is 0, null, or undefined.
   * @returns The resolved number.
   */
  private resolveZero(val: number | null | undefined, def: number): number {
    return val === 0 || val === null || val === undefined ? def : val;
  }

  /**
   * Resolves the inventory control options for a given branch and document type.
   * @param branchId The ID of the branch.
   * @param documentCode The system document code (e.g., 'RS', 'SO').
   * @returns A promise that resolves to the resolved stock options configuration.
   * @throws NotFoundException if the configuration is not found.
   */
  async resolveConfig(
    branchId: number | undefined,
    documentCode: string,
  ): Promise<StockOptionsConfig> {
    const setting = await this.prisma.ic_option_list.findFirst({
      where: {
        ic_option: {
          branch_id: branchId,
        },
        system_document: {
          system_document_code: documentCode,
        },
      },
      include: {
        ic_option: true,
      },
    });

    if (!setting) {
      throw new NotFoundException(
        `IC Option configuration not found for branch_id: ${branchId} and document_code: ${documentCode}`,
      );
    }

    const negativeStockCheck = this.resolveZero(
      setting.negative_stock_check,
      setting.ic_option.check_deficit,
    );

    const negativeStockMode = this.resolveZero(
      setting.negative_stock_mode,
      setting.ic_option.check_deficit_option,
    );

    const qtyValidationFlag = this.resolveZero(
      setting.quantity_validation_flag,
      setting.ic_option.check_qty_flag,
    );

    return {
      negative_stock_check: negativeStockCheck,
      negative_stock_mode: negativeStockMode,
      quantity_validation_flag: qtyValidationFlag,
    };
  }
}
