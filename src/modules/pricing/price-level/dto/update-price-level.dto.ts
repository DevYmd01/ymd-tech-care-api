import {
    IsString,        // ตรวจว่าเป็น string
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePriceLevelDto {

    @IsNotEmpty()
    @IsString()
    name!: string;
}