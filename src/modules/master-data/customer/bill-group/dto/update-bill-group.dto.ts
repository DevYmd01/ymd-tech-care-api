import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateBillGroupDto {
    @IsNotEmpty()
    @IsString()
    bill_group_code: string;

    @IsNotEmpty()
    @IsString()
    bill_group_name: string;

    @IsOptional()
    @IsString()
    bill_group_nameeng?: string;

    @IsOptional()
    @IsString()
    remark?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}