import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class CreateSFRQVendorDTO {

    @IsNotEmpty()
    @IsNumber()
    vendor_id: number;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    sent_at?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    responded_at?: Date;

    @IsOptional()
    @IsString()
    contact_email?: string;

    @IsOptional()
    @IsString()
    contact_person?: string;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}