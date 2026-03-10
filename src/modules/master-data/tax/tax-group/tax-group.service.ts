import { Injectable } from '@nestjs/common';
import { CreateTaxGroupDTO } from './dto/create-tax-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TaxGroupService {
    constructor(private readonly prisma: PrismaService) { }
    async create(createTaxGroupDTO: CreateTaxGroupDTO) {
        return this.prisma.tax_group.create({
            data: {
                tax_group_code: createTaxGroupDTO.tax_group_code,
                tax_rate: createTaxGroupDTO.tax_rate,
                description: createTaxGroupDTO.description ?? '',
                is_active: createTaxGroupDTO.is_active ?? true,
                tax_type: createTaxGroupDTO.tax_type,
            },
        });
    }

    async findAll() {
        return this.prisma.tax_group.findMany();
    }

    async findById(tax_group_id: string) {
        return this.prisma.tax_group.findUnique({
            where: {
                tax_group_id: Number(tax_group_id),
            },
        });
    }

    async update(tax_group_id: string, updateTaxGroupDTO: CreateTaxGroupDTO) {
        return this.prisma.tax_group.update({
            where: {
                tax_group_id: Number(tax_group_id),
            },
            data: {
                tax_group_code: updateTaxGroupDTO.tax_group_code,
                tax_rate: updateTaxGroupDTO.tax_rate,
                description: updateTaxGroupDTO.description ?? '',
                is_active: updateTaxGroupDTO.is_active ?? true,
                tax_type: updateTaxGroupDTO.tax_type,
            },
        });
    }
}
