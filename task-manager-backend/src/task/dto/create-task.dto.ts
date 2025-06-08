import { IsString, IsOptional, IsBoolean, IsIn, IsDateString } from 'class-validator';

// Un DTO (Data Transfer Object) sert à définir la structure des données échangées entre le client et le serveur.
// Il permet de valider et de typer les données reçues dans les requêtes, ici lors de la création d'une tâche.

// DTO pour la création d'une tâche : définit les champs attendus et leurs validations
export class CreateTaskDto {
  // Titre de la tâche (obligatoire, chaîne de caractères)
  @IsString()
  title: string;

  // Description de la tâche (optionnelle, chaîne de caractères)
  @IsString()
  @IsOptional()
  description?: string;

  // Statut d'accomplissement (optionnel, booléen)
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  // Priorité de la tâche (optionnelle, doit être 'low', 'medium' ou 'high')
  @IsIn(['low', 'medium', 'high'])
  @IsOptional()
  priority?: 'low' | 'medium' | 'high';

  // Date/heure de rappel (optionnelle, format date ISO)
  @IsDateString()
  @IsOptional()
  reminder?: string;
}
