import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Produto } from './produto.entity';
import { Cooperado } from './cooperado.entity';
import { PontoAtendimento } from './pontoAtendimento.entity';
import { Exclude, Expose } from 'class-transformer';
import { ProdutoStatusEnum } from 'src/utils/interfaces';
import { Historico } from './historico.entity';

export const GROUP_ALL_CARTOES = 'group_all_cartoes';
export const GROUP_FIND_CARTOES = 'group_find_cartoes';

@Entity()
export class ProdutoCartao extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  id: number;

  @Column({ type: 'varchar' })
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  contaCartao: string;

  @Column({ type: 'datetime' })
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  dataAberturaContaCartao: Date;

  @Column({ type: 'decimal', scale: 2, precision: 20 })
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  limiteAtribuido: string;

  @Column({ type: 'decimal', scale: 2, precision: 20 })
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  limiteAprovadoFabrica: string;

  @Column()
  @Exclude()
  produtoId: number;

  @Column()
  @Exclude()
  cooperadoId: number;

  @Column()
  @Exclude()
  pontoAtendimentoId: number;

  @Column({ type: 'enum', enum: ProdutoStatusEnum, default: ProdutoStatusEnum.ABERTO })
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  status: ProdutoStatusEnum;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  updatedAt: Date;

  @ManyToOne(() => Produto, (produto) => produto.cartaos)
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  produto: Produto;

  @ManyToOne(() => Cooperado, (cooperado) => cooperado.cartoes)
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  cooperado: Cooperado;

  @ManyToOne(() => PontoAtendimento, (pontoAtendimento) => pontoAtendimento.cartoes)
  @Expose({ groups: [GROUP_ALL_CARTOES, GROUP_FIND_CARTOES] })
  pontoAtendimento: PontoAtendimento;

  @OneToMany(() => Historico, (historico) => historico.produtoCartao)
  @Expose({ groups: [GROUP_FIND_CARTOES] })
  historicos: Historico[];
}
