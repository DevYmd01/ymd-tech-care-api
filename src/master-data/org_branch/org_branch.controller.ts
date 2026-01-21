import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { OrgBranchService } from './org_branch.service';
import { CreateOrgBranchDto, UpdateOrgBranchDto } from './dto/create-org-branch.dto';


@Controller('org-branchs')
export class OrgBranchController {
    constructor(private readonly orgBranchService: OrgBranchService) { }

    @Post()
    create(@Body() dto: CreateOrgBranchDto) {
        return this.orgBranchService.create(dto);
    }

    @Get()
    findAll() {
        return this.orgBranchService.findAll();
    }

    @Get(':branch_id')
    findOne(@Param('branch_id') branch_id: number) {
        return this.orgBranchService.findOne(+branch_id);
    }

    @Put(':branch_id')
    update(@Param('branch_id') branch_id: number, @Body() dto: UpdateOrgBranchDto) {
        return this.orgBranchService.update(+branch_id, dto);
    }
}
