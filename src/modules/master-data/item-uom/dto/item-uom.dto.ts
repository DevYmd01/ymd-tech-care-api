import { IsBoolean, IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateItemUomDto {
    @IsNotEmpty()
    @IsNumber()
    item_uom_id!: number;

    @IsNotEmpty()
    @IsNumber()
    item_id!: number;

    @IsNotEmpty()
    @IsNumber()
    from_uom_id!: number;

    @IsNotEmpty()
    @IsBoolean()
    is_purchase_uom?: boolean; 

    @IsNotEmpty()
    @IsNumber()
    to_uom_id!: number;

    @IsNotEmpty()
    @IsNumber()
    factor!: number;

    @IsOptional()
    @IsNumber()
    customer_id?: number;

    @IsNotEmpty()
    @IsBoolean()
    is_active!: boolean;
}   