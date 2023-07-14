import { Injectable } from '@nestjs/common';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/dtos/page';
import { ProdutoCartao } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProdutoCartaoRepository extends Repository<ProdutoCartao> {
  constructor(private dataSource: DataSource) {
    super(ProdutoCartao, dataSource.createEntityManager());
  }
}
