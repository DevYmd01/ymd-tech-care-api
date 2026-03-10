import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    brand_code: string;
    @IsString()
    @IsNotEmpty()
    brand_name: string;
    @IsString()
    @IsOptional()
    brand_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}