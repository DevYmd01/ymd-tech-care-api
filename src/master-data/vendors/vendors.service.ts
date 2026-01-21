import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVendorDto, UpdateVendorStatusDto, CreateVendorPerformanceDto, CreateVendorContactDto, CreateVendorBankAccountDto } from './dto/create-vendor.dto';
import { VendorRepository } from './repositories/vendor.repository';
import { VendorContactRepository } from './repositories/vendor-contact.repository';
import { VendorBankRepository } from './repositories/vendor-bank.repository';
import { UpdateVendorDto } from './dto/update-vendor.dto';


@Injectable()
export class VendorsService {
    constructor(
        private prisma: PrismaService,
        private vendorRepo: VendorRepository,
        private vendorContactRepo: VendorContactRepository,
        private vendorBankRepo: VendorBankRepository,
    ) { }
    /**
     * VendorsService
     * ----------------
     * หน้าที่:
     * - เขียน business logic
     * - ตัดสินใจ error / exception
     * - ประสานหลาย repository
     */

    /// สร้างเจ้าหนี้ (รวม contacts + bank)
    async create(dto: CreateVendorDto) {
        return this.prisma.$transaction(async (tx) => {

            const vendor = await this.vendorRepo.create(tx, dto);

            await this.vendorContactRepo.createMany(
                tx,
                vendor.vendor_id,
                dto.contacts ?? [], // 👈 แปลง undefined → []
            );

            await this.vendorBankRepo.createMany(
                tx,
                vendor.vendor_id,
                dto.bank_accounts ?? [], // 👈 แปลง undefined → []
            );

            return {
                vendor_id: vendor.vendor_id,
                message: 'Vendor created successfully',
            };
        });
    }


    /// ดึงข้อมูลเจ้าหนี้ทั้งหมด
    async findAll(page = 1, limit = 100) {
        return this.prisma.$transaction(async (tx) => {
            const skip = (page - 1) * limit;

            const data = await this.vendorRepo.findAll(tx, skip, limit);

            const total = await this.vendorRepo.count(tx);

            return {
                data,
                total,
                page,
            };
        });

    }

    /// ดึงข้อมูลเจ้าหนี้ตามรหัส
    async findOne(vendor_id: number) {
        return this.prisma.vendor_master.findUnique({
            where: {
                vendor_id,
            },
            include: {
                contacts: true,
                bank_accounts: true,
            },
        });
    };

    /// อัปเดตข้อมูลเจ้าหนี้
    async updateVendor(vendor_id: number, dto: UpdateVendorDto) {
        return this.prisma.$transaction(async (tx) => {

            await this.vendorRepo.updateVendorMaster(tx, vendor_id, dto);

            if (dto.contacts) {
                await this.vendorContactRepo.syncVendorContacts(
                    tx,
                    vendor_id,
                    dto.contacts,
                );
            }

            if (dto.bank_accounts) {
                await this.vendorBankRepo.syncVendorBankAccounts(
                    tx,
                    vendor_id,
                    dto.bank_accounts,
                );
            }

            return {
                vendor_id,
                message: 'Vendor updated successfully',
            };
        });
    }

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


    /// เพิ่มผู้ติดต่อให้กับเจ้าหนี้
    async createVendorContact(vendor_id: number, dto: CreateVendorContactDto) {
        const vendor = await this.prisma.vendor_master.findUnique({
            where: { vendor_id },
        });

        if (!vendor) {
            throw new NotFoundException('Vendor not found');
        }

        return this.prisma.vendor_contacts.create({
            data: {
                vendor_id,
                contact_name: dto.contact_name,
                email: dto.email,
                mobile: dto.mobile,
                phone: dto.phone,
                position: dto.position,
                is_primary: dto.is_primary,
            },
        });
    }

    /// ดึงข้อมูลผู้ติดต่อตามรหัสเจ้าหนี้
    async getVendorContact(vendor_id: number) {
        return this.prisma.vendor_contacts.findMany({
            where: { vendor_id },
        });
    }


    /// เพิ่มบัญชีธนาคารให้กับเจ้าหนี้
    async createVendorBankAccount(vendor_id: number, dto: CreateVendorBankAccountDto) {
        const vendor = await this.prisma.vendor_master.findUnique({
            where: { vendor_id },
        });

        if (!vendor) {
            throw new NotFoundException('Vendor not found');
        }

        return this.prisma.vendor_bank_accounts.create({
            data: {
                vendor_id,
                bank_name: dto.bank_name,
                bank_branch: dto.bank_branch,
                account_no: dto.account_no,
                account_name: dto.account_name,
                account_type: dto.account_type,
                swift_code: dto.swift_code,
                is_default: dto.is_default,
            },
        });
    }
}




