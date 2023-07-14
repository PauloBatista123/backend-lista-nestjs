import { IsEnum } from 'class-validator';
import { ProdutosTabelaEnum } from 'src/utils/interfaces';

export class ImportacaoDto {
  @IsEnum(ProdutosTabelaEnum, {
    message: `É obrigatório informar o tipo de importação: ${Object.values(ProdutosTabelaEnum).toString()}`,
  })
  tabela: ProdutosTabelaEnum;
}
