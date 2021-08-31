import { hashPasswordTransform } from 'src/utils/crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 90, nullable: false })
  name: string;

  @Column('varchar', { length: 90, unique: true })
  email: string;

  @Column({ transformer: hashPasswordTransform })
  password: string;
}
