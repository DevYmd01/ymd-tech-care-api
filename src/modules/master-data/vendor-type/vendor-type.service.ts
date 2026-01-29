import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendorTypeDTO } from './dto/create-vendor-type.dto';

@Injectable()
export class VendorTypeService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.vendor_type.findMany({
            select: {
                vendor_type_id: true,
                vendor_type_code: true,
                vendor_type_name: true,
                vendor_type_nameeng: true,
                description: true,
            }
        });
    }

    async create(createVendorTypeDTO: CreateVendorTypeDTO) {
        return this.prisma.vendor_type.create({
            data: {
                vendor_type_code: createVendorTypeDTO.vendor_type_code,
                vendor_type_name: createVendorTypeDTO.vendor_type_name,
                vendor_type_nameeng: createVendorTypeDTO.vendor_type_nameeng,
                description: createVendorTypeDTO.description,
                status: createVendorTypeDTO.status || "ACTIVE",
            },
            select: { // คืนค่าเฉพาะที่ใช้
                vendor_type_id: true,
                vendor_type_code: true,
                vendor_type_name: true,
                vendor_type_nameeng: true,
                description: true,
                status: true,
            }
        });
    }
}