import { Test, TestingModule } from '@nestjs/testing';
import { ResidenciesController } from './residencies.controller';

describe('ResidenciesController', () => {
  let controller: ResidenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenciesController],
    }).compile();

    controller = module.get<ResidenciesController>(ResidenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
