import { Controller, Post, Body, Request, Patch, Param, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CreatePOHeaderDTO } from './dto/create-po-header.dto';
import { UpdatePOHeaderDTO } from './dto/update-po-header.dto';
import { PoService } from './po.service';

@Controller('po')
export class PoController {
    constructor(private readonly poService: PoService) { }

        @Get('po-all-table')
    findAllForTable(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe) pageSize: number,
    ) {
        return this.poService.findAllForTable(page, pageSize);
    }

    @Post()
    createPOHeader(@Body() createPOHeaderDTO: CreatePOHeaderDTO, @Request() req: any) {
        return this.poService.createPOHeader(createPOHeaderDTO, req.context);
    }

    @Patch(':po_id')
    updatePO(@Body() updatePOHeaderDTO: UpdatePOHeaderDTO, @Request() req: any, @Param('po_id') po_id: number) {
        return this.poService.updatePO(po_id, updatePOHeaderDTO, req.context);
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

       @Patch(':po_id/approve')
    approve(@Param('po_id') po_id: number) {
        return this.poService.approve(+po_id);
    }

}
