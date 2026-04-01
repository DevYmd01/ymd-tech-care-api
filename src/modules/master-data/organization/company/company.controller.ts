import {
    Controller,
    UploadedFile,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { multerOptions } from '@/common/middleware/upload.middleware';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post()
    @UseInterceptors(FileInterceptor('company_logo', multerOptions))
    async create(
        @Body() dto: CreateCompanyDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const logoPath = file ? file.filename : null;

        return this.companyService.create(dto, logoPath);
    }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('company_logo', multerOptions))
    async update(
        @Param('id') id: string,
        @Body() dto: CreateCompanyDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const logoFilename = file ? file.filename : undefined;

        return this.companyService.update(+id, dto, logoFilename);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companyService.remove(+id);
    }
}
