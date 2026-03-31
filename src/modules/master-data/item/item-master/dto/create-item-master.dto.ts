import { IssuePolicy, TrackingLevel } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class NestedCreateItemBarcodeDto {
    @IsString()
    @IsNotEmpty()
    barcode: string;

    @IsNotEmpty()
    @IsInt()
    uom_id: number;

    @IsBoolean()
    @IsNotEmpty()
    is_primary: boolean;
}

export class CreateItemMasterDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    item_code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    item_name: string;

    @IsOptional()
    @IsInt()
    item_type_id?: number;

    @IsOptional()
    @IsInt()
    item_group_id?: number;

    @IsOptional()
    @IsInt()
    item_category_id?: number;

    @IsOptional()
    @IsInt()
    base_uom_id?: number;

    @IsOptional()
    @IsInt()
    sale_uom_id?: number;

    @IsOptional()
    @IsInt()
    tax_code_id?: number;

    @IsOptional()
    @IsString()
    @MaxLength(80)
    barcode_default?: string;

    @IsOptional()
    @IsBoolean()
    is_batch_control?: boolean;

    @IsOptional()
    @IsBoolean()
    is_expiry_control?: boolean;

    @IsOptional()
    @IsBoolean()
    is_serial_control?: boolean;

    @IsOptional()
    @IsNumber()
    standard_cost?: number;

    @IsOptional()
    @IsInt()
    shelf_life_days?: number;

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
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsInt()
    item_brand_id?: number;

    @IsOptional()
    @IsInt()
    item_pattern_id?: number;

    @IsOptional()
    @IsInt()
    item_design_id?: number;

    @IsOptional()
    @IsInt()
    item_class_id?: number;

    @IsOptional()
    @IsInt()
    item_size_id?: number;

    @IsOptional()
    @IsInt()
    item_color_id?: number;

    @IsOptional()
    @IsInt()
    item_grade_id?: number;

    // Add this for the initial barcode creation
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NestedCreateItemBarcodeDto)
    barcodes?: NestedCreateItemBarcodeDto[];
}
