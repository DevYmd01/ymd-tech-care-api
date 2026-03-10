import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    department_code: string;

    @IsNotEmpty()
    @IsString()
    department_name: string;

    @IsNotEmpty()
    @IsString()
    department_name_en: string;
}
