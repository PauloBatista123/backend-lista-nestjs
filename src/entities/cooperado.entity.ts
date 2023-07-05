import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoPessoa {
  PESSOA_JURIDICA = 'PJ',
  PESSOA_FISICA = 'PF',
}

@Entity({ name: 'cooperados' })
export class Cooperado extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  cpfCnpj: string;

  @Column()
  telefoneCelular: string;

  @Column({ nullable: true })
  telefoneResidencial: string;

  @Column()
  pontoAtendimento: number;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  renda: number;

  @Column({ type: 'enum', enum: TipoPessoa })
  sigla: TipoPessoa;
}
