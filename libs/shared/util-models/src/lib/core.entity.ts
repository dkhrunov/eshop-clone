import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  dateCreated!: Date;
}
