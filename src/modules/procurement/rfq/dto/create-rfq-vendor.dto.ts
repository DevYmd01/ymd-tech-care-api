import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateSFRQVendorDTO {

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