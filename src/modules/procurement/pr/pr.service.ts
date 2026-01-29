import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePRHeaderDTO } from './dto/creacte-pr-header.dto'
import { PRHeaderRepository } from './repositories/pr-header.repository';
@Injectable()
export class PrService {
    constructor(
        private prisma: PrismaService,
        private prHeaderRepo: PRHeaderRepository,
    ) { }

    async create(dto: CreatePRHeaderDTO) {
        return this.prisma.$transaction(async (tx) => {
            return this.prHeaderRepo.create(tx, dto);
        });
    }
}
