import { Injectable } from '@nestjs/common';
import { CreateBusinessTypeDto } from './dto/create-business-type.dto';
import { UpdateBusinessTypeDto } from './dto/update-business-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusinessTypeService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateBusinessTypeDto) {
        return this.prisma.business_type.create({
            data: {
                business_type_code: dto.business_type_code,
                business_type_name: dto.business_type_name,
                business_type_nameeng: dto.business_type_nameeng,
                remark: dto.remark,
                is_active: dto.is_active ?? true,
            },
        });
    }
    async findAll() {
        return this.prisma.business_type.findMany({
            where: { is_active: true },
            orderBy: { business_type_id: 'asc' },
        });
    }
    async findOne(id: number) {
        return this.prisma.business_type.findUnique({
            where: { business_type_id: id },
        });
    }
    async update(id: number, dto: UpdateBusinessTypeDto) {
        return this.prisma.business_type.update({
            where: { business_type_id: id },        
            data: {
                business_type_code: dto.business_type_code,
                business_type_name: dto.business_type_name,
                business_type_nameeng: dto.business_type_nameeng,
                remark: dto.remark,
                is_active: dto.is_active,
            },
        });
    }
    async remove(id: number) {
        return this.prisma.business_type.delete({
            where: { business_type_id: id },
        });
    }   
}
