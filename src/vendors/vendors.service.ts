import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateVendorDto) {
        return this.prisma.vendor_master.create({
            data: {
                ...dto,
                status: dto.status ?? 'ACTIVE',
            },
        });
    }
}




