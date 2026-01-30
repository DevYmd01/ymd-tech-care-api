import {
    IsString,
    IsNotEmpty,
    IsBoolean,
} from 'class-validator';

export class CreateItemCategoryDto {
    @IsString()
    @IsNotEmpty()
    item_category_code: string;

    @IsString()
    @IsNotEmpty()
    item_category_name: string;

    @IsString()
    @IsNotEmpty()
    item_category_nameeng: string;

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;
}
