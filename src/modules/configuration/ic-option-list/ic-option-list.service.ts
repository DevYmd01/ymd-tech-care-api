import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateICOptionListRepository } from './repository/create-ic-option-list.repository';
import { UpdateICOptionListRepository } from './repository/update-ic-option-list.repository';
import { CreateICOptionListMapper } from './mapper/create-ic-option-list.mapper';
import { UpdateICOptionListMapper } from './mapper/update-ic-option-list.mapper';
import { CreateICOptionDto } from './dto/create-ic-option-list.dto';
import { UpDateICOptionDto } from './dto/update-ic-option-list.dto';
import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';


@Injectable()
export class IcOptionListService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly createICOptionListRepository: CreateICOptionListRepository,
        private readonly updateICOptionListRepository: UpdateICOptionListRepository,
        private readonly createICOptionListMapper: CreateICOptionListMapper,
        private readonly updateICOptionListMapper: UpdateICOptionListMapper,
    ) { }

    async create(data: CreateICOptionDto) {
        try {
            return await this.prisma.$transaction(async () => {
                const payload =
                    this.createICOptionListMapper.toPersistence(data);

                return this.createICOptionListRepository.create(
                    payload,
                );
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException(
                    'ข้อมูลนี้ถูกสร้างไว้แล้ว ( ข้อมูลซ้ำ )',
                );
            }

            throw error;
        }
    }

    async update(
        id: number,
        data: UpDateICOptionDto,
    ) {
        try {
            return this.prisma.$transaction(async (prisma) => {
                const payload =
                    this.updateICOptionListMapper.toPersistence(data);

                return this.updateICOptionListRepository.update(
                    id,
                    payload, // แก้ไข: ลบ 'prisma' ออกเพื่อให้ตรงกับจำนวนอาร์กิวเมนต์ที่คาดหวัง (2)
                );
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new BadRequestException(
                    'ข้อมูลนี้ถูกสร้างไว้แล้ว (ic_option + system_document ซ้ำ)',
                );
            }

            throw error;
        }
    }

    async findAll() {
        return this.prisma.ic_option_list.findMany({
            orderBy: {
                sort_order: 'asc',
            },
            include: {
                system_document: true,
                ic_option: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.ic_option_list.findUnique({
            where: {
                option_list_id: id,
            },
            include: {
                system_document: true,
                ic_option: true,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.$transaction(async (prisma) => {
            return prisma.ic_option_list.delete({
                where: {
                    option_list_id: id,
                },
            });
        });
    }
}