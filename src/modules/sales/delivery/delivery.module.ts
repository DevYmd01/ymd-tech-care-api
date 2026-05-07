import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { DeliveryHeaderRepository } from './repository/delivery-header.repository';
import { DeliveryLineRepository } from './repository/delivery-line.repository';
import { DeliveryHeaderMapper } from './mapper/delivery-header.mapper';
import { DeliveryLineMapper } from './mapper/delivery-line.mapper';
import { PrismaService } from '@/prisma/prisma.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    DeliveryHeaderRepository,
    DeliveryLineRepository,
    PrismaService,
    DeliveryHeaderMapper,
    DeliveryLineMapper
  ],
  imports: [ DocumentNumberModule, PrismaModule ]
})
export class DeliveryModule {}
