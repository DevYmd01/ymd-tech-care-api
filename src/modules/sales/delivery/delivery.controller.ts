import { Controller, Get, Query, Post, Body, Patch, Param } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryHeaderDto, UpdateDeliveryHeaderDto } from './dto/delivery-header.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  async create(@Body() createDeliveryHeaderDto: CreateDeliveryHeaderDto) {
    return this.deliveryService.create(createDeliveryHeaderDto);
  }

  @Get()
  async findAll() {
    return this.deliveryService.findAll();
  }

  
  @Get('pending-deliveries')
  async getPendingDeliveries( ) {
    return this.deliveryService.getPendingDeliveries();
  }

@Patch(':delivery_id')
async update(
  @Param('delivery_id') delivery_id: string,
  @Body() updateDeliveryHeaderDto: UpdateDeliveryHeaderDto,
) {
  return this.deliveryService.update(
    +delivery_id,
    updateDeliveryHeaderDto,
  );
}


  @Get(':so_id/pending-deliveries')
  async getPendingDeliveriesBySoId(@Query('so_id') so_id: number) {
    return this.deliveryService.getPendingDeliveriesBySoId(so_id);
  }
}
