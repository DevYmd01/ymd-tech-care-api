// src/common/inventory/doc-link-ic/dto/doc-link-ic.dto.ts

import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { StockEffectType } from '../common/enums/stock-effect-type.enum';

export class DocLinkIcDto {
  // ======================================================
  // PRIMARY KEY
  // ======================================================
  @IsOptional()
  @IsInt()
  doc_link_ic_id?: number;

  // ======================================================
  // SYSTEM DOCUMENT
  // ======================================================
  @IsInt()
  system_document_id!: number;

  // ======================================================
  // DESCRIPTION
  // ======================================================
  @IsOptional()
  @IsString()
  docu_desc?: string;

  // ======================================================
  // REMARK
  // ======================================================
  @IsOptional()
  @IsString()
  remark?: string;

  // ======================================================
  // STOCK EFFECT
  // ======================================================
  @IsNotEmpty()
  @IsEnum(StockEffectType)
  stock_effect_ic!: StockEffectType;

  @IsOptional()
  @IsNumber()
  doc_type_no?: number;
  @IsOptional()
  @IsString()
  doc_type_name?: string;

  doc_type_name_eng?: string;


  // ======================================================
  // STATUS
  // ======================================================
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}