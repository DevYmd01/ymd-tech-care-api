import {
    IsOptional,
    IsNumber,
    IsBoolean,
    IsArray,
    ValidateNested,
    IsNotEmpty,
    IsString
} from 'class-validator';

export class CreateInventoryOptionDto {
    @IsNotEmpty()
    @IsNumber()
    item_id!: number;
    @IsNotEmpty()
    @IsNumber()
    lot_no!: number;
    @IsOptional()
    @IsNumber()
    supplier_vendor_id?: number;
    @IsOptional()
    @IsNumber()
    mfg_date?: Date;
    @IsOptional()
    @IsNumber()
    expiry_date?: Date;
    @IsOptional()
    @IsNumber()
    note?: string;


}