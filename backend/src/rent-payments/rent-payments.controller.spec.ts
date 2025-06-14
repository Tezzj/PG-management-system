import { Test, TestingModule } from '@nestjs/testing';
import { RentPaymentsController } from './rent-payments.controller';

describe('RentPaymentsController', () => {
  let controller: RentPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentPaymentsController],
    }).compile();

    controller = module.get<RentPaymentsController>(RentPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
