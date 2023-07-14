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

export const GROUP_ALL_PRODUTOS = 'group_all_produtos';

@Entity({ name: 'produtos' })
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_ALL_PRODUTOS] })
  id: number;

  @Column()
  nome: string;

  @Column()
  @Expose({ groups: [GROUP_ALL_PRODUTOS] })
  descricao: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose({ groups: [GROUP_ALL_PRODUTOS] })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Expose({ groups: [GROUP_ALL_PRODUTOS] })
  updated_at: Date;

  @OneToMany(() => ProdutoCartao, (produtoCartao) => produtoCartao.produto)
  @Expose({ groups: [GROUP_ALL_PRODUTOS] })
  cartaos: ProdutoCartao[];
}
