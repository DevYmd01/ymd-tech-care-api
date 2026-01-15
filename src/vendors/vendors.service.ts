import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto, UpdateVendorStatusDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(private prisma: PrismaService) { }

    /// สร้างเจ้าหนี้
    async create(dto: CreateVendorDto) {
        return this.prisma.vendor_master.create({
            data: {
                ...dto,
                status: dto.status ?? 'ACTIVE',
            },
        });
    };

    /// ดึงข้อมูลเจ้าหนี้ทั้งหมด
    async findAll() {
        return this.prisma.vendor_master.findMany();
    };

    /// ดึงข้อมูลเจ้าหนี้ตามรหัส
    async findOne(vendor_id: number) {
        return this.prisma.vendor_master.findUnique({
            where: {
                vendor_id,
            },
        });
    };

    /// อัปเดตข้อมูลเจ้าหนี้ตามรหัส
    async update(vendor_id: number, dto: CreateVendorDto) {
        return this.prisma.vendor_master.update({
            where: {
                vendor_id,
            },
            data: {
                ...dto,
                status: dto.status ?? 'ACTIVE',
            },
        });
    };

    async updateStatus(
        vendorId: number,
        dto: UpdateVendorStatusDto,
    ) {
        const vendor = await this.prisma.vendor_master.findUnique({
            where: { vendor_id: vendorId },
        });

        if (!vendor) {
            throw new NotFoundException('Vendor not found');
        }

        await this.prisma.vendor_master.update({
            where: { vendor_id: vendorId },
            data: {
                status: dto.status,
                status_reason: dto.reason ?? null,
            },
        });
    }

}




