import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorBankAccountDto } from "../dto/create-vendor.dto";
import { UpdateVendorBankAccountDto } from "../dto/update-vendor.dto";
import { BadRequestException } from "@nestjs/common";

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
        banks: UpdateVendorBankAccountDto[],
    ) {
        const existingBanks = await tx.vendor_bank_accounts.findMany({
            where: { vendor_id },
        });

        const incomingIds = banks
            .filter(b => b.bank_account_id)
            .map(b => b.bank_account_id);

        // ลบข้อมูลที่หายไป
        const toDelete = existingBanks.filter(
            eb => !incomingIds.includes(eb.bank_account_id),
        );

        if (toDelete.length > 0) {
            await tx.vendor_bank_accounts.deleteMany({
                where: {
                    bank_account_id: { in: toDelete.map(b => b.bank_account_id) },
                },
            });
        }

        for (const b of banks) {
            if (b.bank_account_id) {
                // ❗ กัน id แปลก
                if (!existingBanks.find(eb => eb.bank_account_id === b.bank_account_id)) {
                    throw new BadRequestException(
                        `Bank account ${b.bank_account_id} not found for this vendor`,
                    );
                }

                await tx.vendor_bank_accounts.update({
                    where: { bank_account_id: b.bank_account_id },
                    data: {
                        bank_name: b.bank_name,
                        bank_branch: b.bank_branch,
                        account_no: b.account_no,
                        account_name: b.account_name,
                        account_type: b.account_type,
                        swift_code: b.swift_code,
                        is_default: b.is_default,
                    },
                });
                continue;
            }

            // ➕ create
            await tx.vendor_bank_accounts.create({
                data: {
                    vendor_id,
                    bank_name: b.bank_name,
                    bank_branch: b.bank_branch,
                    account_no: b.account_no,
                    account_name: b.account_name,
                    account_type: b.account_type,
                    swift_code: b.swift_code,
                    is_default: b.is_default,
                },
            });
        }

    }
}

