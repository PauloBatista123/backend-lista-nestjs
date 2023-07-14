import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Bull, { Job, JobCounts, Queue } from 'bull';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/dtos/page';
import { Importacao } from 'src/entities';
import { ProdutosTabelaEnum, JobStatus, headerFileCooperado, headerFileProdutoCartao } from 'src/utils/interfaces';
import { Repository } from 'typeorm';
import { readFile, utils } from 'xlsx';

@Injectable()
export class ImportacaoService {
  constructor(
    @InjectRepository(Importacao)
    private importacaoRepository: Repository<Importacao>,
    @InjectQueue('cooperado')
    private cooperadoQueue: Queue,
    @InjectQueue('produto-cartao')
    private produtoCartaoQueue: Queue,
  ) {}

  async create(job: Job, tabela: string): Promise<Importacao> {
    const importacao = new Importacao();
    importacao.jobId = Number(job.id);
    importacao.jobStatus = JobStatus.ACTIVE;
    importacao.jobRaws = 0;
    importacao.tabela =
      ProdutosTabelaEnum[
        Object.keys(ProdutosTabelaEnum)[
          Object.values(ProdutosTabelaEnum).indexOf(tabela as unknown as ProdutosTabelaEnum)
        ]
      ];
    return await importacao.save();
  }

  async validateFileReader(file: Express.Multer.File, tabela: string) {
    const workbook = readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const columnsArray = utils.sheet_to_json(worksheet, {
      header: 1,
    })[0];

    switch (tabela) {
      case ProdutosTabelaEnum.COOPERADO:
        if (JSON.stringify(columnsArray) !== JSON.stringify(headerFileCooperado))
          throw new BadRequestException(`O cabeçalho do arquivo deve conter: ${headerFileCooperado.toString()}`);
        break;
      case ProdutosTabelaEnum.CARTAO:
        if (JSON.stringify(columnsArray) !== JSON.stringify(headerFileProdutoCartao))
          throw new BadRequestException(`O cabeçalho do arquivo deve conter: ${headerFileProdutoCartao.toString()}`);
        break;
      default:
        throw new BadRequestException(`Não econtramos o tipo de importação: ${ProdutosTabelaEnum.toString()}`);
    }
  }

  async upload(file: Express.Multer.File, tabela: string): Promise<Bull.JobId> {
    switch (tabela) {
      case ProdutosTabelaEnum.CARTAO:
        const jobQueueCartao = await this.produtoCartaoQueue.add('importar', {
          arquivo: file,
          tabela,
        });
        await this.create(jobQueueCartao, ProdutosTabelaEnum.CARTAO);
        return jobQueueCartao.id;
      case ProdutosTabelaEnum.COOPERADO:
        const jobQueueCooperado = await this.cooperadoQueue.add('importar', {
          arquivo: file,
          tabela,
        });
        await this.create(jobQueueCooperado, ProdutosTabelaEnum.COOPERADO);
        return jobQueueCooperado.id;
      default:
        throw new BadRequestException('A tabela não foi encontrada');
    }
  }

  async getJobById(id: number): Promise<Job> {
    try {
      const jobDatabase = await this.importacaoRepository.findOneByOrFail({ id });

      switch (jobDatabase.tabela) {
        case ProdutosTabelaEnum.CARTAO:
          return this.produtoCartaoQueue.getJob(jobDatabase.jobId);
        case ProdutosTabelaEnum.COOPERADO:
          return this.cooperadoQueue.getJob(jobDatabase.jobId);
        default:
          throw new BadRequestException('A tabela não foi encontrada');
      }
    } catch (error) {
      throw new BadRequestException(`Ocorreu um erro ao realizar a busca: Não encontramos registro com o id ${id}`);
    }
  }

  async getJobCounts(): Promise<JobCounts> {
    return await this.cooperadoQueue.getJobCounts();
  }

  async getJob(pageOptionsDto: PageOptionsDto): Promise<PageDto<Importacao>> {
    const queryBuilder = this.importacaoRepository.createQueryBuilder('importacao');

    queryBuilder.take(pageOptionsDto.take).skip(pageOptionsDto.skip).orderBy('importacao.id', 'DESC');

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
