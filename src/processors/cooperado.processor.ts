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
import { Cooperado, TipoPessoa } from 'src/entities/cooperado.entity';
import { Importacao } from 'src/entities/importacao.entity';
import { JobStatus } from 'src/utils/interfaces';
import { Repository } from 'typeorm';
import { readFile, utils } from 'xlsx';

@Processor('cooperado')
export class CooperadoConsumer {
  constructor(
    @InjectRepository(Importacao)
    private importacaoRepository: Repository<Importacao>,
  ) {}

  @Process('importar')
  async importar(job: Job<{ arquivo: Express.Multer.File }>) {
    const workbook = readFile(job.data.arquivo.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = utils.decode_range(worksheet['!ref']);

    for (
      let numeroLinha = range.s.r + 1;
      numeroLinha <= range.e.r;
      numeroLinha++
    ) {
      const cooperado = new Cooperado();

      for (
        let numeroColunas = range.s.c;
        numeroColunas <= range.e.c;
        numeroColunas++
      ) {
        const cell =
          worksheet[utils.encode_cell({ r: numeroLinha, c: numeroColunas })];

        if (cell) {
          if (numeroColunas === 0) cooperado.nome = cell.v;
          if (numeroColunas === 1) cooperado.cpfCnpj = cell.v;
          if (numeroColunas === 2) cooperado.telefoneCelular = cell.v;
          if (numeroColunas === 3) cooperado.telefoneResidencial = cell.v;
          if (numeroColunas === 4) cooperado.pontoAtendimento = cell.v;
          if (numeroColunas === 5) cooperado.endereco = cell.v;
          if (numeroColunas === 6) cooperado.cidade = cell.v;
          if (numeroColunas === 7) cooperado.uf = cell.v;
          if (numeroColunas === 8) cooperado.renda = cell.v;
          if (numeroColunas === 9) {
            cooperado.sigla =
              cell.v === 'PJ'
                ? TipoPessoa.PESSOA_JURIDICA
                : TipoPessoa.PESSOA_FISICA;
          }
        }
      }
      await cooperado.save();
      await job.progress((numeroLinha / range.e.r) * 100);
    }
  }

  @OnQueueActive()
  async onActive(job: Job) {
    const jobDatabase = await this.importacaoRepository.findOneBy({
      jobId: job.id,
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
    });

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
    });

    if (jobDatabase) {
      jobDatabase.jobStatus = JobStatus.FAILED;
      jobDatabase.save();
    }
  }
}
