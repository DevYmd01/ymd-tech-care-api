import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendorGroupDTO } from './dto/creacte-gruop.dto';


@Injectable()
export class VendorGroupService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll() {
        return this.prismaService.vendor_group.findMany({
            select: {
                vendor_group_id: true,
                vendor_group_code: true,
                vendor_group_name: true,
            }
        });
    }

    async findOne(vendor_group_id: number) {
        return this.prismaService.vendor_group.findUnique({
            where: {
                vendor_group_id: vendor_group_id,
            },
            select: {
                vendor_group_id: true,
                vendor_group_code: true,
                vendor_group_name: true,
                vendor_group_nameeng: true,
                description: true,
                status: true,
            }
        });
    }

    async create(createVendorGroupDTO: CreateVendorGroupDTO) {
        return this.prismaService.vendor_group.create({
            data: {
                vendor_group_code: createVendorGroupDTO.vendor_group_code,
                vendor_group_name: createVendorGroupDTO.vendor_group_name,
                vendor_group_nameeng: createVendorGroupDTO.vendor_group_nameeng,
                description: createVendorGroupDTO.description,
                status: createVendorGroupDTO.status || "ACTIVE",
            },
            select: {
                vendor_group_id: true,
                vendor_group_code: true,
                vendor_group_name: true,
                vendor_group_nameeng: true,
                description: true,
                status: true,
            }
        });
    }

    async update(vendor_group_id: number, updateVendorGroupDTO: CreateVendorGroupDTO) {
        return this.prismaService.vendor_group.update({
            where: {
                vendor_group_id: vendor_group_id,
            },
            data: {
                vendor_group_code: updateVendorGroupDTO.vendor_group_code,
                vendor_group_name: updateVendorGroupDTO.vendor_group_name,
                vendor_group_nameeng: updateVendorGroupDTO.vendor_group_nameeng,
                description: updateVendorGroupDTO.description,
                status: updateVendorGroupDTO.status || "ACTIVE",
            },
            select: {
                vendor_group_id: true,
                vendor_group_code: true,
                vendor_group_name: true,
                vendor_group_nameeng: true,
                description: true,
                status: true,
            }
        });
    }
}
