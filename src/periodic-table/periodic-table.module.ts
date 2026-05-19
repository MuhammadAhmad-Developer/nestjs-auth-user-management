import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Element, ElementSchema } from './schemas/element.schema';
import { PeriodicTableService } from './periodic-table.service';
import { PeriodicTableController } from './periodic-table.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../common/multer.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Element.name, schema: ElementSchema },
    ]),
     MulterModule.register(multerConfig),
  ],
  controllers: [PeriodicTableController],
  providers: [PeriodicTableService],
})
export class PeriodicTableModule {}