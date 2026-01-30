import { Test, TestingModule } from '@nestjs/testing';
import { ItemBrandController } from './item-brand.controller';

describe('ItemBrandController', () => {
  let controller: ItemBrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemBrandController],
    }).compile();

    controller = module.get<ItemBrandController>(ItemBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
