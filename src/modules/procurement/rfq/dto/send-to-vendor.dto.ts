
import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Injectable()
export class SendMailRFQDTO {
    @IsString()
    @IsOptional()
    to: string;

    @IsString()
    @IsOptional()
    cc: string;

    @IsString()
    @IsOptional()
    subject: string;
}