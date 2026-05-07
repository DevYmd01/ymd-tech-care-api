import { Prisma } from '@prisma/client';
import { CreateDeliveryLineDto, UpdateDeliveryLineDto } from '../dto/delivery-line.dto';

export class DeliveryLineMapper {
    static toPrismaCreateInput(
        data: CreateDeliveryLineDto,
        delivery_id: number,
    ): Prisma.delivery_lineCreateInput {
        return {
            delivery_header: { connect: { delivery_id } },
            so_line: { connect: { so_line_id: data.so_line_id } },
            item: { connect: { item_id: data.item_id } },
            qty_shipped: new Prisma.Decimal(data.qty_shipped),
            uom: { connect: { uom_id: data.uom_id } },
            warehouse: { connect: { warehouse_id: data.warehouse_id } },
            location: data.location_id ? { connect: { location_id: data.location_id } } : undefined,    
            lot: data.lot_id ? { connect: { lot_id: data.lot_id } } : undefined,
            remarks: data.remarks,
            serial_no: data.serial_no,
        };
    }

    static toPrismaUpdateInput(
        data: UpdateDeliveryLineDto,
    ): Prisma.delivery_lineUpdateInput {
        return {
            so_line: { connect: { so_line_id: data.so_line_id } },
            item: { connect: { item_id: data.item_id } },
            qty_shipped: new Prisma.Decimal(data.qty_shipped),
            uom: { connect: { uom_id: data.uom_id } },
            warehouse: { connect: { warehouse_id: data.warehouse_id } },
            location: data.location_id ? { connect: { location_id: data.location_id } } : undefined,    
            lot: data.lot_id ? { connect: { lot_id: data.lot_id } } : undefined,
            remarks: data.remarks,
            serial_no: data.serial_no,
        };
    }
        };
