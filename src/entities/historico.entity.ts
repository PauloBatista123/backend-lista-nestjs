import { ProdutosTabelaEnum } from 'src/utils/interfaces';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoCartao } from './produto-cartao.entity';

@Entity()
export class Historico extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'longtext' })
  comentario: string;

  @Column({ nullable: true })
  produtoCartaoId: number;

  @Column({ type: 'enum', enum: ProdutosTabelaEnum })
  tabela: ProdutosTabelaEnum;

  @ManyToOne(() => ProdutoCartao, (produtoCartao) => produtoCartao.historicos)
  produtoCartao: ProdutoCartao;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
