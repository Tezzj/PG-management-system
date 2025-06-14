import { Test, TestingModule } from '@nestjs/testing';
import { RentPaymentsService } from './rent-payments.service';

describe('RentPaymentsService', () => {
  let service: RentPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentPaymentsService],
    }).compile();

    service = module.get<RentPaymentsService>(RentPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
