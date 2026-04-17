import { Controller, Post, Body, Request, Patch, Param, Get, ParseIntPipe} from '@nestjs/common';
import { SaleQuotationService } from './sale-quotation.service';
import { CreateSaleQuotationHeaderDto } from './dto/create-sale-quotation-header.dto';
@Controller('sale-quotation')
export class SaleQuotationController {
  constructor(private readonly saleQuotationService: SaleQuotationService) {}

  @Post()
  create(@Body() createSaleQuotationHeaderDto: CreateSaleQuotationHeaderDto, @Request() req: any) {
    return this.saleQuotationService.create(createSaleQuotationHeaderDto, req.context );
  }

 
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.saleQuotationService.findOne(id);
  }

  @Get()
  findAll() {
    return this.saleQuotationService.findAll();
  }



}
