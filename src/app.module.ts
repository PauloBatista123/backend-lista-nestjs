import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CooperadoModule } from './modules/cooperado.module';
import { BullModule } from '@nestjs/bull';
import { ProdutoModule } from './modules/produto.module';
import { ImportacaoModule } from './modules/importacao.module';
import { PontoAtendimentoModule } from './modules/ponto-atendimento.module';
import { ProdutoCartaoModule } from './modules/produto-cartao.module';
import { typeOrmConfig } from './utils/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    CooperadoModule,
    ProdutoModule,
    ImportacaoModule,
    PontoAtendimentoModule,
    ProdutoCartaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
