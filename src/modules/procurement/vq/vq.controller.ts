import { Controller, Get, Body, Post, Param, Request, Patch, Query } from '@nestjs/common';
import { CreateVQHeaderDTO } from './dto/create-vq-header.bto';
import { UpdateVQHeaderDTO } from './dto/update-vq-header.dto';
import { VqService } from './vq.service';
import { SearchVQDto } from './dto/search-vq.dto';

@Controller('vq')
export class VqController {

  constructor(private readonly vqService: VqService) { }

  @Post()
  create(@Body() createVQHeaderDto: CreateVQHeaderDTO, @Request() req: any) {
    return this.vqService.create(createVQHeaderDto, req.context);
  }

  @Get('1')
  findAll() {
    return this.vqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vqService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateVQHeaderDTO: UpdateVQHeaderDTO, @Request() req: any) {
    return this.vqService.update(+id, UpdateVQHeaderDTO, req.context);
  }

  @Get()
  findAllByVQ(
    @Query() query: SearchVQDto,
  ) {
    return this.vqService.findAllByVQ(query);
  }

  // แสดง rfq-vendov ทั้งหมดเพื่อรอสร้าง vq ค่า rfq_vendor จะต้อง is_action = true และ status
  @Get('rfq/waiting-for-rfq-vendor/:id')
  findPRWithoutRFQ(
    @Param('id') rfq_id: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.vqService.findPRWithoutRFQ(
      +rfq_id,
      Number(page) || 1,
      Number(pageSize) || 20,
    );
  }

  // แสดง rfq ทั้งหมดเพื่อรอสร้าง vq ค่า rfq_vendor จะต้อง is_action = true และ status
  @Get('rfq/waiting-for-rfq')
  // แสดง rfq_vendor ทั้งหมดเพื่อแสดงให้เห็นว่ามีการส่ง RFQ แล้ว ใช้ใน table frontend
  findPRWithoutVQ(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.vqService.findPRWithoutVQ(
      Number(page) || 1,
      Number(pageSize) || 20,
    );
  }

  @Get(':vq_id/lines')
  findVQLines(@Param('vq_id') vq_id: string) {
    return this.vqService.findVQLines(+vq_id);
  }

}
