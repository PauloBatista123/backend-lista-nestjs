import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperadoController } from 'src/controllers/cooperado.controller';
import { Cooperado } from 'src/entities/cooperado.entity';
import { CooperadoService } from 'src/services/cooperado.service';

@Module({
  controllers: [CooperadoController],
  providers: [CooperadoService],
  imports: [TypeOrmModule.forFeature([Cooperado])],
})
export class CooperadoModule {}
