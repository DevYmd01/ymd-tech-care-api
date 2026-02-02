import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDesignDto {
    @IsString()
    @IsNotEmpty()
    item_design_code: string;
    @IsString()
    @IsNotEmpty()
    item_design_name: string;
    @IsString()
    @IsOptional()
    item_design_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
} 