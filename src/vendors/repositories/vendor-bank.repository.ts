import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorBankAccountDto } from "../dto/create-vendor.dto";

@Injectable()
export class VendorBankRepository {
    createMany(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        banks: CreateVendorBankAccountDto[],
    ) {
        if (!banks?.length) return;

        return tx.vendor_bank_accounts.createMany({
            data: banks.map(b => ({
                vendor_id,
                bank_name: b.bank_name,
                bank_branch: b.bank_branch,
                account_no: b.account_no,
                account_name: b.account_name,
                account_type: b.account_type,
                swift_code: b.swift_code,
                is_default: b.is_default,
            })),
        });
    }

    /// sync bank accounts (เพิ่ม / ลบ / แก้)
    async syncVendorBankAccounts(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        banks: CreateVendorBankAccountDto[],
    ) {
        // 1. ลบของเดิมทั้งหมด
        await tx.vendor_bank_accounts.deleteMany({
            where: { vendor_id },
        });

        // 2. สร้างใหม่ทั้งหมด
        if (banks?.length) {
            await tx.vendor_bank_accounts.createMany({
                data: banks.map(b => ({
                    vendor_id,
                    bank_name: b.bank_name,
                    bank_branch: b.bank_branch,
                    account_no: b.account_no,
                    account_name: b.account_name,
                    account_type: b.account_type,
                    swift_code: b.swift_code,
                    is_default: b.is_default,
                })),
            });
        }
    }
}

