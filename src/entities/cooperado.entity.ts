import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoCartao } from './produto-cartao.entity';

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
    precision: 20,
    scale: 2,
    nullable: true,
    default: 0,
  })
  renda: number;

  @Column({ type: 'enum', enum: TipoPessoa })
  sigla: TipoPessoa;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProdutoCartao, (produtoCartao) => produtoCartao.cooperado)
  cartoes: ProdutoCartao[];
}
