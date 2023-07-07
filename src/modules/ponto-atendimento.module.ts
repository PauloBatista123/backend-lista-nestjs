import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontoAtendimentoController } from 'src/controllers/ponto-atendimento.controller';
import { PontoAtendimento } from 'src/entities/pontoAtendimento.entity';
import { PontoAtendimentoService } from 'src/services/ponto-atendimento.service';

@Module({
  controllers: [PontoAtendimentoController],
  providers: [PontoAtendimentoService],
  imports: [TypeOrmModule.forFeature([PontoAtendimento])],
})
export class PontoAtendimentoModule {}
