import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { TransferStockService } from './transfer-stock.service';
import { CreateTransferHeaderDto } from './dto/create-transfer-req-header.dto';
import { UpdateTransferHeaderDto } from './dto/update-transfer-req-header.dto';
import { SearchTransferDto } from  './dto/search.dto'

@Controller('transfer-stock')
export class TransferStockController {
    
  constructor(private readonly transferStockService: TransferStockService) {}

  @Post()
  async create(@Body() createTransferHeaderDto: CreateTransferHeaderDto) {
    return await this.transferStockService.create(createTransferHeaderDto);
  }

  @Get()
  async findAll(
    @Query() searchTransferDto: SearchTransferDto
  ) {
    return await this.transferStockService.findAll(searchTransferDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transferStockService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTransferHeaderDto: UpdateTransferHeaderDto) {
    return await this.transferStockService.update(+id, updateTransferHeaderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.transferStockService.remove(+id);
  }

}
