import { Test, TestingModule } from '@nestjs/testing';
import { IcOptionListController } from './ic-option-list.controller';

describe('IcOptionListController', () => {
  let controller: IcOptionListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcOptionListController],
    }).compile();

    controller = module.get<IcOptionListController>(IcOptionListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
