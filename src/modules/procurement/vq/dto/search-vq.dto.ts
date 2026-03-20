import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';


export class SearchVQDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 20;

    // ALL, WAITING_VQ, WAITING_RFQ
    @IsOptional()
    @IsString()
    tab?: string;

    // vq_no%3Adesc, vq_no%3Aasc, 
    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsString()
    pr_no?: string;

    @IsOptional()
    @IsString()
    rfq_no?: string;

    @IsOptional()
    @IsString()
    vq_no?: string;

    @IsOptional()
    @IsString()
    vendor_name?: string;

    @IsOptional()
    @IsString()
    creator_name?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    date_start?: string;

    @IsOptional()
    @IsString()
    date_end?: string;
}