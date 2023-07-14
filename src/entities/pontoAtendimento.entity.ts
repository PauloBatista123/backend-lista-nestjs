import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { GROUP_FIND_CARTOES, ProdutoCartao } from './produto-cartao.entity';
import { Expose } from 'class-transformer';

export const GROUP_ALL_PONTO_ATENDIMENTO = 'group_all_ponto_atendimento';

@Entity('pontoAtendimento')
export class PontoAtendimento extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  @Expose({ groups: [GROUP_ALL_PONTO_ATENDIMENTO] })
  id: number;

  @Column()
  nome: string;

  @Column()
  @Expose({ groups: [GROUP_ALL_PONTO_ATENDIMENTO] })
  cidade: string;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ groups: [GROUP_ALL_PONTO_ATENDIMENTO] })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ groups: [GROUP_ALL_PONTO_ATENDIMENTO] })
  updated_at: Date;

  @ManyToOne(() => ProdutoCartao, (produtoCartao) => produtoCartao.pontoAtendimento)
  @Expose({ groups: [GROUP_ALL_PONTO_ATENDIMENTO] })
  cartoes: ProdutoCartao[];
}
