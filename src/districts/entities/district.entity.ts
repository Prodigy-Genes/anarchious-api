import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: 'low-sec' })
  securityLevel!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
