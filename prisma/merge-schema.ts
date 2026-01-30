import fs from 'fs';
import path from 'path';

const schemaDir = path.join(__dirname, 'schema');
const output = path.join(__dirname, 'schema.prisma');

const files = fs
    .readdirSync(schemaDir)
    .filter(f => f.endsWith('.prisma'))
    .sort(); // 00_base ต้องมาก่อน

let content = '';

for (const file of files) {
    const filePath = path.join(schemaDir, file);
    content += fs.readFileSync(filePath, 'utf8').trim();
    content += '\n\n';
}

fs.writeFileSync(output, content.trim() + '\n');
console.log('✅ Prisma schema merged');
