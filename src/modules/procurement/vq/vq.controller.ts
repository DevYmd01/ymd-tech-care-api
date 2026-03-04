import { Controller, Get, Body, Post, Param, Request, Patch } from '@nestjs/common';
import { CreateVQHeaderDTO } from './dto/create-vq-header.bto';
import { UpdateVQHeaderDTO } from './dto/update-vq-header.dto';
import { VqService } from './vq.service';


@Controller('vq')
export class VqController {
    
  constructor(private readonly vqService: VqService) {}

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

}
