import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Bull, { Job, JobCounts, Queue } from 'bull';
import { ImportacaoDto } from 'src/dtos/importacao/importar.dto';
import { PageMetaDto } from 'src/dtos/page/page-meto.dto';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';
import { PageDto } from 'src/dtos/page/page.dto';
import { Importacao } from 'src/entities/importacao.entity';
import {
  ImportacaoTabelaEnum,
  JobStatus,
  headerFileCooperado,
} from 'src/utils/interfaces';
import { QueryBuilder, Repository } from 'typeorm';
import { readFile, utils } from 'xlsx';

@Injectable()
export class ImportacaoService {
  constructor(
    @InjectRepository(Importacao)
    private importacaoRepository: Repository<Importacao>,
    @InjectQueue('cooperado')
    private cooperadoQueue: Queue,
  ) {}

  async create(job: Job): Promise<Importacao> {
    const importacao = new Importacao();
    importacao.jobId = Number(job.id);
    importacao.jobStatus = JobStatus.ACTIVE;
    importacao.jobRaws = 0;
    return await importacao.save();
  }

  async validateFileReader(file: Express.Multer.File, tabela: string) {
    const workbook = readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const columnsArray = utils.sheet_to_json(worksheet, {
      header: 1,
    })[0];

    if (tabela === ImportacaoTabelaEnum.COOPERADO) {
      if (JSON.stringify(columnsArray) !== JSON.stringify(headerFileCooperado))
        throw new BadRequestException(
          `O cabeçalho do arquivo deve conter: ${headerFileCooperado.toString()}`,
        );
    }
  }

  async upload(file: Express.Multer.File, tabela: string): Promise<Bull.JobId> {
    const jobQueue = await this.cooperadoQueue.add('importar', {
      arquivo: file,
    });

    await this.create(jobQueue);

    return jobQueue.id;
  }

  async getJobById(id: number): Promise<Job> {
    return this.cooperadoQueue.getJob(id);
  }

  async getJobCounts(): Promise<JobCounts> {
    return await this.cooperadoQueue.getJobCounts();
  }

  async getJob(pageOptionsDto: PageOptionsDto): Promise<PageDto<Importacao>> {
    const queryBuilder =
      this.importacaoRepository.createQueryBuilder('importacao');

    queryBuilder
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip)
      .orderBy('importacao.id', 'DESC');

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
