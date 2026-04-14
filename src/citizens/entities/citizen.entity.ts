import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Define the hierarchy of Anarchious
export enum CitizenRole {
  CIVILIAN = 'civilian', // View access only
  OPERATIVE = 'operative', // Can modify data
  OVERSEER = 'overseer', // Full administrative/system access
}

@Entity('citizens')
export class Citizen {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  /**
   * Expert Security Move: { select: false }
   * This ensures that when you query a citizen, the password is NEVER
   * returned by default. You have to explicitly ask for it during login.
   */
  @Column({ select: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: CitizenRole,
    default: CitizenRole.CIVILIAN,
  })
  role!: CitizenRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
