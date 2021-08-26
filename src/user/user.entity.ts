import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar', { length: 90, unique: true })
  name: string;

  @Column('varchar', { length: 90 })
  email: string;

  @Column('varchar', { length: 20 }) password: string;
}
