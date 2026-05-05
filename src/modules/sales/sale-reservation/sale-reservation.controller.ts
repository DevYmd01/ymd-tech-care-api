import { Controller, Post, Body, Request, Patch, Param, Get, ParseIntPipe} from '@nestjs/common';
import { SaleReservationService } from './sale-reservation.service';
import { CreateSaleReservationHeaderDto } from './dto/create-sale-reservation-header.dto';
import { StockOptionQueryDto } from './dto/stock-options-query.dto';
import { UpdateSaleReservationHeaderDto } from './dto/update-sale-reservation-header.dto';

@Controller('sale-reservation')
export class SaleReservationController {
    
  constructor(private readonly saleReservationService: SaleReservationService) {}

  @Post()
  async create(@Body() createSaleReservationHeaderDto: CreateSaleReservationHeaderDto) {
    return this.saleReservationService.create(createSaleReservationHeaderDto);
  }

  @Get()
  async findAll() {
    return this.saleReservationService.findAll();
  }


    @Get('available-approvals')
  async sqApprovalPending() {
    return this.saleReservationService.sqApprovalPending();
  }

      @Get('stock-options-query')
    async stockOptionsQuery(@Param() stockOptionQueryDto: StockOptionQueryDto) {
      return this.saleReservationService.stockOptionsQuery(stockOptionQueryDto);
    }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.saleReservationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleReservationHeaderDto: UpdateSaleReservationHeaderDto
  ) {
    return this.saleReservationService.update(id, updateSaleReservationHeaderDto);
  }

  @Get('available-approvals/:id')
  async sqApprovalPendingById(@Param('id', ParseIntPipe) aq_id: number) {
    return this.saleReservationService.sqApprovalPendingById(aq_id);
  }

  // แสดงข้อมูล item ที่ผ่านการอนุมัติ quotation
  @Get('available-items/:id')
  async getAvailableItems(@Param('id', ParseIntPipe) id: number) {
    return this.saleReservationService.getAvailableItems(id);
  }

 @Get('warehouse-stock/:item_id')
  async getStock(@Param('item_id') itemId: string) {
    return this.saleReservationService.getStockByWarehouse(Number(itemId));
  }

@Get('location-in-warehouse-stock/:item_id/:warehouse_id')
async getStockByLocationInWarehouse(
  @Param('item_id') itemId: string,
  @Param('warehouse_id') warehouseId: string,
) {
  return this.saleReservationService.getStockByLocationInWarehouse(
    Number(warehouseId),
    Number(itemId),
  );
}



}
