import { Test, TestingModule } from '@nestjs/testing';
import { OrgPositionController } from './org-position.controller';

describe('OrgPositionController', () => {
  let controller: OrgPositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgPositionController],
    }).compile();

    controller = module.get<OrgPositionController>(OrgPositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
