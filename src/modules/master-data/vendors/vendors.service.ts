import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { CreateVendorRepository } from './repositories/create-vendor.repository';
import { CreateAddressRepository } from './repositories/create-address.repository';
import { CreateVendorContactDto } from './dto/create-contact.dto';
import { CreateContactRepository } from './repositories/create-contact.repository';
import { CreateBankRepository } from './repositories/create-bank.repository';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { UpdateVendorRepository } from './repositories/update-vendor.repository';
import { UpdateVendorAddressRepository } from './repositories/update-address.repository';
import { UpdateVendorContactRepository } from './repositories/update-contact.reopsitory';
import { UpdateVendorBankRepository } from './repositories/update-bank.repository';

@Injectable()
export class VendorsService {
    constructor(private readonly prisma: PrismaService,
        private readonly createVendorRepository: CreateVendorRepository,
        private readonly createAddressRepository: CreateAddressRepository,
        private readonly createContactRepository: CreateContactRepository,
        private readonly createBankRepository: CreateBankRepository,
        private readonly updateVendorRepository: UpdateVendorRepository,
        private readonly updateVendorAddressRepository: UpdateVendorAddressRepository,
        private readonly updateVendorContactRepository: UpdateVendorContactRepository,
        private readonly updateVendorBankRepository: UpdateVendorBankRepository,
    ) { }

    /// สร้างเจ้าหนี้
    create(dto: CreateVendorDto) {
        return this.prisma.$transaction(async (tx) => {
            const vendor = await this.createVendorRepository.create(tx, dto);

            if (dto.addresses && dto.addresses.length > 0) {
                await this.createAddressRepository.createMany({
                    tx,
                    vendor_id: vendor.vendor_id,
                    addresses: dto.addresses,
                });
            }

            if (dto.contacts && dto.contacts.length > 0) {
                await this.createContactRepository.createMany(
                    tx,
                    vendor.vendor_id,
                    dto.contacts,
                );
            }

            if (dto.bank_accounts && dto.bank_accounts.length > 0) {
                await this.createBankRepository.createMany(
                    tx,
                    vendor.vendor_id,
                    dto.bank_accounts,
                );
            }

            return tx.vendor.findUnique({
                where: { vendor_id: vendor.vendor_id },
                include: {
                    vendorAddresses: true,
                    vendorContacts: true,
                    vendorBankAccounts: true,
                },
            });
        });
    }

    update(vendor_id: number, dto: UpdateVendorDto) {
        return this.prisma.$transaction(async (tx) => {
            await this.updateVendorRepository.update(tx, vendor_id, dto);

            if (dto.addresses?.length) {
                await this.updateVendorAddressRepository.sync(
                    tx,
                    vendor_id,
                    dto.addresses,
                );
            }

            if (dto.contacts?.length) {
                await this.updateVendorContactRepository.sync(
                    tx,
                    vendor_id,
                    dto.contacts,
                );
            }

            if (dto.bank_accounts?.length) {
                await this.updateVendorBankRepository.sync(
                    tx,
                    vendor_id,
                    dto.bank_accounts,
                );
            }

            return tx.vendor.findUnique({
                where: { vendor_id },
                include: {
                    vendorAddresses: true,
                    vendorContacts: true,
                    vendorBankAccounts: true,
                },
            });
        });
    }


    /// ดึงข้อมูลเจ้าหนี้ทั้งหมด
    findAll() {
        return this.prisma.vendor.findMany({
            include: {
                vendorAddresses: true,
                vendorContacts: true,
                vendorBankAccounts: true,
            },
        });
    }

    /// ดึงข้อมูลเจ้าหนี้ตาม id
    findOne(id: number) {
        return this.prisma.vendor.findUnique({
            where: { vendor_id: id },
            include: {
                vendorAddresses: true,
                vendorContacts: true,
                vendorBankAccounts: true,
            },
        });
    }


}
