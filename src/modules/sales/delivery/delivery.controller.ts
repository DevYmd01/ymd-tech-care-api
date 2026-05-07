import { Controller, Get, Query} from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  async findAll() {
    return this.deliveryService.findAll();
  }
  
  @Get('pending-deliveries')
  async getPendingDeliveries( ) {
    return this.deliveryService.getPendingDeliveries();
  }

  @Get(':so_id/pending-deliveries')
  async getPendingDeliveriesBySoId(@Query('so_id') so_id: number) {
    return this.deliveryService.getPendingDeliveriesBySoId(so_id);
  }
}
