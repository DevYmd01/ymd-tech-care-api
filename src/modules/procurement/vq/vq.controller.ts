import { Controller, Get, Body, Post, Param, Request, Patch, Query } from '@nestjs/common';
import { CreateVQHeaderDTO } from './dto/create-vq-header.bto';
import { UpdateVQHeaderDTO } from './dto/update-vq-header.dto';
import { VqService } from './vq.service';


@Controller('vq')
export class VqController {

  constructor(private readonly vqService: VqService) { }

  @Post()
  create(@Body() createVQHeaderDto: CreateVQHeaderDTO, @Request() req: any) {
    return this.vqService.create(createVQHeaderDto, req.context);
  }

  @Get()
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
  findAllByVendor() {
    return this.vqService.findAllByVendor();
  }

  // แสดง rfq_vendor ทั้งหมดเพื่อแสดงให้เห็นว่ามีการส่ง RFQ แล้ว ใช้ใน table frontend
  @Get('pr/waiting-for-rfq-vendor')
  findPRWithoutRFQ(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.vqService.findPRWithoutRFQ(
      Number(page) || 1,
      Number(pageSize) || 20,
    );
  }

  ///  รอเพื่อสร้าง VQ จาก RFQ
  @Get('pr/waiting-for-vq-vendor')
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
