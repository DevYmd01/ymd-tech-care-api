import { Controller, Post, Param, UseInterceptors, UploadedFile, Res, Put } from '@nestjs/common';
import { EmployeeSignatureService } from './employee-signature.service';

import { multerOptions } from '@/common/middleware/upload.middleware';
import { FileInterceptor } from '@nestjs/platform-express';

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

    // @Put(':employee_id')

}
