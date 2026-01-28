import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";
export class UpdatePositionDto {

    @IsString()
    position_code: string;

    @IsString()
    position_name: string;

    @IsString()
    position_name_en: string;

    @IsOptional()
    @IsBoolean()
    is_active: boolean;
}
