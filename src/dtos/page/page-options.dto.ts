import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';
import { TipoPessoa } from 'src/entities/cooperado.entity';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  readonly page?: number = 1;

  @IsInt()
  @Min(1, { message: 'O campo take deve conter no mínimo 1' })
  @Max(50, { message: 'O campo take tem limite de 50' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  readonly take?: number = 10;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'O nome deve conter no mínimo 3 caracteres' })
  readonly nome?: string = undefined;

  @IsOptional()
  @IsEnum(TipoPessoa)
  readonly sigla?: TipoPessoa;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
