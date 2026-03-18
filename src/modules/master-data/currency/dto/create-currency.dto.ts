import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateCurrencyDto {
    @IsString()
    @IsNotEmpty()
    currency_code: string;

    @IsString()
    @IsNotEmpty()
    currency_name: string;

    @IsString()
    @IsOptional()
    currency_nameeng: string;

    @IsNumber()
    @IsNotEmpty()
    exchange_rate: number;

    @IsNotEmpty()
    is_active: boolean;

}