import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ProdutoCartao } from './produto-cartao.entity';

@Entity('pontoAtendimento')
export class PontoAtendimento extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nome: string;

  @Column()
  cidade: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => ProdutoCartao, (produtoCartao) => produtoCartao.pontoAtendimento)
  cartoes: ProdutoCartao[];
}
