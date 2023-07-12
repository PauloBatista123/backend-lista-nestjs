import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoCartaoController } from 'src/controllers/produto-cartao.controller';
import { ProdutoCartao } from 'src/entities/produto-cartao.entity';
import { ProdutoCartaoRepository } from 'src/repositories/produto-cartao.repository';
import { ProdutoCartaoService } from 'src/services/produto-cartao.service';

@Module({
  providers: [ProdutoCartaoRepository, ProdutoCartaoService],
  controllers: [ProdutoCartaoController],
  imports: [TypeOrmModule.forFeature([ProdutoCartao])],
})
export class ProdutoCartaoModule {}
