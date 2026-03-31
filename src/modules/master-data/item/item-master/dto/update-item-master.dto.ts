import { PartialType } from "@nestjs/mapped-types";
import { CreateItemMasterDto } from "./create-item-master.dto";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

class NestedUpdateItemBarcodeDto {
    @IsOptional()
    @IsInt()
    item_barcode_id?: number;

    @IsString()
    @IsNotEmpty()
    barcode: string;

    @IsNotEmpty()
    @IsInt()
    uom_id: number;

    @IsBoolean()
    @IsNotEmpty()
    is_primary: boolean;
}

export class UpdateItemMasterDto extends PartialType(CreateItemMasterDto) {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NestedUpdateItemBarcodeDto)
    barcodes?: NestedUpdateItemBarcodeDto[];
}
