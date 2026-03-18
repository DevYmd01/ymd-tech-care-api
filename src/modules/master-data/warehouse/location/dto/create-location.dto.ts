import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLocationDto {
    @IsNotEmpty()
    warehouse_id!: number;

    @IsNotEmpty()
    @IsString()
    location_code!: string;

    @IsNotEmpty()
    @IsString()
    location_name!: string;

    @IsNotEmpty()
    @IsNumber()
    shelf_id!: number;

    @IsOptional()
    @IsString()
    location_nameeng?: string;

    @IsNotEmpty()
    @IsBoolean()
    is_active!: boolean;
}
