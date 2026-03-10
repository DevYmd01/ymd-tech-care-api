import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

// ❌ ลบ @Injectable() ออก — DTO ไม่ใช่ NestJS Provider
export class SendMailRFQDTO {

    @IsArray()
    @IsEmail({}, { each: true })  // { each: true } = validate ทีละ element
    @IsOptional()
    to: string[];

    @IsArray()
    @IsEmail({}, { each: true })
    @IsOptional()
    cc: string[];

    @IsString()
    @IsOptional()
    subject: string;
}