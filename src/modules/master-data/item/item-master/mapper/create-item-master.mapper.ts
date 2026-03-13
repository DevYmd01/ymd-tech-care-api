import { Prisma } from '@prisma/client';
import { CreateItemMasterDto } from '../dto/create-item-master.dto';

export class CreateItemMasterMapper {

    private static toNullableInt(value?: number): number | null {
        if (value === undefined || value === null || value === 0) {
            return null;
        }
        return value;
    }

    static toPersistence(dto: CreateItemMasterDto): Prisma.itemUncheckedCreateInput {

        return {
            item_code: dto.item_code,
            item_name: dto.item_name,

            item_type_id: this.toNullableInt(dto.item_type_id),
            item_group_id: this.toNullableInt(dto.item_group_id),
            item_category_id: this.toNullableInt(dto.item_category_id),

            base_uom_id: this.toNullableInt(dto.base_uom_id),
            sale_uom_id: this.toNullableInt(dto.sale_uom_id),
            tax_code_id: this.toNullableInt(dto.tax_code_id),

            item_brand_id: this.toNullableInt(dto.item_brand_id),
            item_pattern_id: this.toNullableInt(dto.item_pattern_id),
            item_design_id: this.toNullableInt(dto.item_design_id),
            item_class_id: this.toNullableInt(dto.item_class_id),
            item_size_id: this.toNullableInt(dto.item_size_id),
            item_color_id: this.toNullableInt(dto.item_color_id),
            item_grade_id: this.toNullableInt(dto.item_grade_id),

            barcode_default: dto.barcode_default ?? null,

            is_batch_control: dto.is_batch_control ?? false,
            is_expiry_control: dto.is_expiry_control ?? false,
            is_serial_control: dto.is_serial_control ?? false,

            standard_cost: dto.standard_cost ?? null,
            shelf_life_days: dto.shelf_life_days ?? null,

            default_issue_policy: dto.default_issue_policy ?? 'FIFO',
            lot_tracking_level: dto.lot_tracking_level ?? 'NONE',
            serial_tracking_level: dto.serial_tracking_level ?? 'NONE',

            is_active: dto.is_active ?? true,
        };
    }
}