import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontoAtendimentoController } from 'src/controllers';
import { PontoAtendimentoRespository } from 'src/repositories';
import { PontoAtendimentoService } from 'src/services';

@Module({
  controllers: [PontoAtendimentoController],
  providers: [PontoAtendimentoService],
  imports: [TypeOrmModule.forFeature([PontoAtendimentoRespository])],
})
export class PontoAtendimentoModule {}
