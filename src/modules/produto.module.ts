import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from 'src/controllers';
import { ProdutoCartao } from 'src/entities/produto-cartao.entity';
import { Produto } from 'src/entities/produto.entity';
import { ProdutoService } from 'src/services/produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
  imports: [TypeOrmModule.forFeature([Produto, ProdutoCartao])],
})
export class ProdutoModule {}
