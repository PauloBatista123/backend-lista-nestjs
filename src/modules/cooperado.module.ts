import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperadoController } from 'src/controllers';
import { Cooperado } from 'src/entities';
import { CooperadoRepository } from 'src/repositories/cooperado.repository';
import { CooperadoService } from 'src/services/cooperado.service';

@Module({
  controllers: [CooperadoController],
  providers: [CooperadoService, CooperadoRepository],
  imports: [TypeOrmModule.forFeature([Cooperado])],
})
export class CooperadoModule {}
