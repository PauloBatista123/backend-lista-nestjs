import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Cooperado } from './entities/cooperado.entity';
import { CooperadoModule } from './modules/cooperado.module';
import { BullModule } from '@nestjs/bull';
import { Produto } from './entities/produto.entity';
import { ProdutoModule } from './modules/produto.module';
import { ImportacaoModule } from './modules/importacao.module';
import { PontoAtendimentoModule } from './modules/ponto-atendimento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'cedoc',
      password: '1234',
      database: 'lista-inteligente',
      entities: [User, Cooperado, Produto],
      synchronize: true,
      autoLoadEntities: true,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
