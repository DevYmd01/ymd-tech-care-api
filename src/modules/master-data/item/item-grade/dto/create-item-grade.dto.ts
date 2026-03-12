import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateItemGradeDto {
    @IsString()
    @IsNotEmpty()
    item_grade_code: string;
    @IsString()
    @IsNotEmpty()
    item_grade_name: string;
    @IsString()
    @IsOptional()
    item_grade_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}