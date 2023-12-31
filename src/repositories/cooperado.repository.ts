import { Injectable } from '@nestjs/common';
import { Cooperado } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CooperadoRepository extends Repository<Cooperado> {
  constructor(private dataSource: DataSource) {
    super(Cooperado, dataSource.createEntityManager());
  }
}
