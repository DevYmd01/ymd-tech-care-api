import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateItemMasterDto } from "../dto/create-item-master.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateItemMasterRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createItemMaster(params: {
        tx: Prisma.TransactionClient;
        itemMaster: CreateItemMasterDto;
    }) {
        const { tx, itemMaster } = params;

        return tx.item.create({
            data: {
                item_code: itemMaster.item_code!,
                item_name: itemMaster.item_name!,
                base_uom_id: itemMaster.base_uom_id!,
                purchase_uom_id: itemMaster.purchase_uom_id!,
                sale_uom_id: itemMaster.sale_uom_id!,
                default_tax_code: itemMaster.default_tax_code!,
                item_type_id: itemMaster.item_type_id!,
                item_type_code: itemMaster.item_type_code!,
                item_category_id: itemMaster.item_category_id!,
                item_category_code: itemMaster.item_category_code!,
                item_brand_id: itemMaster.item_brand_id!,
                item_brand_code: itemMaster.item_brand_code!,
                item_pattern_id: itemMaster.item_pattern_id!,
                item_pattern_code: itemMaster.item_pattern_code!,
                item_design_id: itemMaster.item_design_id!,
                item_design_code: itemMaster.item_design_code!,
                item_class_id: itemMaster.item_class_id!,
                item_class_code: itemMaster.item_class_code!,
                item_size_id: itemMaster.item_size_id!,
                item_size_code: itemMaster.item_size_code!,
                item_group_id: itemMaster.item_group_id!,
                item_group_code: itemMaster.item_group_code!,
                default_issue_policy: itemMaster.default_issue_policy!,
                lot_tracking_level: itemMaster.lot_tracking_level!,
                serial_tracking_level: itemMaster.serial_tracking_level!,
                shelf_life_days: itemMaster.shelf_life_days!,
            },
        });
    }
}


