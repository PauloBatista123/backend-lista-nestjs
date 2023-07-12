import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportacaoController } from 'src/controllers';
import { Importacao } from 'src/entities/importacao.entity';
import { CooperadoConsumer } from 'src/processors/cooperado.processor';
import { ProdutoCartaoConsumer } from 'src/processors/produto-cartao.processor';
import {
  CooperadoRepository,
  ImportacaoRepository,
  PontoAtendimentoRespository,
  ProdutoCartaoRepository,
  ProdutoRepository,
} from 'src/repositories';
import { ImportacaoService } from 'src/services/importacao.service';

@Module({
  controllers: [ImportacaoController],
  providers: [
    ImportacaoService,
    CooperadoConsumer,
    ProdutoCartaoConsumer,
    PontoAtendimentoRespository,
    CooperadoRepository,
    ProdutoRepository,
    ImportacaoRepository,
    ProdutoCartaoRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([Importacao]),
    BullModule.registerQueue({
      name: 'cooperado',
      settings: {
        lockDuration: 1800000,
      },
    }),
    BullModule.registerQueue({
      name: 'produto-cartao',
      settings: {
        lockDuration: 1800000,
      },
    }),
  ],
})
export class ImportacaoModule {}
