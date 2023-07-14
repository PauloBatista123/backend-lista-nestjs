import { Injectable } from '@nestjs/common';
import { Historico } from 'src/entities/historico.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class HistoricoRepository extends Repository<Historico> {
  constructor(private dataSource: DataSource) {
    super(Historico, dataSource.createEntityManager());
  }
}
