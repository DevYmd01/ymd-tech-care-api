import { Controller, Post, Body, Request, Patch, Param, Get, ParseIntPipe} from '@nestjs/common';
import { SaleReservationService } from './sale-reservation.service';
import { CreateSaleReservationHeaderDto } from './dto/create-sale-reservation-header.dto';


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


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.saleReservationService.findOne(+id);
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



}
