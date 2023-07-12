import { JobId, JobStatus } from 'bull';
import { ImportacaoTabelaEnum, JobStatus as JobStatusEnum } from 'src/utils/interfaces';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('importacao')
export class Importacao extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  jobId: number | JobId;

  @Column({ type: 'bigint' })
  jobRaws: number;

  @Column({ type: 'enum', enum: JobStatusEnum, default: JobStatusEnum.ACTIVE })
  jobStatus: JobStatus;

  @Column({ type: 'enum', enum: ImportacaoTabelaEnum })
  tabela: ImportacaoTabelaEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
