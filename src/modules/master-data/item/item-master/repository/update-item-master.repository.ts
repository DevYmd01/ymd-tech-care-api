import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateItemMasterDto } from "../dto/update-item-master.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateItemMasterRepository {
    constructor(private readonly prisma: PrismaService) { }

    async updateItemMaster(params: {
        tx: Prisma.TransactionClient;
        itemMaster: UpdateItemMasterDto;
        item_id: number;
    }) {
        const { tx, itemMaster, item_id } = params;

        return tx.item.update({
            where: { item_id },
            data: itemMaster,
        });
    }


}
