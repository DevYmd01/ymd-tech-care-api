import { IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GenerateDocNumberDto {
    @IsNotEmpty()
    @IsString()
    module_code: string;

    @IsNotEmpty()
    @IsString()
    document_type_code: string;

    @IsOptional()
    @IsNumber()
    branch_id?: number;

    @IsOptional()
    @IsString()
    prefix?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date?: Date;
}
