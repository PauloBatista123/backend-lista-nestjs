import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ProdutosTabelaEnum } from 'src/utils/interfaces';

export class HistoricoCreateDto {
  @IsString()
  @MinLength(10, { message: 'O comentário deve ter no mínimo 10 caracteres' })
  comentario: string;

  @IsInt({ message: 'O produtoId deve ser um inteiro válido' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'O produtoId é obrigatório' })
  produtoId: number;

  @IsEnum(ProdutosTabelaEnum, { message: `Informe uma tabela válida: ${Object.values(ProdutosTabelaEnum).toString()}` })
  tabela: ProdutosTabelaEnum;
}
