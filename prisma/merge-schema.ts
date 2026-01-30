import fs from 'fs';
import path from 'path';

const schemaDir = path.join(__dirname, 'schema');
const output = path.join(__dirname, 'schema.prisma');

const files = fs
    .readdirSync(schemaDir)
    .filter(f => f.endsWith('.prisma'))
    .sort(); // สำคัญมาก

let content = '';

for (const file of files) {
    content += fs.readFileSync(path.join(schemaDir, file), 'utf8');
    content += '\n\n';
}

fs.writeFileSync(output, content);

console.log('✅ Prisma schema merged');
