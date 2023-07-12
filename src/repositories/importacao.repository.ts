import { Injectable } from '@nestjs/common';
import { Importacao } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ImportacaoRepository extends Repository<Importacao> {
  constructor(private dataSource: DataSource) {
    super(Importacao, dataSource.createEntityManager());
  }
}
