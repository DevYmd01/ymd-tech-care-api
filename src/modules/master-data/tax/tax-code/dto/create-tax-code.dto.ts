import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber } from "class-validator";

export class CreateTaxCodeDTO {
    @IsString()
    @IsNotEmpty()
    tax_code: string;

    @IsString()
    @IsNotEmpty()
    tax_name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    tax_type: string;

    @IsNumber()
    @IsOptional()
    tax_rate: number;

    @IsNumber()
    @IsOptional()
    tax_group_id: number;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;
}