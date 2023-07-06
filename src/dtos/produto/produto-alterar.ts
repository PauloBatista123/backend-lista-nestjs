import { IsOptional, IsString, MinLength } from 'class-validator';

export class ProdutoAlterarDto {
  @IsOptional()
  @IsString({ message: 'O campo nome deve ser do tipo string' })
  @MinLength(5, { message: 'O campo nome deve conter no minimo 5 caracteres' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'O campo nome deve ser do tipo string' })
  @MinLength(5, { message: 'O campo nome deve conter no minimo 5 caracteres' })
  descricao: string;
}
