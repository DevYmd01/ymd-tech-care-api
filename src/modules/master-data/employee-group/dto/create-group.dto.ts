import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    employee_group_code: string;

    @IsString()
    @IsNotEmpty()
    employee_group_name!: string;

    @IsString()
    @IsNotEmpty()
    employee_group_nameeng!: string;

    @IsOptional()
    @IsOptional()
    is_active?: boolean;
}
