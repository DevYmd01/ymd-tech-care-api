import {
    IsString,
    IsDateString,
    IsOptional,
    IsNumber,
    IsEnum,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePRDTO {

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

    // คลัง (required)
    @IsNumber()
    @Type(() => Number)
    warehouse_id: number;

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
}



