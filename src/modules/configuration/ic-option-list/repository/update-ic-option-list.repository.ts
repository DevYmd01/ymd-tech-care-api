import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UpdateICOptionListRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async update(
    id: number,
    data: Prisma.ic_option_listUpdateInput,
  ) {
    return this.prisma.ic_option_list.update({
      where: {
        option_list_id: id,
      },
      data,
    })
  }
}