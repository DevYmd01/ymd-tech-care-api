import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UpdateVendorBankAccountDto } from "../dto/update-vendor.dto";

@Injectable()
export class UpdateVendorBankRepository {
    async sync(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        banks: UpdateVendorBankAccountDto[],
    ) {

        // 1. ดึงของเดิมจาก DB
        const existing = await tx.vendor_bank_accounts.findMany({
            where: { vendor_id },
            select: { bank_account_id: true },
        });

        const existingIds = existing.map(e => e.bank_account_id);
        const incomingIds = banks
            .filter(c => c.bank_account_id)
            .map(c => c.bank_account_id!);

        // 2. ลบตัวที่ FE ไม่ส่งมา
        const deleteIds = existingIds.filter(
            id => !incomingIds.includes(id),
        );

        if (deleteIds.length) {
            await tx.vendor_bank_accounts.deleteMany({
                where: { bank_account_id: { in: deleteIds } },
            });
        }

        // อัปเดต/สร้าง ข้อมูลใหม่
        for (const b of banks) {
            if (b.bank_account_id) {
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
            } else {
                await tx.vendor_bank_accounts.create({
                    data: {
                        vendor_id,
                        bank_name: b.bank_name!,
                        bank_branch: b.bank_branch!,
                        account_no: b.account_no!,
                        account_name: b.account_name!,
                        account_type: b.account_type!,
                        swift_code: b.swift_code,
                        is_default: b.is_default ?? false,
                    },
                });
            }
        }
    }
}
