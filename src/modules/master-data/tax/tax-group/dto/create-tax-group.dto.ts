import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber } from "class-validator";

export class CreateTaxGroupDTO {
    @IsString()
    @IsNotEmpty()
    tax_group_code: string;

    @IsNumber()
    @IsNotEmpty()
    tax_rate: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    tax_type: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;
}