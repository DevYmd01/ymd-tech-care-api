import { Controller, Post, Body, Request, Patch, Param, Get} from '@nestjs/common';
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



}
