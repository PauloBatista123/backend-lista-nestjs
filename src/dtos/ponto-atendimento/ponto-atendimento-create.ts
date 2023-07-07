import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class PontoAtendimentoCreateDto {
  @IsInt({ message: 'O campo id deve ser um número inteiro' })
  @Min(1, { message: 'O campo id deve ser um número maior que 0' })
  @Transform(({ value }) => Number(value))
  id: number;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  nome: string;
}
