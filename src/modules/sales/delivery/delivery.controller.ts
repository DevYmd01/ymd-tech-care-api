import { Controller, Get, Query, Post, Body, Patch, Param } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryHeaderDto, UpdateDeliveryHeaderDto } from './dto/delivery-header.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) { }

    @Post()
    async create(@Body() createDeliveryHeaderDto: CreateDeliveryHeaderDto) {
        return this.deliveryService.create(createDeliveryHeaderDto);
    }

    @Get()
    async findAll() {
        return this.deliveryService.findAll();
    }


    @Get('pending-deliveries')
    async getPendingDeliveries() {
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


    @Get(':delivery_id')
    async findOne(@Param('delivery_id') delivery_id: string) {
        return this.deliveryService.findOne(+delivery_id);
    }


    @Get(':so_id/pending-deliveries')
    async getPendingDeliveriesBySoId(@Param('so_id') so_id: number) {
        return this.deliveryService.getPendingDeliveriesBySoId(so_id);
    }
}
