import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportacaoController } from 'src/controllers';
import { Importacao } from 'src/entities/importacao.entity';
import { CooperadoConsumer } from 'src/processors/cooperado.processor';
import { ImportacaoService } from 'src/services/importacao.service';

@Module({
  controllers: [ImportacaoController],
  providers: [ImportacaoService, CooperadoConsumer],
  imports: [
    TypeOrmModule.forFeature([Importacao]),
    BullModule.registerQueue({
      name: 'cooperado',
    }),
  ],
})
export class ImportacaoModule {}
