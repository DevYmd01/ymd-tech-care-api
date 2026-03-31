import { Controller, Post, Body, Request, Patch, Param, Get, ParseIntPipe } from '@nestjs/common';
import { CreatePOHeaderDTO } from './dto/create-po-header.dto';
import { UpdatePOHeaderDTO } from './dto/update-po-header.dto';
import { PoService } from './po.service';

@Controller('po')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Post()
  createPOHeader(@Body() createPOHeaderDTO: CreatePOHeaderDTO, @Request() req: any) {
    return this.poService.createPOHeader(createPOHeaderDTO, req.context);
  }

  @Patch(':po_id')
  updatePO(@Body() updatePOHeaderDTO: UpdatePOHeaderDTO, @Request() req: any, @Param('po_id', ParseIntPipe) po_id: number) {
    return this.poService.updatePO(po_id, updatePOHeaderDTO, req.context);
  }

  @Patch(':po_id/pending')
  updateStatusToPending(@Param('po_id', ParseIntPipe) po_id: number, @Request() req: any) {
    return this.poService.updateStatusToPending(po_id, req.context);
  }

  @Get()
  findAll() {
    return this.poService.findAll();
  }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.poService.findOne(+id);
    }

    // แสดง QC ทั้งหมดเพื่อแสดงให้เห็นว่ามีการส่ง QC แล้ว ใช้ใน table frontend แล้วใช้ในหน้า PO เพื่อแสดงว่ามีการส่ง QC รอทำการสร้าง PO หรือยังถ้ายังให้แสดงปุ่ม Create PO ถ้ามีแล้วให้แสดงปุ่ม View QC แทน
    @Get('pr/waiting-for-qc')
    findPRWithoutQC() {
      return this.poService.findPRWithoutQC();
    }

        @Get(':qc_id/waiting-for-qc')
    findQCWithoutPO(
      @Param('qc_id') qc_id: number,
    ) {
      return this.poService.findQCWithoutPO(+qc_id);
    }


}
