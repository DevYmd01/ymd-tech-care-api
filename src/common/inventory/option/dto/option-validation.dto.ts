import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';



export class IcOptionContextDto {

  // =========================================================
  // CORE IDENTIFIER
  // =========================================================

  @IsString()
  @IsNotEmpty()
  system_document_code!: string;

  @IsNumber()
  item_id!: number;

  // =========================================================
  // SCOPE
  // =========================================================

  @IsOptional()
  @IsNumber()
  warehouse_id?: number;

  @IsOptional()
  @IsNumber()
  location_id?: number;

  @IsOptional()
  @IsNumber()
  item_uom_id?: number;

  // =========================================================
  // STOCK INFO (current state)
  // =========================================================

  @IsNumber()
  qty!: number;

//   @IsNumber()
//   available_qty!: number;

}