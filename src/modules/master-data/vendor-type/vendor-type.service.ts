import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorTypeService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll() {
        return this.prismaService.vendor_type.findMany({
            select: {
                vendor_type_id: true,
                vendor_type_code: true,
                vendor_type_name: true,
            }
        });
    }
}