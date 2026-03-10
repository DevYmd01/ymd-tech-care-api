import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class CreateCostCentersDto {
    @IsString()
    cost_center_code: string;
    @IsString()
    cost_center_name: string;
    @IsBoolean()
    is_active: boolean;
}