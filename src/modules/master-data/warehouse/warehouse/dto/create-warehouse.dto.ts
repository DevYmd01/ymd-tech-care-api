import { IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";


export class CreateWarehouseDto {
    @IsNotEmpty()
    @IsString()
    warehouse_code!: string;

    @IsNotEmpty()
    @IsString()
    warehouse_name!: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsNotEmpty()
    @IsNumber()
    branch_id!: number;
}
