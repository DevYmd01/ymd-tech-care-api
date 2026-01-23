import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePRDTO } from './dto/ceacte-pr.dto'
import { PRHeaderRepository } from './repositories/pr-header.repository';
@Injectable()
export class PrService {
    constructor(
        private prisma: PrismaService,
        private prHeaderRepo: PRHeaderRepository,
    ) { }

    async create(dto: CreatePRDTO) {
        return this.prisma.$transaction(async (tx) => {
            return this.prHeaderRepo.create(tx, dto);
        });
    }
}
