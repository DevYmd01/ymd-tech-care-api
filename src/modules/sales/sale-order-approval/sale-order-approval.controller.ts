import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SaleOrderApprovalService } from './sale-order-approval.service';
import { CreateSaleOrderApprovalHeaderDto } from './dto/create-sale-order-ap-header.dto';

@Controller('sale-order-approval')
export class SaleOrderApprovalController {
    constructor(private readonly saleOrderApprovalService: SaleOrderApprovalService) {}

    @Post()
    async create(@Body() createSaleOrderApprovalHeaderDto: CreateSaleOrderApprovalHeaderDto) {
        return this.saleOrderApprovalService.create(createSaleOrderApprovalHeaderDto);
    }

    @Get()
    async findAll() {
        return this.saleOrderApprovalService.findAll();
    }

    @Get('pending-approval')
    async soApprovalPending() {
        return this.saleOrderApprovalService.soApprovalPending();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.saleOrderApprovalService.findOne(+id);
    }

    @Get('pending-approval/:id')
    async findPendingApproval(@Param('id') id: string) {
        return this.saleOrderApprovalService.findPendingApproval(+id);
    }
}
