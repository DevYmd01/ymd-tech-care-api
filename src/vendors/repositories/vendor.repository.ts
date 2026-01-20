import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorDto } from "../dto/create-vendor.dto";
import { UpdateVendorDto } from "../dto/update-vendor.dto";

@Injectable()

export class VendorRepository {
    /// สร้างเจ้าหนี้
    create(tx: Prisma.TransactionClient, dto: CreateVendorDto) {
        return tx.vendor_master.create({
            data: {
                vendor_code: dto.vendor_code,
                vendor_name: dto.vendor_name,
                vendor_name_en: dto.vendor_name_en,
                vendor_type: dto.vendor_type,
                tax_id: dto.tax_id,
                category: dto.category,
                branch_name: dto.branch_name,
                is_vat_registered: dto.is_vat_registered,
                wht_applicable: dto.wht_applicable,
                payment_term_days: dto.payment_term_days,
                credit_limit: dto.credit_limit,
                currency_code: dto.currency_code,
                contact_person: dto.contact_person,
                phone: dto.phone,
                email: dto.email,
                address: dto.address,
                province: dto.province,
                country: dto.country,
                remark: dto.remark,
                status: dto.status ?? 'ACTIVE',
            },
        });
    }

    /// ดึงข้อมูลเจ้าหนี้ทั้งหมด
    findAll(tx, skip, limit) {
        return tx.vendor_master.findMany({
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
        });
    }

    count(tx) {
        return tx.vendor_master.count();
    }

    /// อัปเดตข้อมูลเจ้าหนี้
    updateVendorMaster(tx, vendor_id: number, dto: UpdateVendorDto) {
        const {
            contacts,
            bank_accounts,
            ...vendorData
        } = dto;

        return tx.vendor_master.update({
            where: { vendor_id },
            data: vendorData,
        });
    }
}
