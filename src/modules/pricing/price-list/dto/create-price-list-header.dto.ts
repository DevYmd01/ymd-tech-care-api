import {
    IsString,        // ตรวจว่าเป็น string
    IsDateString,    // ตรวจว่าเป็นวันที่ในรูปแบบ ISO (เช่น 2026-01-22)
    IsOptional,      // ฟิลด์นี้ไม่จำเป็น (ส่งมาก็ได้ ไม่ส่งก็ไม่ error)
    IsBoolean,       // ตรวจว่าเป็น true / false
    IsNumber,        // ตรวจว่าเป็นตัวเลข
    IsEnum,          // ตรวจว่าเป็นค่าที่อยู่ใน enum ที่กำหนด
    Max,             // กำหนดค่าสูงสุดของตัวเลข
    Min,             // กำหนดค่าต่ำสุดของตัวเลข
    IsArray,         // ตรวจว่าเป็น array
    ValidateNested,  // ใช้ตรวจ object ซ้อน (เช่น array ของ DTO)
    IsIn,
    IsDate,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePriceListLineDto } from './create-price-list-line.dto';

export class CreatePriceListHeaderDto {

    @IsNotEmpty()
    @IsString()
    price_list_no!: string; // ใช้ string แทนเลขที่ เพราะไม่มีเลขที่ใน DTO
    @IsNotEmpty()
    @IsString()
    price_list_name!: string;
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    price_list_date!: Date;
    @IsOptional()
    @IsString()
    remark?: string;
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    begin_date!: Date;
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    end_date!: Date;
    @IsOptional()
    @IsNumber()
    branch_id?: number;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    changed_date?: Date;
    @IsOptional()
    @IsNumber()
    customer_group_id?: number;
    @IsOptional()
    @IsNumber()
    customer_id?: number;
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
    @IsOptional()
    @IsNumber()
    emp_dept_id?: number;
    @IsOptional()
    @IsNumber()
    permit_emp_id?: number;
    @IsOptional()
    @IsNumber()
    save_emp_id?: number;
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePriceListLineDto)
    price_list_lines: CreatePriceListLineDto[];

}
