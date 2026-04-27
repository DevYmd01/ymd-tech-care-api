import { Injectable, BadRequestException } from '@nestjs/common';
import { GetAvailableLotService } from './get-available-lot.service';

@Injectable()
export class AllocateLotService {
  constructor(
    private readonly getAvailableLotService: GetAvailableLotService,
  ) {}

  async execute(
    itemId: number,
    branchId: number,
    warehouseId: number,
    requestQty: number,
  ) {
    const lots = await this.getAvailableLotService.execute(
      itemId,
      branchId,
      warehouseId,
    );

   let remain = requestQty;

const allocations: {
  lot_id: number;
  lot_no: string;
  qty: number;
}[] = [];

for (const row of lots) {
  if (remain <= 0) break;

  const available = Number(row.qty_available);
  const useQty = Math.min(available, remain);

  allocations.push({
    lot_id: row.lot_id,
    lot_no: row.lot.lot_no,
    qty: useQty,
  });

  remain -= useQty;
}

    if (remain > 0) {
      throw new BadRequestException(
        `Stock not enough. Missing ${remain}`,
      );
    }

    return allocations;
  }
}