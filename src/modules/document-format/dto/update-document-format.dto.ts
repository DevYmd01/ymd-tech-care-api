import { IsNotEmpty, IsString, IsNumber, IsEnum } from "class-validator";


export class UpdateDocumentFormatDto {

    @IsNotEmpty()
    @IsString()
    prefix?: string;

    @IsNotEmpty()
    @IsString()
    pattern: string;

    @IsNumber()
    seq_length: number;

    @IsString()
    running_cycle: string;
}

