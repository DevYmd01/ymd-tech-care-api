import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { TransferInService } from './transfer-in.service';
import { CreateTransferInHeaderDto } from './dto/create-transfer-in-header.dto';


@Controller('transfer-in')
export class TransferInController {
    constructor(private readonly transferInService: TransferInService) {}

    @Post()
    async create(@Body() createTransferInHeaderDto: CreateTransferInHeaderDto) {
        return await this.transferInService.create(createTransferInHeaderDto);
    }

    @Get()
    async findAll() {
        return await this.transferInService.findAll();
    }

    @Get('pending-in')
    async findPendingIn() {
        return await this.transferInService.findPendingIn();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.transferInService.findOne(+id);
    }

    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() updateTransferInHeaderDto: UpdateTransferInHeaderDto) {
    //     return await this.transferInService.update(+id, updateTransferInHeaderDto);
    // }


}
