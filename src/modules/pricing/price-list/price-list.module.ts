import { Module } from '@nestjs/common';
import { PriceListController } from './price-list.controller';
import { PriceListService } from './price-list.service';
import { CreatePriceListHeaderRepository } from './repository/create-price-list-header.repository';
import { CreatePriceListLineRepository } from './repository/create-price-list-line.repository';
import { DiscountDomainService } from './domain/calculation.domain.service';
import { UpdatePriceListHeaderRepository } from './repository/update-price-list-header.repository';
import { UpdatePriceListLineRepository } from './repository/update-price-list-line.repository';


@Module({
  controllers: [PriceListController],
  providers: [
    PriceListService,
    CreatePriceListHeaderRepository,
    CreatePriceListLineRepository,
    DiscountDomainService,
    UpdatePriceListHeaderRepository,
    UpdatePriceListLineRepository,
  ],
})
export class PriceListModule {}
