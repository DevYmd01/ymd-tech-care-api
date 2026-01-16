import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto, UpdateVendorStatusDto, CreateVendorPerformanceDto } from './dto/create-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(private prisma: PrismaService) { }

    /// สร้างเจ้าหนี้
    async create(dto: CreateVendorDto) {
        const vendor = await this.prisma.vendor_master.create({
            data: {
                ...dto,
                status: dto.status ?? 'ACTIVE',
            },
        });

        return { vendor_id: vendor.vendor_id, message: "Vendor created successfully" };
    };

    /// ดึงข้อมูลเจ้าหนี้ทั้งหมด
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await this.prisma.$transaction([
            this.prisma.vendor_master.findMany({
                skip,
                take: limit,
                orderBy: { vendor_id: 'asc' },
                select: {
                    vendor_id: true,
                    vendor_code: true,
                    vendor_name: true,
                    status: true,
                    rating: true,
                },
            }),
            this.prisma.vendor_master.count(),
        ]);

        return {
            data,
            total,
            page,
        };
    }




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

    // อัปเดตสถานะเจ้าหนี้ตามรหัส
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

        try {
            await this.prisma.vendor_master.update({
                where: { vendor_id: vendorId },
                data: {
                    status: dto.status,
                    remark: dto.remark ?? null,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Unable to update vendor status',
            );
        }

        return {
            vendor_id: vendor.vendor_code ?? vendor.vendor_id,
            message: 'Vendor updated successfully',
        };
    };

    /// สร้างบันทึกผลการประเมินเจ้าหนี้
    async createVendorPerformance(
        vendor_id: number,
        dto: CreateVendorPerformanceDto,
    ) {
        const vendor = await this.prisma.vendor_master.findUnique({
            where: { vendor_id },
        });

        if (!vendor) {
            throw new NotFoundException('Vendor not found');
        }

        return this.prisma.vendor_performance.create({
            data: {
                vendor_id,
                evaluation_date: dto.evaluation_date
                    ? new Date(dto.evaluation_date)
                    : null,
                evaluation_period: dto.evaluation_period,
                quality_score: dto.quality_score,
                delivery_score: dto.delivery_score,
                price_score: dto.price_score,
                service_score: dto.service_score,
                total_score: dto.total_score,
                rating: dto.rating,
                remark: dto.remark,
                evaluated_by: dto.evaluated_by,
            },
        });
    }


    /// แสดงบันทึกผลการประเมินเจ้าหนี้ตามรหัส
    async getVendorPerformance(vendor_id: number) {
        return this.prisma.vendor_performance.findMany({
            where: { vendor_id },
            orderBy: {
                evaluation_date: 'desc',
            },
        });
    }





}




