import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemLotService } from './item-lot.service';
import { CreateItemLotDto } from './dto/create-item-lot.dto';
import { UpdateItemLotDto } from './dto/update-item-lot.dto';
import { ParseIntPipe } from '@nestjs/common';
import { GetAvailableLotService } from '@/common/inventory/lot/service/get-available-lot.service';


@Controller('item-lot')
export class ItemLotController {
    constructor(
        private readonly itemLotService: ItemLotService,
        private readonly getAvailableLotService: GetAvailableLotService
    ) {}

    @Post()
    async create(@Body() createItemLotDto: CreateItemLotDto) {
        return await this.itemLotService.create(createItemLotDto);
    }

    @Get()
    async findAll() {
        return await this.itemLotService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.itemLotService.findOne(+id);
    }

    @Get('item-lot/:itemId')
getItemLot(
  @Param('itemId', ParseIntPipe) itemId: number,
) {
  return this.getAvailableLotService.execute(
    itemId,
    1,
    1,
  );
}

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateItemLotDto: UpdateItemLotDto) {
        return await this.itemLotService.update(+id, updateItemLotDto);
    }


}
