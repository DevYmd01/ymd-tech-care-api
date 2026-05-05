import {
    IsInt,
    IsOptional,
    IsString,
    IsDateString,
    IsArray,
    ValidateNested,
    IsNumber,
    IsDecimal,
    IsNotEmpty,
    IsDate,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

//
// D6 LINE DTO
//
import { UpdateSaleReservationLineDto } from '../dto/update-sale-reservation-line.dto';

//
// D5 HEADER DTO
//
export class UpdateSaleReservationHeaderDto {

    @IsDate()
    @Type(() => Date)
    reservation_date?: Date;

    @IsOptional()
    @IsInt()
    sq_id?: number;

    @IsInt()
    aq_id!: number;

    @IsInt()
    customer_id!: number;

    @IsInt()
    branch_id!: number;

    @IsString()
    status!: string;

    @IsOptional()
    @IsInt()
    ship_days?: number;

    @IsString()
    remarks?: string;

    @IsOptional()
    @IsInt()
    payment_term_days?: number;

    @IsString()
    onhold?: string;

    @IsOptional()
    @IsInt()
    emp_sale_id?: number;

    @IsInt()
    sale_area_id!: number;

    @IsInt()
    emp_dept_id!: number;

    @IsInt()
    project_id!: number;

    @IsString()
    status_remark?: string;


    @IsNotEmpty()
    @IsString()
    base_currency_code!: string;

    @IsNotEmpty()
    @IsString()
    quote_currency_code!: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    exchange_rate!: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    exchange_rate_date!: Date;

    @IsNotEmpty()
    @IsNumber()
    tax_code_id!: number;

    @IsOptional()
    @IsString()
    discount_expression?: string;

    //
    // LINES
    //
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSaleReservationLineDto)
    saleReservationLines!: UpdateSaleReservationLineDto[];
}