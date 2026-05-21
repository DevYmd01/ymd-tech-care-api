import { IsBoolean, IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class SearchItemUomDto {
    @IsNotEmpty()
    @IsNumber()
    item_id!: number;

    @IsNotEmpty()
    @IsNumber()
    from_uom_id!: number;

    @IsNotEmpty()
    @IsBoolean()
    is_purchase_uom?: boolean;

    
}