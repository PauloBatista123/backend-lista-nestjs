import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoPessoa {
  PESSOA_JURIDICA = 'PJ',
  PESSOA_FISICA = 'PF',
}

@Entity({ name: 'cooperados' })
export class Cooperado {
  @PrimaryGeneratedColumn('increment')
  private id: number;

  @Column()
  private nome: string;

  @Column()
  private cpfCnpj: string;

  @Column()
  private telefoneCelular: string;

  @Column({ nullable: true })
  private telefoneResidencial: string;

  @Column()
  private pontoAtendimento: number;

  @Column()
  private endereco: string;

  @Column()
  private cidade: string;

  @Column()
  private uf: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  private renda: number;

  @Column({ type: 'enum', enum: TipoPessoa })
  private sigla: TipoPessoa;
}
