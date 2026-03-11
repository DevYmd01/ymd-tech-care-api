import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    item_brand_code: string;
    @IsString()
    @IsNotEmpty()
    item_brand_name: string;
    @IsString()
    @IsOptional()
    item_brand_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}