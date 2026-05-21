import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
 
export class CreateItemBarcodeDto {
    @IsString()
    @IsNotEmpty()
    barcode!: string;

    @IsNotEmpty()
    item_id!: number;

    @IsNotEmpty()
    item_uom_id!: number;

    @IsBoolean()
    @IsNotEmpty()
    is_primary!: boolean;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;


}