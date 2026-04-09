import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber} from "class-validator";


export class CreateEmployeeSideDto {
    @IsNotEmpty()
    @IsString()
    emp_side_code!: string
    @IsNotEmpty()
    @IsString()
    emp_side_name!: string
    @IsOptional()
    @IsString()
    emp_side_nameeng?: string
    @IsOptional()
    @IsBoolean()
    is_active?: boolean
}