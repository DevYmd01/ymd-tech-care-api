import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { ReturnStockService } from './return-stock.service';
import { CreateReturnStockHeaderDto } from './dto/create-return-stock-header.dto';
import { UpdateReturnStockHeaderDto } from './dto/update-return-stock-header.dto';
import { SearchPendingDto } from './dto/search.dto';


@Controller('return-stock')
export class ReturnStockController {
    constructor(private readonly returnStockService: ReturnStockService) { }

    @Post()
    async create(@Body() createReturnStockHeaderDto: CreateReturnStockHeaderDto) {
        return await this.returnStockService.create(createReturnStockHeaderDto);
    }

    @Get()
    async findAll() {
        return await this.returnStockService.findAll();
    }

    // @Get('pending')
    // async findPendingReturnStock(
    //     @Param() searchPendingDto: SearchPendingDto,
    // ) {
    //     return await this.returnStockService.findPendingReturnStock(searchPendingDto);
    // }
    
    @Get('pending')
    async searchPending(
        @Query() searchPendingDto: SearchPendingDto
    ) {
        return await this.returnStockService.searchPending(searchPendingDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.returnStockService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateReturnStockHeaderDto: UpdateReturnStockHeaderDto) {
        return await this.returnStockService.update(+id, updateReturnStockHeaderDto);
    }



    // @Get('pending/:issue_stock_id')
    // async findPendingReturnStockBySoId(@Param('issue_stock_id') issue_stock_id: number) {
    //     return await this.returnStockService.findPendingReturnStockBySoId(issue_stock_id);
    // }





}
