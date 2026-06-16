import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { TransferInService } from './transfer-in.service';
import { CreateTransferInHeaderDto } from './dto/create-transfer-in-header.dto';


@Controller('transfer-in')
export class TransferInController {
    constructor(private readonly transferInService: TransferInService) {}

    // @Post()
    // create(@Body() createTransferInHeaderDto: CreateTransferInHeaderDto) {
    //     console.log(createTransferInHeaderDto);
    //     return this.transferInService.create(createTransferInHeaderDto);
    // }
}
