import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { ProdutoCartao } from 'src/entities';
import { CooperadoRepository, PontoAtendimentoRespository } from 'src/repositories';
import { ImportacaoRepository } from 'src/repositories/importacao.repository';
import { ProdutoCartaoRepository } from 'src/repositories/produto-cartao.repository';
import { ProdutoRepository } from 'src/repositories/produto.repository';
import { ProdutosTabelaEnum, JobStatus } from 'src/utils/interfaces';
import { readFile, utils } from 'xlsx';

@Processor('produto-cartao')
export class ProdutoCartaoConsumer {
  constructor(
    @InjectRepository(ProdutoCartaoRepository)
    private produtoCartaoRepository: ProdutoCartaoRepository,
    @InjectRepository(PontoAtendimentoRespository)
    private pontoAtendimentoRepository: PontoAtendimentoRespository,
    @InjectRepository(CooperadoRepository)
    private cooperadoRepository: CooperadoRepository,
    @InjectRepository(ProdutoRepository)
    private produtoRepository: ProdutoRepository,
    @InjectRepository(ImportacaoRepository)
    private importacaoRepository: ImportacaoRepository,
  ) {}

  @Process('importar')
  async importar(job: Job<{ arquivo: Express.Multer.File }>) {
    const workbook = readFile(job.data.arquivo.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = utils.decode_range(worksheet['!ref']);

    for (let numeroLinha = range.s.r + 1; numeroLinha <= range.e.r; numeroLinha++) {
      const produtoCartao = new ProdutoCartao();

      for (let numeroColunas = range.s.c; numeroColunas <= range.e.c; numeroColunas++) {
        const cell = worksheet[utils.encode_cell({ r: numeroLinha, c: numeroColunas })];

        if (cell) {
          if (numeroColunas === 0) {
            const pontoAtendimento = await this.pontoAtendimentoRepository.findOneByOrFail({ id: cell.v });
            produtoCartao.pontoAtendimentoId = pontoAtendimento.id;
          }
          if (numeroColunas === 1) {
            const cooperado = await this.cooperadoRepository.findOneByOrFail({ cpfCnpj: cell.v });
            produtoCartao.cooperadoId = cooperado.id;
          }
          if (numeroColunas === 2) produtoCartao.contaCartao = cell.v;
          if (numeroColunas === 3) {
            produtoCartao.dataAberturaContaCartao = isNaN(Date.parse(cell.v)) === true ? new Date() : new Date(cell.v);
          }
          if (numeroColunas === 4) produtoCartao.limiteAtribuido = cell.v;
          if (numeroColunas === 5) produtoCartao.limiteAprovadoFabrica = cell.v;
          if (numeroColunas === 6) {
            const produto = await this.produtoRepository.findOneByOrFail({ id: cell.v });
            produtoCartao.produtoId = produto.id;
          }
        }
      }
      await this.produtoCartaoRepository.save(produtoCartao);
      await job.progress((numeroLinha / range.e.r) * 100);
    }
  }

  @OnQueueActive()
  async onActive(job: Job) {
    const jobDatabase = await this.importacaoRepository.findOneBy({
      jobId: job.id,
      tabela: ProdutosTabelaEnum.CARTAO,
    });
    if (jobDatabase) {
      jobDatabase.jobStatus = JobStatus.ACTIVE;
      jobDatabase.save();
    }
  }

  @OnQueueError()
  async onError(error: Error) {
    console.error(`Um erro ocorreu: ${error}`);
  }

  @OnQueueProgress()
  async onProgress(job: Job, progress: number) {
    const jobDatabase = await this.importacaoRepository.findOneBy({
      jobId: job.id,
      tabela: ProdutosTabelaEnum.CARTAO,
    });

    if (jobDatabase) {
      jobDatabase.jobStatus = JobStatus.ACTIVE;
      jobDatabase.jobRaws = progress;
      jobDatabase.save();
    }
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    const jobDatabase = await this.importacaoRepository.findOneBy({
      jobId: job.id,
      tabela: ProdutosTabelaEnum.CARTAO,
    });

    console.log(jobDatabase);

    if (jobDatabase) {
      jobDatabase.jobStatus = JobStatus.COMPLETED;
      jobDatabase.save();
    }
  }

  @OnQueueFailed()
  async onFailed(job: Job, error: Error) {
    console.log(error);
    const jobDatabase = await this.importacaoRepository.findOneBy({
      jobId: job.id,
      tabela: ProdutosTabelaEnum.CARTAO,
    });

    if (jobDatabase) {
      jobDatabase.jobStatus = JobStatus.FAILED;
      jobDatabase.save();
    }
  }
}
