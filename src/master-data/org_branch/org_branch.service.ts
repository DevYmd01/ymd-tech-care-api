import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrgBranchDto, UpdateOrgBranchDto } from './dto/create-org-branch.dto';

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

    async findAll() {
        return this.prisma.orgBranch.findMany();
    }

    async findOne(branch_id: number) {
        return this.prisma.orgBranch.findUnique({ where: { branch_id: branch_id } });
    }

    async update(branch_id: number, dto: UpdateOrgBranchDto) {
        return this.prisma.orgBranch.update({
            where: { branch_id: branch_id },
            data: {
                branch_code: dto.branch_code,
                branch_name: dto.branch_name,
                is_active: dto.is_active ?? true,
            },
        });
    }
}
