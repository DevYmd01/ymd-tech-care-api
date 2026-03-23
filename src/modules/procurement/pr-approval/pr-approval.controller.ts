import { Controller } from '@nestjs/common';
import { PrApprovalService } from './pr-approval.service';
import { createPrApprovalDto } from './dto/creacte-pr-approval.dto';
import { Body, Post, Request } from '@nestjs/common';


@Controller('pr-approval')
export class PrApprovalController {

    constructor(private readonly PrApprovalService: PrApprovalService) {}

    @Post()
    async create(@Body() createPrApprovalDto: createPrApprovalDto, @Request() req: any) {
        return this.PrApprovalService.create(createPrApprovalDto, req.user);
        }

    

}
