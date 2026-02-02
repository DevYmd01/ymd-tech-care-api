import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClassDto {
    @IsString()
    @IsNotEmpty()
    item_class_code: string;
    @IsString()
    @IsNotEmpty()
    item_class_name: string;
    @IsString()
    @IsOptional()
    item_class_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}