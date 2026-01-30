import { Test, TestingModule } from '@nestjs/testing';
import { ItemBrandService } from './item-brand.service';

describe('ItemBrandService', () => {
  let service: ItemBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemBrandService],
    }).compile();

    service = module.get<ItemBrandService>(ItemBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
