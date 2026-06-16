import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppvTransferStockService } from './appv-transfer-stock.service';
import { CreateAppvTransferHeaderDto } from './dto/create-appv-transfer-header.dto';
import { UpdateAppvTransferHeaderDto } from './dto/update-appv-transfer-header.dto';
import { SearchTransferDto } from './dto/search.dto';

@Controller('appv-transfer-stock')
export class AppvTransferStockController {
    constructor(private readonly appvTransferStockService: AppvTransferStockService) {}

    @Post()
    async create(@Body() createAppvTransferHeaderDto: CreateAppvTransferHeaderDto) {
        return await this.appvTransferStockService.create(createAppvTransferHeaderDto);
    }

    @Get()
    async findAll(
        @Query() searchTransferDto: SearchTransferDto
    ) {
        return await this.appvTransferStockService.findAll(searchTransferDto);
    }

        @Get('pending-approval')
    async findPendingApproval() {
        return await this.appvTransferStockService.findPendingApproval();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.appvTransferStockService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAppvTransferHeaderDto: UpdateAppvTransferHeaderDto) {
        return await this.appvTransferStockService.update(+id, updateAppvTransferHeaderDto);
    }






}
