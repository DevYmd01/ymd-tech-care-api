import { IsOptional, IsString } from "class-validator";

export class CreateItemTypeDTO {
    @IsString()
    @IsOptional()
    item_type_code: string;
    @IsString()
    @IsOptional()
    item_type_name: string;
    @IsString()
    @IsOptional()
    item_type_nameeng: string;
}