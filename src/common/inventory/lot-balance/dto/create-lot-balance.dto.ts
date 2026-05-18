export class CreateLotBalanceDto {
  lot_id!: number;
  item_id!: number;
  warehouse_id!: number;
  location_id!: number;
  branch_id!: number;

  // Optional starting quantities when creating a new lot balance
  qty_on_hand?: number;
  qty_reserved?: number;
  qty_available?: number;
}
