import {
    IsString,
    IsDateString,
    IsOptional,
    IsNumber,
    Min,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePRLineDTO } from './create-pr-line.dto';

export class CreatePRHeaderDTO {

    // ปกติให้ backend generate
    @IsOptional()
    @IsString()
    pr_no: string;

    // วันที่สร้าง PR
    @IsOptional()
    @IsDateString()
    pr_date: string;

    // สาขา (required)
    @IsNumber()
    @Type(() => Number)
    branch_id: number;

    // วันที่ต้องการของ
    @IsOptional()
    @IsDateString()
    need_by_date: string;

    // สถานะ PR (เช่น DRAFT, SUBMITTED, APPROVED)
    @IsString()
    status: string;


    @IsString()
    pr_base_currency_code: string;


    @IsString()
    pr_quote_currency_code: string;

    @IsNumber()
    @Type(() => Number)
    pr_exchange_rate: number;

    @IsDateString()
    pr_exchange_rate_date: string;

    // หมายเหตุ
    @IsOptional()
    @IsString()
    remark: string;

    // เครดิตวัน
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    payment_term_days: number;

    // ผู้ขอซื้อ
    @IsNumber()
    @Type(() => Number)
    requester_user_id: number;

    // ผู้ขาย
    @IsOptional()
    @IsString()
    preferred_vendor: string;

    // วันที่ส่งมอบ
    @IsOptional()
    @IsDateString()
    delivery_date: string;

    // เครดิตวัน
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    credit_days: number;

    // ใบเสนอราคาผู้ขาย
    @IsOptional()
    @IsString()
    vendor_quote_no: string;

    // วิธีการจัดส่ง
    @IsOptional()
    @IsString()
    shipping_method: string;

    // ชื่อผู้ขอซื้อ
    @IsOptional()
    @IsString()
    requester_name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePRLineDTO)
    lines: CreatePRLineDTO[];

    @IsNumber()
    @Type(() => Number)
    pr_tax_code_id: number;

    // ลดท่อน 
    @IsString()
    @Type(() => String)
    pr_discount_raw?: string;

}



