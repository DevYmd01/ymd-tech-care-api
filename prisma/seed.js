"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const formats = [
        {
            module_code: 'PR',
            document_type_code: 'PR',
            prefix: 'PR',
            pattern: '{PREFIX}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'PO',
            document_type_code: 'PO',
            prefix: 'PO',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'INV',
            document_type_code: 'INV',
            prefix: 'INV',
            pattern: '{PREFIX}-{BR}-{YYYY}-{RUN}',
            seq_length: 5,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'SO',
            document_type_code: 'SO',
            prefix: 'SO',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'RFQ',
            document_type_code: 'RFQ',
            prefix: 'RFQ',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'VQ',
            document_type_code: 'VQ',
            prefix: 'VQ',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'QC',
            document_type_code: 'QC',
            prefix: 'QC',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'AV',
            document_type_code: 'AV',
            prefix: 'AV',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'POA',
            document_type_code: 'POA',
            prefix: 'POA',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'SQ',
            document_type_code: 'SQ',
            prefix: 'SQ',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'AQ',
            document_type_code: 'AQ',
            prefix: 'AQ',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'RS',
            document_type_code: 'RS',
            prefix: 'RS',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
        {
            module_code: 'SO',
            document_type_code: 'SO',
            prefix: 'SO',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: client_2.RunningCycle.YEAR,
        },
    ];
    console.log('🌱 Start seeding document_format...');
    for (const f of formats) {
        console.log(`→ upsert ${f.module_code}`);
        await prisma.document_format.upsert({
            where: {
                module_code_document_type_code: {
                    module_code: f.module_code,
                    document_type_code: f.document_type_code,
                },
            },
            update: f,
            create: f,
        });
    }
    const priceLevels = [
        { code: 'Level1', name: 'ราคาปลีก', level_no: 1 },
        { code: 'Level2', name: 'ราคาส่ง', level_no: 2 },
        { code: 'Level3', name: 'VIP', level_no: 3 },
        { code: 'Level4', name: 'โครงการ', level_no: 4 },
        { code: 'Level5', name: 'โครงการ', level_no: 5 },
        { code: 'Level6', name: 'โครงการ', level_no: 6 },
        { code: 'Level7', name: 'โครงการ', level_no: 7 },
        { code: 'Level8', name: 'โครงการ', level_no: 8 },
        { code: 'Level9', name: 'โครงการ', level_no: 9 },
        { code: 'Level10', name: 'โครงการ', level_no: 10 },
    ];
    for (const p of priceLevels) {
        console.log(`→ upsert price_level ${p.code}`);
        await prisma.price_level.upsert({
            where: {
                code: p.code, // 🔥 ใช้ unique field
            },
            update: p,
            create: p,
        });
    }
    const salesDocuments = [
        {
            system_document_code: 'INQ',
            system_document_name: 'สำรวจความต้องการ',
            system_document_name_eng: 'Inquiry',
            sort_order: 1,
            is_active: true,
        },
        {
            system_document_code: 'EST',
            system_document_name: 'ประมาณการราคา',
            system_document_name_eng: 'Estimate',
            sort_order: 2,
            is_active: true,
        },
        {
            system_document_code: 'QT',
            system_document_name: 'ใบเสนอราคา',
            system_document_name_eng: 'Quotation',
            sort_order: 3,
            is_active: true,
        },
        {
            system_document_code: 'QTA',
            system_document_name: 'อนุมัติใบเสนอราคา',
            system_document_name_eng: 'Approve Quotation',
            sort_order: 4,
            is_active: true,
        },
        {
            system_document_code: 'RSV',
            system_document_name: 'ใบสั่งจอง',
            system_document_name_eng: 'Reservation',
            sort_order: 5,
            is_active: true,
        },
        {
            system_document_code: 'SO',
            system_document_name: 'คำสั่งขาย',
            system_document_name_eng: 'Sales Order',
            sort_order: 6,
            is_active: true,
        },
        {
            system_document_code: 'SOA',
            system_document_name: 'อนุมัติใบสั่งขาย',
            system_document_name_eng: 'Approve Sales Order',
            sort_order: 7,
            is_active: true,
        },
        {
            system_document_code: 'DO',
            system_document_name: 'จัดส่งสินค้า',
            system_document_name_eng: 'Delivery Order',
            sort_order: 8,
            is_active: true,
        },
        {
            system_document_code: 'INV',
            system_document_name: 'วางบิล/ใบแจ้งหนี้',
            system_document_name_eng: 'Invoice',
            sort_order: 9,
            is_active: true,
        },
        {
            system_document_code: 'SRT',
            system_document_name: 'รับคืนสินค้า/ลดหนี้',
            system_document_name_eng: 'Sales Return',
            sort_order: 10,
            is_active: true,
        },
        {
            system_document_code: 'PRM',
            system_document_name: 'เงื่อนไขราคา/โปรโมชัน',
            system_document_name_eng: 'Pricing / Promotion',
            sort_order: 11,
            is_active: true,
        },
        {
            system_document_code: 'SRP',
            system_document_name: 'รายงานขาย',
            system_document_name_eng: 'Sales Reports',
            sort_order: 12,
            is_active: true,
        },
        {
            system_document_code: 'RS',
            system_document_name: 'รายงายการสั่งจอง',
            system_document_name_eng: 'Sales Reservation Reports',
            sort_order: 12,
            is_active: true,
        },
    ];
    for (const d of salesDocuments) {
        console.log(`→ upsert system_document ${d.system_document_code}`);
        await prisma.system_document.upsert({
            where: {
                system_document_code: d.system_document_code,
            },
            update: {
                system_document_name: d.system_document_name,
                system_document_name_eng: d.system_document_name_eng,
                sort_order: d.sort_order,
                is_active: d.is_active,
            },
            create: d,
        });
    }
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
