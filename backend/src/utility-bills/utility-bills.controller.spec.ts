import { Test, TestingModule } from '@nestjs/testing';
import { UtilityBillsController } from './utility-bills.controller';

describe('UtilityBillsController', () => {
  let controller: UtilityBillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilityBillsController],
    }).compile();

    controller = module.get<UtilityBillsController>(UtilityBillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
