import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrgBranchDto {
    @IsString()
    @MaxLength(20)
    branch_code: string;

    @IsString()
    @MaxLength(200)
    branch_name: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class UpdateOrgBranchDto {

    @IsString()
    @MaxLength(20)
    branch_code: string;

    @IsString()
    @MaxLength(200)
    branch_name: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

