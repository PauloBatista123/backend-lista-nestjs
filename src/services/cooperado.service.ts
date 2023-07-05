import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Bull, { Job, Queue } from 'bull';
import { CreateCooperadoDto } from 'src/dtos/cooperado/create-cooperado.dto';
import { CooperadoDto } from 'src/dtos/cooperado/lista-cooperado.dto';
import { UpdateCooperadoDto } from 'src/dtos/cooperado/update-cooperado.dto';
import { PageMetaDto } from 'src/dtos/page/page-meto.dto';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { Cooperado, TipoPessoa } from 'src/entities/cooperado.entity';
import { Repository } from 'typeorm';
import { readFile, utils } from 'xlsx';

@Injectable()
export class CooperadoService {
  constructor(
    @InjectRepository(Cooperado)
    private cooperadoRepository: Repository<Cooperado>,
    @InjectQueue('cooperado') private cooperadoQueue: Queue,
  ) {}

  create(createCooperadoDto: CreateCooperadoDto) {
    return 'This action adds a new cooperado';
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Cooperado>> {
    const queryBuilder =
      this.cooperadoRepository.createQueryBuilder('cooperado');

    queryBuilder
      .orderBy('cooperado.id')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Cooperado> {
    return await this.cooperadoRepository.findOneBy({ id });
  }

  update(id: number, updateCooperadoDto: UpdateCooperadoDto) {
    return `This action updates a #${id} cooperado`;
  }

  remove(id: number) {
    return `This action removes a #${id} cooperado`;
  }

  async upload(file: Express.Multer.File): Promise<Bull.JobId> {
    const job = await this.cooperadoQueue.add('importar', {
      arquivo: file,
    });

    return job.id;
  }

  async getJob(id: number): Promise<Job> {
    return this.cooperadoQueue.getJob(id);
  }
}
