import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class EmployeeSignatureService {
    constructor(private readonly prisma: PrismaService) { }

    async create({
        employee_id,
        file,
    }: {
        employee_id: number;
        file: Express.Multer.File;
    }) {

        // ปิด active ตัวเก่า
        await this.prisma.employee_signature.updateMany({
            where: {
                employee_id,
                is_active: true,
            },
            data: {
                is_active: false,
            },
        });

        // เพิ่มตัวใหม่
        return this.prisma.employee_signature.create({
            data: {
                employee: {
                    connect: {
                        employee_id,
                    },
                },
                signature_url: `/uploads/emp_signatures/${file.filename}`,
                signature_original_name: file.originalname,
                signature_name: file.filename,
                is_active: true,
            },
        });
    }

    async findActiveByEmployee(employee_id: number) {
  const signature =
    await this.prisma.employee_signature.findFirst({
      where: {
        employee_id,
        is_active: true,
        is_deleted: false,
      },
    });

  if (!signature) {
    return null;
  }

  return {
    ...signature,
    signature_url:signature.signature_url,
  };
}

}