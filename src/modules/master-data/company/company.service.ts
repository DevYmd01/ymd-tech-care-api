import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class CompanyService {

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateCompanyDto, logoPath: string | null) {

        return this.prisma.company.create({
            data: {
                ...dto,
                company_logo: logoPath,
            },
        });

    }

    async findAll() {
        const companies = await this.prisma.company.findMany();
        console.log('BASE_URL:', process.env.BASE_URL);
        return companies.map(company => ({
            ...company,
            company_logo: company.company_logo
                ? `${process.env.BASE_URL}/uploads/logo/company/${company.company_logo}`
                : null,
        }));
    }

    findOne(id: number) {
        return this.prisma.company.findUnique({
            where: { company_id: id },
        });
    }

    async update(id: number, dto: CreateCompanyDto, logoPath?: string) {

        const existingCompany = await this.prisma.company.findUnique({
            where: { company_id: id },
        });

        if (!existingCompany) {
            throw new NotFoundException('Company not found');
        }

        const updateData: any = { ...dto };

        if (logoPath) {
            updateData.company_logo = logoPath;
        }

        // 1️⃣ update DB ก่อน
        const updatedCompany = await this.prisma.company.update({
            where: { company_id: id },
            data: updateData,
        });

        // 2️⃣ delete old logo
        if (logoPath && existingCompany.company_logo) {

            const oldLogoPath = join(
                process.cwd(),
                existingCompany.company_logo.replace(/^\/+/, '')
            );

            try {
                if (fs.existsSync(oldLogoPath)) {
                    fs.unlinkSync(oldLogoPath);
                }
            } catch (err) {
                console.error('Failed to delete old logo:', err);
            }

        }

        return updatedCompany;

    }

    async remove(id: number) {

        const existingCompany = await this.prisma.company.findUnique({
            where: { company_id: id },
        });

        if (!existingCompany) {
            throw new NotFoundException('Company not found');
        }

        // delete logo file
        if (existingCompany.company_logo) {

            const logoPath = join(
                process.cwd(),
                existingCompany.company_logo.replace(/^\/+/, '')
            );

            try {
                if (fs.existsSync(logoPath)) {
                    fs.unlinkSync(logoPath);
                }
            } catch (err) {
                console.error('Failed to delete logo:', err);
            }

        }

        return this.prisma.company.delete({
            where: { company_id: id },
        });

    }

}
