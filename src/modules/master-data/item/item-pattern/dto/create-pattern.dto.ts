import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePatternDto {
    @IsString()
    @IsNotEmpty()
    item_pattern_code: string;
    @IsString()
    @IsNotEmpty()
    item_pattern_name: string;
    @IsString()
    @IsOptional()
    item_pattern_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}