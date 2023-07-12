import { Injectable } from '@nestjs/common';
import { PontoAtendimento } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PontoAtendimentoRespository extends Repository<PontoAtendimento> {
  constructor(private dataSource: DataSource) {
    super(PontoAtendimento, dataSource.createEntityManager());
  }
}
