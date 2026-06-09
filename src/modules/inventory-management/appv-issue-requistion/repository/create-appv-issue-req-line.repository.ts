import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateAppvIssueReqLineRepository {
    async create( 
        tx: Prisma.TransactionClient,
        data: Prisma.appvissue_requistion_lineCreateInput
    ) {
        return tx.appvissue_requistion_line.create({
            data,
        });
    }
    
}