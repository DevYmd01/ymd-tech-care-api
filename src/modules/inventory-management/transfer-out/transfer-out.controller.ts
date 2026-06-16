import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { TransferOutService } from './transfer-out.service';
import { CreateTransferOutHeaderDto } from './dto/create-transfer-out-header.dto';

@Controller('transfer-out')
export class TransferOutController {
    constructor(private readonly transferOutService: TransferOutService) {}

    @Post()
    async create(@Body() createTransferOutHeaderDto: CreateTransferOutHeaderDto) {
        return await this.transferOutService.create(createTransferOutHeaderDto);
    }

    @Get()
    async findAll() {
        return await this.transferOutService.findAll();
    }

    @Get('pending-out')
    async findPendingOut() {
        return await this.transferOutService.findPendingOut();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.transferOutService.findOne(+id);
    }


}
