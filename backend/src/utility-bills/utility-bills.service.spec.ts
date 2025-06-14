import { Test, TestingModule } from '@nestjs/testing';
import { UtilityBillsService } from './utility-bills.service';

describe('UtilityBillsService', () => {
  let service: UtilityBillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilityBillsService],
    }).compile();

    service = module.get<UtilityBillsService>(UtilityBillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
