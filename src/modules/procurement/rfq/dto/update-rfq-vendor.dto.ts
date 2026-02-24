import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class UpdateSFRQVendorDTO {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    rfq_vendor_id?: number;

    @IsNotEmpty()
    @IsNumber()
    vendor_id: number;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    contact_email?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}