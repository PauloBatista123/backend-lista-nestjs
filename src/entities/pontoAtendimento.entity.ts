import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
