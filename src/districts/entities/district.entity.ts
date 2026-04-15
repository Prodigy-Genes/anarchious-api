import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Citizen } from '../../citizens/entities/citizen.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: 'Level 1' })
  securityLevel!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  // A district can have many citizens
  @OneToMany(() => Citizen, (citizen) => citizen.district)
  citizens!: Citizen[];
}
