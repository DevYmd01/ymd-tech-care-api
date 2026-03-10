import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) { }

    async create(createProjectDto: CreateProjectDto) {
        try {
            return await this.prisma.project.create({
                data: {
                    project_code: createProjectDto.project_code,
                    project_name: createProjectDto.project_name,
                    budget_amount: createProjectDto.budget_amount,
                    description: createProjectDto.description,
                    start_date: createProjectDto.start_date
                        ? new Date(createProjectDto.start_date)
                        : null,
                    is_active: createProjectDto.is_active,
                }
            });
        } catch (error: any) {

            if (error?.code === 'P2002') {
                const fields = error.meta?.target?.join(', ') || 'unknown';
                throw new BadRequestException(`รหัสโครงการซ้ำ (${fields})`);
            }

            throw error;
        }
    }

    async findAll() {
        return this.prisma.project.findMany({
            where: {
                is_active: true,
            },
            orderBy: {
                project_id: 'desc',
            },
        });
    }

    async findOne(project_id: number) {
        return this.prisma.project.findUnique({
            where: { project_id },
        });
    }

    async update(project_id: number, updateProjectDto: UpdateProjectDto) {
        return this.prisma.project.update({
            where: { project_id },
            data: {
                project_code: updateProjectDto.project_code,
                project_name: updateProjectDto.project_name,
                budget_amount: updateProjectDto.budget_amount,
                description: updateProjectDto.description,
                start_date: updateProjectDto.start_date
                    ? new Date(updateProjectDto.start_date)
                    : null,
                end_date: updateProjectDto.end_date
                    ? new Date(updateProjectDto.end_date)
                    : null,
                is_active: updateProjectDto.is_active,
            },
        });
    }

    async remove(project_id: number) {
        return this.prisma.project.update({
            where: { project_id },
            data: {
                is_active: false,
            },
        });
    }
}
