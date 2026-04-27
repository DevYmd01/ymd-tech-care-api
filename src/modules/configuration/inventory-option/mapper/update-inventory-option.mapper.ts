import { UpdateInventoryOptionDto } from '../dto/update-inventory-option.dto';
import { Prisma } from '@prisma/client';

export class UpdateInventoryOptionMapper {
    static toPrismaUpdateInput(
        dto: UpdateInventoryOptionDto
    ): Prisma.ic_optionUpdateInput {
        return {
            branch: dto.branch_id ? { connect: { branch_id: dto.branch_id } } : undefined,
            aging_expire: dto.aging_expire,
            auto_perpetual_cost: dto.auto_perpetual_cost,
            barcode_flag: dto.barcode_flag,
            check_deficit: dto.check_deficit,
            check_deficit_option: dto.check_deficit_option,
            check_max_qty: dto.check_max_qty,
            check_min_qty: dto.check_min_qty,
            check_qty_flag: dto.check_qty_flag,
            check_standcost: dto.check_standcost,
            expire_alert_flag: dto.expire_alert_flag,
            order_alert_flag: dto.order_alert_flag,
            post_cost_flag: dto.post_cost_flag,
            reorder_flag: dto.reorder_flag,
            set_autopost: dto.set_autopost,
            set_costcn: dto.set_costcn,
            set_costcn_ap: dto.set_costcn_ap,
            set_costcn_ap_refinv: dto.set_costcn_ap_refinv,
            set_costcn_refinv: dto.set_costcn_refinv,
            set_cost_return_issueref: dto.set_cost_return_issueref,
            set_goodqty: dto.set_goodqty,
            set_inve: dto.set_inve,
            set_price: dto.set_price,
            set_price1: dto.set_price1,
            set_price2: dto.set_price2,
            set_price3: dto.set_price3,
            set_price4: dto.set_price4,
            set_price_ic: dto.set_price_ic,
            set_price_pack: dto.set_price_pack,
            set_price_po: dto.set_price_po,
            transfer_cost_flag: dto.trasfer_cost_flag,
        };
    }   
}