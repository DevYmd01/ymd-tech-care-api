import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateAppvIssueReqHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.appvissue_requistion_headerCreateInput
    ) {
        return tx.appvissue_requistion_header.create({
            data,
        });
    }
    
}
