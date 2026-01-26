import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VendorGroupService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll() {
        return this.prismaService.vendor_group.findMany({
            select: {
                vendor_group_id: true,
                vendor_group_code: true,
                vendor_group_name: true,
            }
        });
    }
}
