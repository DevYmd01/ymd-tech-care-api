import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemBarcodeService } from './item-barcode.service';
import { CreateItemBarcodeDto } from './dto/create-item-barcode.dto';
import { UpdateItemBarcodeDto } from './dto/update-item-barcode.dto';

@Controller('item-barcodes')
export class ItemBarcodeController {
  constructor(private readonly itemBarcodeService: ItemBarcodeService) {}

  @Post()
  create(@Body() dto: CreateItemBarcodeDto) {
    return this.itemBarcodeService.create(dto);
  }

  @Get()
  findAll() {
    return this.itemBarcodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemBarcodeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItemBarcodeDto,
  ) {
    return this.itemBarcodeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemBarcodeService.remove(id);
  }
}