import { Test, TestingModule } from '@nestjs/testing';
import { IcOptionListService } from './ic-option-list.service';

describe('IcOptionListService', () => {
  let service: IcOptionListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcOptionListService],
    }).compile();

    service = module.get<IcOptionListService>(IcOptionListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
