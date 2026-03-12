import { IsNotEmpty } from "class-validator";


export class CreateWarehouseDto {
    @IsNotEmpty()
    warehouse_code: string;

    @IsNotEmpty()
    warehouse_name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    branch_id: number;
}
