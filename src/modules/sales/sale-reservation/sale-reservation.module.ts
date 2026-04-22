import { Module } from '@nestjs/common';
import { SaleReservationController } from './sale-reservation.controller';
import { SaleReservationService } from './sale-reservation.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [SaleReservationController],
  providers: [
    SaleReservationService,
    PrismaService
  ]
})
export class SaleReservationModule {}
