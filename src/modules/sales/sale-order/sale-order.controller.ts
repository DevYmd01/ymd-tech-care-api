import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { CreateSaleReservationHeaderDto } from './dto/create-sale-order-header.dto';
import { StockOptionQueryDto } from './dto/stock-options-query.dto';
import { Query } from '@nestjs/common';


@Controller('sale-order')
export class SaleOrderController {
    
  constructor(private readonly saleOrderService: SaleOrderService) {}

  @Post()
  create(@Body() createSaleOrderDto: CreateSaleReservationHeaderDto) {
    return this.saleOrderService.create(createSaleOrderDto);
  }

  @Get()
  findAll() {
    return this.saleOrderService.findAll();
  }

    @Get('stock-options-query')
  async stockOptionsQuery(@Param() stockOptionQueryDto: StockOptionQueryDto) {
    return this.saleOrderService.stockOptionsQuery(stockOptionQueryDto);
  }

  @Get('available-rs')
  async sqReservationPending() {
    return this.saleOrderService.sqReservationPending();
  }
  
    @Patch(':so_id/pending')
    pending(@Param('so_id') so_id: number) {
        return this.saleOrderService.pending(+so_id);
    }


@Get('available-rs/:id')
async sqReservationPendingById(
  @Param('id') id: string
) {
  return this.saleOrderService.sqReservationPendingById(+id);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleOrderService.findOne(+id);
  }






//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateSaleOrderDto: UpdateSaleOrderDto) {
//     return this.saleOrderService.update(+id, updateSaleOrderDto);
//   }



}
