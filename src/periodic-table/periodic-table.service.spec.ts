import { Test, TestingModule } from '@nestjs/testing';
import { PeriodicTableService } from './periodic-table.service';

describe('PeriodicTableService', () => {
  let service: PeriodicTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodicTableService],
    }).compile();

    service = module.get<PeriodicTableService>(PeriodicTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
