import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

/**
 * VendorRepository
 * ----------------
 * หน้าที่:
 * - ติดต่อ database เท่านั้น
 * - ทำ CRUD ด้วย Prisma
 * - ❌ ไม่มี business logic
 * - ❌ ไม่มี validation
 * - ❌ ไม่ throw HTTP exception
 */
@Injectable()
export class VendorRepository {
    constructor(private readonly prisma: PrismaService) { }

    /** ค้นหา vendor ตาม id */
    findById(vendor_id: number) {
        return this.prisma.vendor_master.findUnique({
            where: { vendor_id },
        });
    }

    /** สร้าง vendor */
    create(data: Prisma.vendor_masterCreateInput) {
        return this.prisma.vendor_master.create({ data });
    }

    /** อัปเดต vendor */
    update(
        vendor_id: number,
        data: Prisma.vendor_masterUpdateInput,
    ) {
        return this.prisma.vendor_master.update({
            where: { vendor_id },
            data,
        });
    }

    /** ดึง vendor แบบ pagination */
    findAll(skip: number, take: number) {
        return this.prisma.vendor_master.findMany({
            skip,
            take,
            orderBy: { vendor_id: 'asc' },
        });
    }

    /** นับจำนวน vendor ทั้งหมด */
    countAll() {
        return this.prisma.vendor_master.count();
    }
}
