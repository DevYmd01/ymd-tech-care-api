import { Controller, Get, Query, Param, Body, Post , Request } from '@nestjs/common';
import { GrnService } from './grn.service';
import { CreateGrnHeaderDto } from './dto/create-grn-header.dto';

@Controller('grn')
export class GrnController {
    constructor(private readonly grnService: GrnService) {}

    @Post()
    async create(@Body() createGrnHeaderDto: CreateGrnHeaderDto, @Request() req: any) {
        return this.grnService.create(createGrnHeaderDto, req.user);
    }

    @Get()
    async findAll() {
        return this.grnService.findAll();
    }

    @Get('pending-grn')
    async pendingGrn() {
        return this.grnService.pendingGrn();
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.grnService.findOne(+id);
    }


}
