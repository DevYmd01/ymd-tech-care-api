// preview.types.ts

export interface PreviewContext {

  system_document_code: string;

  item_id: number;

  qty: number;

  branch_id?: number;

  warehouse_id?: number;

  location_id?: number;

}

export interface PreviewPolicy {

  issue_policy: string;

  negative_stock_check: number;

  negative_stock_mode: number;

  quantity_validation_flag: number;

}

export interface PreviewAllocation {

  lot_id: number;

  lot_no: string;

  qty: number;

  available_qty: number;

  warehouse_id?: number;

  location_id?: number;

  expiry_date?: Date | null;

}

export interface PreviewResult {

  success: boolean;

  policy: string;

  allocations: PreviewAllocation[];

  missing_qty: number;

  message?: string;

}