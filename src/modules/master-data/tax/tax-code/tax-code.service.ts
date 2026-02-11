import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaxCodeDTO } from './dto/create-tax-code.dto';

@Injectable()
export class TaxCodeService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createTaxCodeDTO: CreateTaxCodeDTO) {
        return this.prisma.tax_code.create({
            data: {
                tax_code: createTaxCodeDTO.tax_code,
                tax_name: createTaxCodeDTO.tax_name,
                description: createTaxCodeDTO.description ?? '',
                tax_type: createTaxCodeDTO.tax_type,
                tax_rate: createTaxCodeDTO.tax_rate,
                tax_group_id: createTaxCodeDTO.tax_group_id,
                is_active: createTaxCodeDTO.is_active ?? true,
            },
        });
    }

    async findAll() {
        return this.prisma.tax_code.findMany();
    }

    async findById(tax_code_id: string) {
        return this.prisma.tax_code.findUnique({
            where: {
                tax_code_id: Number(tax_code_id),
            },
        });
    }

    async update(tax_code_id: string, updateTaxCodeDTO: CreateTaxCodeDTO) {
        return this.prisma.tax_code.update({
            where: {
                tax_code_id: Number(tax_code_id),
            },
            data: {
                tax_code: updateTaxCodeDTO.tax_code,
                tax_name: updateTaxCodeDTO.tax_name,
                description: updateTaxCodeDTO.description ?? '',
                tax_type: updateTaxCodeDTO.tax_type,
                tax_rate: updateTaxCodeDTO.tax_rate,
                tax_group_id: updateTaxCodeDTO.tax_group_id,
                is_active: updateTaxCodeDTO.is_active ?? true,
            },
        });
    }
}
