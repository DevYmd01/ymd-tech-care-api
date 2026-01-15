import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrgBranchDto } from './dto/create-org-branch.dto';

@Injectable()
export class OrgBranchService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateOrgBranchDto) {
        return this.prisma.orgBranch.create({
            data: {
                branch_code: dto.branch_code,
                branch_name: dto.branch_name,
                is_active: dto.is_active ?? true,
            },
        });
    }
}
