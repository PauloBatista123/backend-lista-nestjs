import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperadoController } from 'src/controllers';
import { CooperadoRepository } from 'src/repositories/cooperado.repository';
import { CooperadoService } from 'src/services/cooperado.service';

@Module({
  controllers: [CooperadoController],
  providers: [CooperadoService],
  imports: [TypeOrmModule.forFeature([CooperadoRepository])],
})
export class CooperadoModule {}
