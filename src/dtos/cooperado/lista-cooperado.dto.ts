import { TipoPessoa } from 'src/entities/cooperado.entity';

export class CooperadoDto {
  public id: number;

  public nome: string;

  public cpfCnpj: string;

  public telefoneCelular: string;

  public endereco: string;

  public uf: string;

  public renda: string;

  public sigla: TipoPessoa;
}
