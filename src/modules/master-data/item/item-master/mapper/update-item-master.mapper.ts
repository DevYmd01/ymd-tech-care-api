import { Prisma } from '@prisma/client';
import { UpdateItemMasterDto } from '../dto/update-item-master.dto';

export class UpdateItemMasterMapper {
    static toPersistence(dto: UpdateItemMasterDto): Prisma.itemUpdateInput {
        return {
            item_code: dto.item_code,
            item_name: dto.item_name,

            // ✅ relation (กัน undefined ทุกตัว)
            ...(dto.item_type_id && {
                itemType: {
                    connect: { item_type_id: dto.item_type_id }
                }
            }),

            ...(dto.item_group_id && {
                itemGroup: {
                    connect: { item_group_id: dto.item_group_id }
                }
            }),

            ...(dto.item_category_id && {
                itemCategory: {
                    connect: { item_category_id: dto.item_category_id }
                }
            }),

            ...(dto.base_uom_id && {
                baseUom: {
                    connect: { uom_id: dto.base_uom_id }
                }
            }),

            ...(dto.sale_uom_id && {
                saleUom: {
                    connect: { uom_id: dto.sale_uom_id }
                }
            }),

            ...(dto.tax_code_id && {
                taxCode: {
                    connect: { tax_code_id: dto.tax_code_id }
                }
            }),

            ...(dto.item_brand_id && {
                itemBrand: {
                    connect: { item_brand_id: dto.item_brand_id }
                }
            }),

            ...(dto.item_pattern_id && {
                itemPattern: {
                    connect: { item_pattern_id: dto.item_pattern_id }
                }
            }),

            ...(dto.item_design_id && {
                itemDesign: {
                    connect: { item_design_id: dto.item_design_id }
                }
            }),

            ...(dto.item_class_id && {
                itemClass: {
                    connect: { item_class_id: dto.item_class_id }
                }
            }),

            ...(dto.item_size_id && {
                itemSize: {
                    connect: { item_size_id: dto.item_size_id }
                }
            }),

            ...(dto.item_color_id && {
                itemColor: {
                    connect: { item_color_id: dto.item_color_id }
                }
            }),

            ...(dto.item_grade_id && {
                itemGrade: {
                    connect: { item_grade_id: dto.item_grade_id }
                }
            }),

            // ✅ fields ปกติ
            barcode_default: dto.barcode_default,
            is_batch_control: dto.is_batch_control,
            is_expiry_control: dto.is_expiry_control,
            is_serial_control: dto.is_serial_control,
            standard_cost: dto.standard_cost,
            shelf_life_days: dto.shelf_life_days,
            default_issue_policy: dto.default_issue_policy,
            lot_tracking_level: dto.lot_tracking_level,
            serial_tracking_level: dto.serial_tracking_level,
            is_active: dto.is_active,
        };
    }
}