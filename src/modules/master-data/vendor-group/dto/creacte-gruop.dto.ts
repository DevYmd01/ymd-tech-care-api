import { IsOptional, IsString } from "class-validator";

export class CreateVendorGroupDTO {
    @IsString()
    @IsOptional()
    vendor_group_code: string;
    @IsString()
    @IsOptional()
    vendor_group_name: string;
    @IsString()
    @IsOptional()
    vendor_group_nameeng: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsOptional()
    is_active?: boolean;
    @IsString()
    @IsOptional()
    status: string;
}