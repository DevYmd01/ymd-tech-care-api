import { Controller, Post, Param, UseInterceptors, UploadedFile, Get, ParseIntPipe } from '@nestjs/common';
import { EmployeeSignatureService } from './employee-signature.service';

import { multerOptions } from '@/common/middleware/upload.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('employee-signature')
export class EmployeeSignatureController {
    constructor(private readonly employeeSignatureService: EmployeeSignatureService) { }

    @Post(':employee_id')
    @UseInterceptors(FileInterceptor('emp_signature', multerOptions))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Param('employee_id') employee_id: string,
    ) {
        return this.employeeSignatureService.create({
            employee_id: +employee_id,
            file,
        });
    }

    @Get(':employee_id')
findActive(
  @Param('employee_id', ParseIntPipe)
  employee_id: number,
) { 
  return this.employeeSignatureService
    .findActiveByEmployee(employee_id);
}
}
