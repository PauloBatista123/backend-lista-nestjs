import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Cooperado, TipoPessoa } from 'src/entities/cooperado.entity';
import { readFile, utils } from 'xlsx';

@Processor('cooperado')
export class CooperadoConsumer {
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
  onActive(job: Job) {
    console.log(
      `Processando job ${job.id} of type ${job.name} with data ${job.data}`,
    );
  }

  @OnQueueError()
  onError(error: Error) {
    console.error(`Um erro ocorreu: ${error}`);
  }

  @OnQueueProgress()
  onProgress(job: Job, progress: number) {
    console.log(`Carregando ${job.id} - ${progress}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Finalizado trabalho ${job.id}`);
  }
}
