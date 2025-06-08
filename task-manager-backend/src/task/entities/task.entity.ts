import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Cette classe représente l'entité "Task" (tâche) dans la base de données
@Entity()
export class Task {
  // Identifiant unique généré automatiquement
  @PrimaryGeneratedColumn()
  id: number;

  // Titre de la tâche (obligatoire)
  @Column()
  title: string;

  // Description de la tâche (optionnelle)
  @Column({ nullable: true })
  description: string;

  // Statut d'accomplissement (false par défaut)
  @Column({ default: false })
  completed: boolean;

  // Priorité de la tâche : 'low', 'medium' ou 'high' (par défaut 'medium')
  @Column({ default: 'medium' })
  priority: 'low' | 'medium' | 'high';

  // Date/heure de rappel (optionnelle)
  @Column({ type: 'timestamp', nullable: true })
  reminder: Date;
}