import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber} from "class-validator";

export class CreateDepartmentDto {
@IsNotEmpty()
@IsString()
emp_dept_code!: string
@IsNotEmpty()
@IsString()
emp_dept_name!: string
@IsOptional()
@IsString()
emp_dept_nameeng?: string
@IsOptional()
@IsString()
remark?: string
@IsOptional()
@IsBoolean()
is_active?: boolean
@IsNotEmpty()
@IsNumber()
emp_side_id!: number
}
