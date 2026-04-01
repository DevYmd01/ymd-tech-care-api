import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleChannelDto } from './dto/creact-sale-channel.dto';
import { UpdateSaleChannelDto } from './dto/update-sale-channel.dto';

@Injectable()
export class EmployeeSaleChannelService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateSaleChannelDto) {
        return this.prisma.employee_sale_channel.create({
            data: {
                channel_code: dto.channel_code,
                channel_name: dto.channel_name,
                channel_nameeng: dto.channel_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }
    async findAll() {
        return this.prisma.employee_sale_channel.findMany();
    }
    async findOne(id: number) {
        return this.prisma.employee_sale_channel.findUnique({
            where: { channel_id: id },
        });
    }
    async update(id: number, dto: UpdateSaleChannelDto) {
        return this.prisma.employee_sale_channel.update({
            where: { channel_id: id },
            data: {
                channel_code: dto.channel_code,
                channel_name: dto.channel_name,
                channel_nameeng: dto.channel_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }
    async remove(id: number) {
        return this.prisma.employee_sale_channel.delete({
            where: { channel_id: id },
        });
    }
}
