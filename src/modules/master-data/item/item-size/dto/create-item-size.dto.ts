import { IsBoolean, IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateItemSizeDto {
    @IsString()
    @IsNotEmpty()
    item_size_code: string;
    @IsString()
    @IsNotEmpty()
    item_size_name: string;
    @IsString()
    @IsOptional()
    item_size_nameeng: string;
    @IsBoolean()
    @IsOptional()
    is_active: boolean;
}