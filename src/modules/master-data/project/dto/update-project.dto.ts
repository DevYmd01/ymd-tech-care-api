import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateProjectDto {

    @IsString()
    project_code: string;

    @IsString()
    project_name: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    budget_amount?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    start_date?: string;

    @IsOptional()
    @IsDateString()
    end_date?: string;

    @Type(() => Boolean)
    @IsBoolean()
    is_active: boolean;
}
