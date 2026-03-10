import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUomDto {
    @IsString()
    @IsNotEmpty()
    uom_code: string;

    @IsString()
    @IsNotEmpty()
    uom_name: string;

    @IsString()
    @IsOptional()
    uom_nameeng?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}