import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from "class-validator";
import { TrackingLevel, IssuePolicy } from '@prisma/client'

export class CreateItemMasterDto {
    @IsNotEmpty()
    @IsString()
    item_code: string;
    @IsNotEmpty()
    @IsString()
    item_name: string;
    @IsOptional()
    @IsNumber()
    base_uom_id?: number;
    @IsOptional()
    @IsNumber()
    purchase_uom_id?: number;
    @IsOptional()
    @IsNumber()
    sale_uom_id?: number;
    @IsOptional()
    @IsString()
    default_tax_code?: string;
    @IsOptional()
    @IsNumber()
    item_type_id?: number;
    @IsOptional()
    @IsString()
    item_type_code?: string;
    @IsOptional()
    @IsNumber()
    item_category_id?: number;
    @IsOptional()
    @IsString()
    item_category_code?: string;
    @IsOptional()
    @IsNumber()
    item_brand_id?: number;
    @IsOptional()
    @IsString()
    item_brand_code?: string;
    @IsOptional()
    @IsNumber()
    item_pattern_id?: number;
    @IsOptional()
    @IsString()
    item_pattern_code?: string;
    @IsOptional()
    @IsNumber()
    item_design_id?: number;
    @IsOptional()
    @IsString()
    item_design_code?: string;
    @IsOptional()
    @IsNumber()
    item_class_id?: number;
    @IsOptional()
    @IsString()
    item_class_code?: string;
    @IsOptional()
    @IsNumber()
    item_size_id?: number;
    @IsOptional()
    @IsString()
    item_size_code?: string;
    @IsOptional()
    @IsNumber()
    item_group_id?: number;
    @IsOptional()
    @IsString()
    item_group_code?: string;
    @IsOptional()
    @IsEnum(IssuePolicy)
    default_issue_policy?: IssuePolicy;
    @IsOptional()
    @IsEnum(TrackingLevel)
    lot_tracking_level?: TrackingLevel;
    @IsOptional()
    @IsEnum(TrackingLevel)
    serial_tracking_level?: TrackingLevel;
    @IsOptional()
    @IsNumber()
    shelf_life_days?: number;
}