import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateItemColorDto {
    @IsString()
    @IsNotEmpty()
    item_color_code: string;
    @IsString()
    @IsNotEmpty()
    item_color_name: string;
    @IsString()
    @IsOptional()
    item_color_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}