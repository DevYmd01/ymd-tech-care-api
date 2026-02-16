import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCostCentersDto } from './dto/create-cost-centers.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CostCentersService {
    constructor(private prisma: PrismaService) { }

    async create(createCostCentersDto: CreateCostCentersDto) {
        try {
            return await this.prisma.cost_center.create({
                data: createCostCentersDto,
            });

        } catch (error: any) {

            if (error?.code === 'P2002') {
                const fields = error.meta?.target?.join(', ') || 'unknown';
                throw new BadRequestException(`รหัสศูนย์ต้นทุนซ้ำ (${fields})`);
            }

            throw error;
        }
    }

    async findAll() {
        return this.prisma.cost_center.findMany();
    }

    async findOne(cost_center_id: number) {
        return this.prisma.cost_center.findUnique({
            where: { cost_center_id },
        });
    }

    async update(cost_center_id: number, updateCostCentersDto: CreateCostCentersDto) {
        return this.prisma.cost_center.update({
            where: { cost_center_id },
            data: updateCostCentersDto,
        });
    }

    async remove(cost_center_id: number) {
        return this.prisma.cost_center.delete({
            where: { cost_center_id },
        });
    }
}
