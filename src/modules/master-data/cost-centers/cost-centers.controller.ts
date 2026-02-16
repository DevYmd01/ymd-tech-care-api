import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CostCentersService } from './cost-centers.service';
import { CreateCostCentersDto } from './dto/create-cost-centers.dto';

@Controller('cost-centers')
export class CostCentersController {
    constructor(private readonly costCentersService: CostCentersService) { }

    @Post()
    create(@Body() createCostCentersDto: CreateCostCentersDto) {
        return this.costCentersService.create(createCostCentersDto);
    }

    @Get()
    findAll() {
        return this.costCentersService.findAll();
    }

    @Get(':cost_center_id')
    findOne(@Param('cost_center_id') cost_center_id: string) {
        return this.costCentersService.findOne(+cost_center_id);
    }

    @Put(':cost_center_id')
    update(@Param('cost_center_id') cost_center_id: string, @Body() updateCostCentersDto: CreateCostCentersDto) {
        return this.costCentersService.update(+cost_center_id, updateCostCentersDto);
    }

    @Delete(':cost_center_id')
    remove(@Param('cost_center_id') cost_center_id: string) {
        return this.costCentersService.remove(+cost_center_id);
    }
}
