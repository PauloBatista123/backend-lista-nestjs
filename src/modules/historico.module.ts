import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoController } from 'src/controllers/historico.controller';
import { Historico } from 'src/entities/historico.entity';
import { HistoricoRepository, ProdutoCartaoRepository } from 'src/repositories';
import { HistoricoService } from 'src/services/historico.service';

@Module({
  imports: [TypeOrmModule.forFeature([Historico])],
  providers: [HistoricoService, HistoricoRepository, ProdutoCartaoRepository],
  controllers: [HistoricoController],
})
export class HistoricoModule {}
