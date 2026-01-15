import { Test, TestingModule } from '@nestjs/testing';
import { OrgBranchController } from './org_branch.controller';

describe('OrgBranchController', () => {
  let controller: OrgBranchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgBranchController],
    }).compile();

    controller = module.get<OrgBranchController>(OrgBranchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
