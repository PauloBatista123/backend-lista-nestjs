import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
}
