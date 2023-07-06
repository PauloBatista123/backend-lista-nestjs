import { IsString, MinLength } from 'class-validator';

export class ProdutoCriarDto {
  @IsString({ message: 'O campo nome deve ser do tipo string' })
  @MinLength(5, { message: 'O campo nome deve conter no minimo 5 caracteres' })
  nome: string;

  @IsString({ message: 'O campo descricao deve ser do tipo string' })
  @MinLength(5, {
    message: 'O campo descricao deve conter no minimo 5 caracteres',
  })
  descricao: string;
}
