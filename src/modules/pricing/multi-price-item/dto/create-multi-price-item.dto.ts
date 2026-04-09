import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber} from "class-validator";

export class CreateMultiPriceItemDto {
@IsNotEmpty()
@IsNumber()
item_from_qty!: number
@IsNotEmpty()
@IsNumber()
item_id!: number
@IsOptional()
@IsNumber()
item_price1?: number
@IsOptional()
@IsNumber()
item_price2?: number
@IsOptional()
@IsNumber()
item_price3?: number
@IsOptional()
@IsNumber()
item_price4?: number
@IsOptional()
@IsNumber()
item_price5?: number
@IsOptional()   
@IsNumber()
item_price6?: number
@IsOptional()
@IsNumber()
item_price7?: number
@IsOptional()
@IsNumber()
item_price8?: number
@IsOptional()
@IsNumber()
item_price9?: number
@IsOptional()
@IsNumber()
item_price10?: number
@IsOptional()
@IsNumber()
item_to_qty?: number
@IsOptional()
@IsNumber()
uom_id!: number
}