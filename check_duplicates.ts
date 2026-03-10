
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking for duplicates...');

    // Check OrgBranch duplicates
    const branches = await prisma.org_branch.findMany();
    const branchCodes = branches.map(b => b.branch_code);
    const duplicateBranchCodes = branchCodes.filter((item, index) => branchCodes.indexOf(item) !== index);

    if (duplicateBranchCodes.length > 0) {
        console.log('Found duplicate Branch Codes:', [...new Set(duplicateBranchCodes)]);
        for (const code of new Set(duplicateBranchCodes)) {
            const dups = await prisma.org_branch.findMany({ where: { branch_code: code } });
            console.log(`- Code: ${code}, IDs: ${dups.map(d => d.branch_id).join(', ')}`);
        }
    } else {
        console.log('No duplicate Branch Codes found.');
    }

    // Check Warehouse duplicates
    const warehouses = await prisma.warehouse.findMany();
    const warehouseCodes = warehouses.map(w => w.warehouse_code);
    const duplicateWarehouseCodes = warehouseCodes.filter((item, index) => warehouseCodes.indexOf(item) !== index);

    if (duplicateWarehouseCodes.length > 0) {
        console.log('Found duplicate Warehouse Codes:', [...new Set(duplicateWarehouseCodes)]);
        for (const code of new Set(duplicateWarehouseCodes)) {
            const dups = await prisma.warehouse.findMany({ where: { warehouse_code: code } });
            console.log(`- Code: ${code}, IDs: ${dups.map(d => d.warehouse_id).join(', ')}`);
        }
    } else {
        console.log('No duplicate Warehouse Codes found.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
