import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UpdateVendorBankAccountDto } from "../dto/update-vendor.dto";

@Injectable()
export class UpdateVendorBankRepository {
    async upsertMany(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        banks: UpdateVendorBankAccountDto[],
    ) {
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
