// inventory-preview.request.ts

export interface InventoryPreviewRequest {

  // SALE_ORDER
  // DELIVERY
  // TRANSFER
  // PURCHASE_RECEIVE
  system_document_code: string;

  item_id: number;

  qty: number;

  branch_id?: number;

  warehouse_id?: number;

  location_id?: number;

}