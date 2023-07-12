import { IsEnum } from 'class-validator';
import { ImportacaoTabelaEnum } from 'src/utils/interfaces';

export class ImportacaoDto {
  @IsEnum(ImportacaoTabelaEnum, {
    message: `É obrigatório informar o tipo de importação: ${Object.values(ImportacaoTabelaEnum).toString()}`,
  })
  tabela: ImportacaoTabelaEnum;
}
