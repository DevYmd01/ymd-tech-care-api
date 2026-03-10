import { Module } from '@nestjs/common';
import { OrgBranchController } from './org_branch.controller';
import { OrgBranchService } from './org_branch.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [OrgBranchController],
  providers: [OrgBranchService, PrismaService],
})
export class OrgBranchModule { }
