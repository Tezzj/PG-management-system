import { Test, TestingModule } from '@nestjs/testing';
import { ResidenciesService } from './residencies.service';

describe('ResidenciesService', () => {
  let service: ResidenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidenciesService],
    }).compile();

    service = module.get<ResidenciesService>(ResidenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
