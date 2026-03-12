import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShelfDto {
    @IsString()
    @IsNotEmpty()
    shelf_code: string;
    @IsString()
    @IsNotEmpty()
    shelf_name: string;
    @IsString()
    @IsOptional()
    shelf_nameeng?: string;
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}