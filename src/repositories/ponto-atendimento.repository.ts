import { Injectable } from '@nestjs/common';
import { PontoAtendimento } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PontoAtendimentoRespository extends Repository<PontoAtendimento> {}
