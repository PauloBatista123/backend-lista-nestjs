import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperadoController } from 'src/controllers/cooperado.controller';
import { Cooperado } from 'src/entities/cooperado.entity';
import { CooperadoConsumer } from 'src/processors/cooperado.processor';
import { CooperadoService } from 'src/services/cooperado.service';

@Module({
  controllers: [CooperadoController],
  providers: [CooperadoService, CooperadoConsumer],
  imports: [
    TypeOrmModule.forFeature([Cooperado]),
    BullModule.registerQueue({
      name: 'cooperado',
    }),
  ],
})
export class CooperadoModule {}
