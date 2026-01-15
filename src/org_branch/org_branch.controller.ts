import { Body, Controller, Post } from '@nestjs/common';
import { OrgBranchService } from './org_branch.service';
import { CreateOrgBranchDto } from './dto/create-org-branch.dto';

@Controller('org-branch')
export class OrgBranchController {
    constructor(private readonly orgBranchService: OrgBranchService) { }

    @Post()
    create(@Body() dto: CreateOrgBranchDto) {
        return this.orgBranchService.create(dto);
    }
}
