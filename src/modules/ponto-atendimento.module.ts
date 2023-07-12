import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontoAtendimentoController } from 'src/controllers';
import { PontoAtendimento } from 'src/entities';
import { PontoAtendimentoRespository } from 'src/repositories';
import { PontoAtendimentoService } from 'src/services';

@Module({
  controllers: [PontoAtendimentoController],
  providers: [PontoAtendimentoService, PontoAtendimentoRespository],
  imports: [TypeOrmModule.forFeature([PontoAtendimento])],
})
export class PontoAtendimentoModule {}
