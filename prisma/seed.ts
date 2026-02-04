import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const formats = [
        {
            module_code: 'PR',
            document_type_code: 'PR',
            prefix: 'PR',
            pattern: '{PREFIX}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: 'MONTH',
        },
        {
            module_code: 'PO',
            document_type_code: 'PO',
            prefix: 'PO',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: 'MONTH',
        },
        {
            module_code: 'INV',
            document_type_code: 'INV',
            prefix: 'INV',
            pattern: '{PREFIX}-{BR}-{YYYY}-{RUN}',
            seq_length: 5,
            running_cycle: 'YEAR',
        },
        {
            module_code: 'SO',
            document_type_code: 'SO',
            prefix: 'SO',
            pattern: '{PREFIX}-{BR}-{YYYY}{MM}-{RUN}',
            seq_length: 4,
            running_cycle: 'MONTH',
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
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
