import { Controller, Post, Body, Request } from '@nestjs/common';
import { CreatePOHeaderDTO } from './dto/create-po-header.dto';
import { CreatePOLineDTO } from './dto/create-po-line.dto';
import { PoService } from './po.service';

@Controller('po')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Post()
  createPOHeader(@Body() createPOHeaderDTO: CreatePOHeaderDTO, @Request() req: any) {
    return this.poService.createPOHeader(createPOHeaderDTO, req.context);
  }


}
