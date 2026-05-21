export interface IcOptionContext {

  // =========================================================
  // CORE IDENTIFIER
  // =========================================================

  system_document_id: number;

  item_id: number;

  // =========================================================
  // SCOPE
  // =========================================================

  warehouse_id?: number;

  location_id?: number;

  uom_id?: number;


  // =========================================================
  // STOCK INFO (current state)
  // =========================================================

  qty: number;

  available_qty: number;

}