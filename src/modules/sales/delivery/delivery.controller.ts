import { Controller, Get, Query} from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}
  
  @Get('pending-deliveries')
  async getPendingDeliveries( ) {
    return this.deliveryService.getPendingDeliveries();
  }
} 
