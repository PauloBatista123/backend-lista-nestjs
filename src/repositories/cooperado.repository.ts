import { Injectable } from '@nestjs/common';
import { Cooperado } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CooperadoRepository extends Repository<Cooperado> {}
