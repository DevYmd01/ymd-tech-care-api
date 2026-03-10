import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorBankAccountDto } from "../dto/create-bank.dto";

@Injectable()
export class CreateBankRepository {

    createMany(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        bank_accounts: CreateVendorBankAccountDto[],
    ) {
        if (!bank_accounts?.length) return;

        return tx.vendor_bank_accounts.createMany({
            data: bank_accounts.map(c => ({
                vendor_id,
                bank_name: c.bank_name,
                bank_branch: c.bank_branch,
                account_no: c.account_no,
                account_name: c.account_name,
                account_type: c.account_type,
                swift_code: c.swift_code,
                is_default: c.is_default,
            })),
        });
    }
}