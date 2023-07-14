import { IsEnum } from 'class-validator';
import { ProdutoStatusEnum, ProdutosTabelaEnum } from 'src/utils/interfaces';

export class ProdutoListaDto {
  @IsEnum(ProdutoStatusEnum, { message: `Informe uma tabela válida: ${Object.values(ProdutoStatusEnum).toString()}` })
  tabela: ProdutosTabelaEnum;
}
