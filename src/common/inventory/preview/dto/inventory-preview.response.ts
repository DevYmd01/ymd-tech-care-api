// inventory-preview.response.ts

export interface InventoryPreviewResponse {

  success: boolean;

  policy: string;

  allocations: PreviewAllocationLine[];

  missing_qty: number;

  message?: string;

}

export interface PreviewAllocationLine {

  lot_id: number;

  lot_no: string;

  qty: number;

  available_qty: number;

  warehouse_id?: number;

  location_id?: number;

  expiry_date?: Date | null;

}