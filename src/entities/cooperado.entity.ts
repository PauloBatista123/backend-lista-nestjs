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
import { Expose } from 'class-transformer';

export enum TipoPessoa {
  PESSOA_JURIDICA = 'PJ',
  PESSOA_FISICA = 'PF',
}

export const GROUP_ALL_COOPERADO = 'group_all_cooperado';
export const GROUP_FIND_COOPERADO = 'group_find_cooperado';

@Entity({ name: 'cooperados' })
export class Cooperado extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  id: number;

  @Column()
  nome: string;

  @Column()
  cpfCnpj: string;

  @Column()
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  telefoneCelular: string;

  @Column({ nullable: true })
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  telefoneResidencial: string;

  @Column()
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  pontoAtendimento: number;

  @Column()
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  endereco: string;

  @Column()
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  cidade: string;

  @Column()
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  uf: string;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    nullable: true,
    default: 0,
  })
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  renda: number;

  @Column({ type: 'enum', enum: TipoPessoa })
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  sigla: TipoPessoa;

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  updatedAt: Date;

  @OneToMany(() => ProdutoCartao, (produtoCartao) => produtoCartao.cooperado)
  @Expose({ groups: [GROUP_ALL_COOPERADO, GROUP_FIND_COOPERADO] })
  cartoes: ProdutoCartao[];
}
