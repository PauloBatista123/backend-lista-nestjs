import Bull from 'bull';
import { PageOptionsDto } from 'src/dtos/page/page-options.dto';

export interface PageMetaDtoParams {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class GetJobStatus {
  id: Bull.JobId;
  progress: () => number;
  timestamp: number;
  finishedOn: Date;
  processedOn: Date;
}

export enum JobStatus {
  COMPLETED = 'completed',
  WAITING = 'waiting',
  ACTIVE = 'active',
  DELAYED = 'delayed',
  FAILED = 'failed',
  PAUSED = 'paused',
}

export enum ProdutosTabelaEnum {
  COOPERADO = 'cooperado',
  CARTAO = 'cartao',
}

export const headerFileCooperado = [
  'nome',
  'cpfCnpj',
  'telefoneCelular',
  'telefoneResidencial',
  'pontoAtendimento',
  'endereco',
  'cidade',
  'uf',
  'renda',
  'sigla',
];

export const headerFileProdutoCartao = [
  'pontoAtendimentoId',
  'cooperadoCpfCnpj',
  'contaCartao',
  'dataAberturaContaCartao',
  'limiteAtribuido',
  'limiteAprovadoFabrica',
  'produtoId',
];

export enum ProdutoStatusEnum {
  ABERTO = 'aberto',
  PENDENTE = 'pendente',
  FINALIZADO = 'finalizado',
}
