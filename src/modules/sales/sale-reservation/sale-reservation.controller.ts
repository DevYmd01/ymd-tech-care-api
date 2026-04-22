import { Controller, Post, Body, Request, Patch, Param, Get, ParseIntPipe} from '@nestjs/common';
import { SaleReservationService } from './sale-reservation.service';

@Controller('sale-reservation')
export class SaleReservationController {
    
  constructor(private readonly saleReservationService: SaleReservationService) {}


  @Get('available-approvals')
  async sqApprovalPending() {
    return this.saleReservationService.sqApprovalPending();
  }

  @Get('available-approvals/:id')
  async sqApprovalPendingById(@Param('id', ParseIntPipe) aq_id: number) {
    return this.saleReservationService.sqApprovalPendingById(aq_id);
  }



}
