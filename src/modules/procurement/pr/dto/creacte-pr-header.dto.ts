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

    // สกุลเงิน (THB, USD)
    @IsString()
    currency_code: string;

    // อัตราแลกเปลี่ยน
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    exchange_rate: number;

    // หมายเหตุ
    @IsOptional()
    @IsString()
    remark: string;

    // ยอดรวม (ควรคำนวณจาก PR line)
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    total_amount: number;

    // เครดิตวัน
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    payment_term_days: number;

    @IsNumber()
    @Type(() => Number)
    requester_user_id: number;

    @IsOptional()
    @IsString()
    preferred_vendor: string;

    @IsOptional()
    @IsDateString()
    delivery_date: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    credit_days: number;

    @IsOptional()
    @IsString()
    vendor_quote_no: string;

    @IsOptional()
    @IsString()
    shipping_method: string;

    @IsOptional()
    @IsString()
    requester_name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePRLineDTO)
    lines: CreatePRLineDTO[];
}



