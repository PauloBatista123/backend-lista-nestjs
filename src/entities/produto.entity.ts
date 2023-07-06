import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'produtos' })
export class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
