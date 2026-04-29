
import {
    IsOptional,
    IsNumber,
    IsBoolean,
    IsArray,
    ValidateNested,
    IsNotEmpty,
    IsString
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryOptionDto {
    @IsNotEmpty()
    @IsNumber()
    branch_id!: number;
    @IsOptional()
    @IsString()
    aging_expire?: string;
    @IsOptional()
    @IsString()
    auto_perpetual_cost?: string;
    @IsOptional()
    @IsString()
    barcode_flag?: string;
    @IsOptional()
    @IsNumber()
    check_deficit?: number;
    @IsOptional()
    @IsNumber()
    check_deficit_option?: number;
    @IsOptional()
    @IsString()
    check_max_qty?: string;
    @IsOptional()
    @IsString()
    check_min_qty?: string;
    @IsOptional()
    @IsNumber()
    check_qty_flag?: number;
    @IsOptional()
    @IsString()
    check_standcost?: string;
    @IsOptional()
    @IsString()
    expire_alert_flag?: string;
    @IsOptional()
    @IsString()
    order_alert_flag?: string;
    @IsOptional()
    @IsString()
    post_cost_flag?: string;
    @IsOptional()
    @IsString()
    reorder_flag?: string;
    @IsOptional()
    @IsString()
    set_autopost?: string;
    @IsOptional()
    @IsString()
    set_costcn?: string;
    @IsOptional()
    @IsString()
    set_costcn_ap?: string;
    @IsOptional()
    @IsString()
    set_costcn_ap_refinv?: string;
    @IsOptional()
    @IsString()
    set_costcn_refinv?: string;
    @IsOptional()
    @IsString()
    set_cost_return_issueref?: string;
    @IsOptional()
    @IsString()
    set_goodqty?: string;
    @IsOptional()
    @IsString()
    set_inve?: string;
    @IsOptional()
    @IsString()
    set_price?: string;
    @IsOptional()
    @IsNumber()
    set_price1?: number;
    @IsOptional()
    @IsNumber()
    set_price2?: number;
    @IsOptional()
    @IsNumber()
    set_price3?: number;
    @IsOptional()
    @IsNumber()
    set_price4?: number;
    @IsOptional()
    @IsString()
    set_price_ic?: string;
    @IsOptional()
    @IsString()
    set_price_pack?: string;
    @IsOptional()
    @IsString()
    set_price_po?: string;
    @IsOptional()
    @IsString()
    trasfer_cost_flag?: string;
}
