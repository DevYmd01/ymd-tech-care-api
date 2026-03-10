import { UpdateRFQHeaderDTO } from "../dto/update-rfq-header.dto";
import { Prisma } from "@prisma/client";

export class UpdateRFQHeaderMapper {
    static toPrismaUpdateInput(
        dto: UpdateRFQHeaderDTO,
        rfq_id: number
    ): Prisma.rfq_headerUncheckedUpdateInput {
        return {
            rfq_id: rfq_id,
            requested_by_user_id: dto.requested_by_user_id,
            rfq_date: dto.rfq_date,
            pr_id: dto.pr_id,
            branch_id: dto.branch_id,
            requested_by: dto.requested_by,
            status: dto.status,
            quotation_due_date: dto.quotation_due_date,
            rfq_base_currency_code: dto.rfq_base_currency_code,
            rfq_quote_currency_code: dto.rfq_quote_currency_code,
            rfq_exchange_rate: dto.rfq_exchange_rate,
            rfq_exchange_rate_date: dto.rfq_exchange_rate_date,
            receive_location: dto.receive_location,
            payment_term_hint: dto.payment_term_hint,
            incoterm: dto.incoterm,
            remarks: dto.remarks,
        }
    }
}