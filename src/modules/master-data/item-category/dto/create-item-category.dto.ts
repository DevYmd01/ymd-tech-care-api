import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsOptional,
} from 'class-validator';

export class CreateItemCategoryDto {
    @IsString()
    @IsNotEmpty()
    item_category_code: string;

    @IsString()
    @IsNotEmpty()
    item_category_name: string;

    @IsString()
    @IsOptional()
    item_category_nameeng?: string;

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;
}
