import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class EmployeeSignatureService {
    constructor(private readonly prisma: PrismaService) {}

    async create({
    employee_id,
    file,
}: {
    employee_id: number;
    file: Express.Multer.File;
}) {

    return this.prisma.employee_signature.create({
        data: {
            employee: {
                connect: {
                    employee_id,
                },
            },
            signature_url: `/uploads/emp_signatures/${file.filename}`,
            signature_name: file.originalname,
            is_active: true,
        },
    });
}
}
