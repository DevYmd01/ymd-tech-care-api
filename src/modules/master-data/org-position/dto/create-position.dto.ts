import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";
export class CreatePositionDto {
    @IsNotEmpty()
    @IsString()
    position_code: string;

    @IsNotEmpty()
    @IsString()
    position_name: string;

    @IsNotEmpty()
    @IsString()
    position_name_en: string;

    @IsOptional()
    @IsBoolean()
    is_active: boolean;
}
