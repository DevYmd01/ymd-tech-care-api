import {
    IsString,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';

export class CreateCurrencyDto {
    @IsString()
    @IsNotEmpty()
    currency_code: string;

    @IsString()
    @IsNotEmpty()
    currency_name: string;

    @IsString()
    @IsNotEmpty()
    currency_nameeng: string;

    @IsNumber()
    @IsNotEmpty()
    exchange_rate: number;

    @IsString()
    @IsNotEmpty()
    status: string;
}