import { Controller } from '@nestjs/common';
import { CreateVQHeaderDTO } from './dto/create-vq-header.bto';
import { VqService } from './vq.service';
import { Body, Post } from '@nestjs/common';


@Controller('vq')
export class VqController {
    
  constructor(private readonly vqService: VqService) {}

  @Post()
  create(@Body() createVQHeaderDto: CreateVQHeaderDTO) {
    return this.vqService.create(createVQHeaderDto);
  }


}
