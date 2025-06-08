import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 'medium' })
  priority: 'low' | 'medium' | 'high';

  @Column({ type: 'timestamp', nullable: true })
  reminder: Date;
}