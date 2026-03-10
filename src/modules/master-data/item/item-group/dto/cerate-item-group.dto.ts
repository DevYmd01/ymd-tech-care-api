import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";

export class CreateItemGroupDto {
    @IsNotEmpty()
    @IsString()
    item_group_code: string;
    @IsNotEmpty()
    @IsString()
    item_group_name: string;
    @IsOptional()
    @IsString()
    item_group_nameeng?: string;
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}