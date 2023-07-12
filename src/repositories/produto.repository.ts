import { Injectable } from '@nestjs/common';
import { Produto } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProdutoRepository extends Repository<Produto> {
  constructor(private dataSource: DataSource) {
    super(Produto, dataSource.createEntityManager());
  }
}
