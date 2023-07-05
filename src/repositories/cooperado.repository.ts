import { Injectable } from '@nestjs/common';
import { Cooperado } from 'src/entities/cooperado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CooperadoRepository extends Repository<Cooperado> {}
