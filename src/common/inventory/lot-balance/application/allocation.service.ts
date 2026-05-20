import { AllocationRequest, AllocationResult, AllocationLine } from './allocation.types';
import { BalanceReader } from '../domain/balance.reader';
import { FIFOEngine } from './fifo.engine';
import { FEFOEngine } from './fefo.engine';
import { LIFOEngine } from './lifo.engine';

export class AllocationService {

  static async allocate(
    req: AllocationRequest
  ): Promise<AllocationResult> {

    const balances = await BalanceReader.getBalances(
      req.item_id,
      req.warehouse_id,
      req.location_id
    );

    let allocations: AllocationLine[] = [];

    switch (req.issue_policy) {

      case 'FIFO':
        allocations = FIFOEngine.execute(balances, req.qty);
        break;

      case 'FEFO':
        allocations = FEFOEngine.execute(balances, req.qty);
        break;

      case 'LIFO':
        allocations = LIFOEngine.execute(balances, req.qty);
        break;

      default:
        throw new Error('MANUAL not implemented yet');
    }

    const usedQty = allocations.reduce((s, i) => s + i.qty, 0);

    const success = usedQty === req.qty;

    return {
      success,
      allocations,
      missing_qty: success ? 0 : req.qty - usedQty,
    };
  }
}