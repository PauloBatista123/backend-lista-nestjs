import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Produto } from './produto.entity';
import { Cooperado } from './cooperado.entity';
import { PontoAtendimento } from './pontoAtendimento.entity';
import { Exclude } from 'class-transformer';
import { ProdutoStatusEnum } from 'src/utils/interfaces';

@Entity()
export class ProdutoCartao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  contaCartao: string;

  @Column({ type: 'datetime' })
  dataAberturaContaCartao: Date;

  @Column({ type: 'decimal', scale: 2, precision: 20 })
  limiteAtribuido: string;

  @Column({ type: 'decimal', scale: 2, precision: 20 })
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
  status: ProdutoStatusEnum;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => Produto, (produto) => produto.cartaos)
  produto: Produto;

  @ManyToOne(() => Cooperado, (cooperado) => cooperado.cartoes)
  cooperado: Cooperado;

  @ManyToOne(() => PontoAtendimento, (pontoAtendimento) => pontoAtendimento.cartoes)
  pontoAtendimento: PontoAtendimento;
}
