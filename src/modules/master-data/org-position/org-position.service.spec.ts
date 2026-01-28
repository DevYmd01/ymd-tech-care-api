import { Test, TestingModule } from '@nestjs/testing';
import { OrgPositionService } from './org-position.service';

describe('OrgPositionService', () => {
  let service: OrgPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgPositionService],
    }).compile();

    service = module.get<OrgPositionService>(OrgPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
