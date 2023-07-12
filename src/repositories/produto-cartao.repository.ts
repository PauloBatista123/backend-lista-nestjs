import { Injectable } from '@nestjs/common';
import { ProdutoCartao } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProdutoCartaoRepository extends Repository<ProdutoCartao> {
  constructor(private dataSource: DataSource) {
    super(ProdutoCartao, dataSource.createEntityManager());
  }
}
