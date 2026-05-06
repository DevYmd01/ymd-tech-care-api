import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";
export class UpdatePositionDto {

    @IsString()
    position_code!: string;

    @IsString()
    position_name!: string;

    @IsString()
    position_nameeng!: string;

    @IsOptional()
    @IsBoolean()
    is_active!: boolean;
}
