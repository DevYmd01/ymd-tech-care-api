import { Module } from '@nestjs/common';

import { PrismaModule }
from '@/prisma/prisma.module';

import { UomConversionService }
from './item-uom/service/uom-conversion.service';

@Module({
  imports: [PrismaModule],

  providers: [UomConversionService],

  exports: [UomConversionService],
})
export class CommonUomModule {}