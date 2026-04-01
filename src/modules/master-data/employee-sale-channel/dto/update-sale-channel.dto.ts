import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSaleChannelDto {
    @IsString()
    @IsNotEmpty()
    channel_code!: string;
    @IsString()
    @IsNotEmpty()
    channel_name: string;
    @IsString()
    @IsOptional()
    channel_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    is_active?: boolean;
}

// EmployeeSaleChannel