import { Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Body } from '@nestjs/common';

@Controller('location')
export class LocationController {

    constructor(private readonly locationService: LocationService) { }

    @Post()
    async create(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.create(createLocationDto);
    }

    @Get()
    async findAll() {
        return this.locationService.findAll();
    }

    // แสดงข้อมูล location ตาม location_id
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.locationService.findOne(+id);
    }

    @Get('warehouse/:warehouse_id')
    async findByWarehouse(@Param('warehouse_id') warehouse_id: string) {
        return this.locationService.findByWarehouse(+warehouse_id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateLocationDto: CreateLocationDto) {
        return this.locationService.update(+id, updateLocationDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.locationService.remove(+id);
    }
}

