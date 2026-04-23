import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CreateICOptionListRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.ic_option_listCreateInput) {
    return this.prisma.ic_option_list.create({
      data,
    })
  }
}