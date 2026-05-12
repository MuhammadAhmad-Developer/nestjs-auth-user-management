import { Test, TestingModule } from '@nestjs/testing';
import { PeriodicTableController } from './periodic-table.controller';

describe('PeriodicTableController', () => {
  let controller: PeriodicTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodicTableController],
    }).compile();

    controller = module.get<PeriodicTableController>(PeriodicTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
