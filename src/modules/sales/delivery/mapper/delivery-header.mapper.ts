import { Prisma } from "@prisma/client";
import { CreateDeliveryHeaderDto, UpdateDeliveryHeaderDto } from "../dto/delivery-header.dto";

export class DeliveryHeaderMapper {
    static toPrismaCreateInput(
        data: CreateDeliveryHeaderDto,
        delivery_no: string,
    ): Prisma.delivery_headerCreateInput {
        return {    
            delivery_no: delivery_no,
            delivery_date: data.delivery_date,
            so_header: { connect: { so_id: data.so_id } },
            customer: { connect: { customer_id: data.customer_id } },
            branch: { connect: { branch_id: data.branch_id } },
            ship_to_address: data.ship_to_address,
            ship_method: data.ship_method,
            carrier: data.carrier,
            tracking_no: data.tracking_no,
            status: data.status,
            ship_by: data.ship_by_emp ? { connect: { employee_id: data.ship_by_emp } } : undefined,
            docu_date: data.docu_date,
            remarks: data.remarks,
        };
    }

    static toPrismaUpdateInput(
        data: UpdateDeliveryHeaderDto,
    ): Prisma.delivery_headerUpdateInput {
        return {    
            delivery_date: data.delivery_date,
            so_header: { connect: { so_id: data.so_id } },
            customer: { connect: { customer_id: data.customer_id } },
            branch: { connect: { branch_id: data.branch_id } },
            ship_to_address: data.ship_to_address,
            ship_method: data.ship_method,
            carrier: data.carrier,
            tracking_no: data.tracking_no,
            status: data.status,
            ship_by: data.ship_by_emp ? { connect: { employee_id: data.ship_by_emp } } : undefined,
            docu_date: data.docu_date,
            remarks: data.remarks,
        };
    }
}