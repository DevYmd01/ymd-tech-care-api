export type IssuePolicy =
  | 'FIFO'
  | 'FEFO'
  | 'LIFO'
  | 'MANUAL';

export interface AllocationRequest {
  item_id: number;
  warehouse_id?: number;
  location_id?: number;
  qty: number;
  issue_policy: IssuePolicy;
}

export interface AllocationResult {
  success: boolean;
  allocations: AllocationLine[];
  missing_qty?: number;
}

export interface AllocationLine {
  lot_id: number;
  lot_no?: string;
  item_lot_balance_id: number;
  qty: number;
  available_qty?: number;
  warehouse_id?: number;
  location_id?: number;
expiry_date?: Date | null;
mfd_date?: Date | null;


}