import { Controller, Get, Patch, Param, Body, Request} from '@nestjs/common';
import { PriceLevelService } from './price-level.service';
import { UpdatePriceLevelDto } from './dto/update-price-level.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('price-level')
export class PriceLevelController {
  constructor(private readonly priceLevelService: PriceLevelService) {}

  @Get()
  findAll() {
    return this.priceLevelService.findAll();
  }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.priceLevelService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePriceLevelDto: UpdatePriceLevelDto, @Request() req: any) {
        return this.priceLevelService.update(+id, updatePriceLevelDto);
    }


}
