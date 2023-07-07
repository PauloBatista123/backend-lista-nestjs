import { IsNotEmpty, IsString } from 'class-validator';

export class PontoAtendimentoUpdateDto {
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  nome: string;
}
