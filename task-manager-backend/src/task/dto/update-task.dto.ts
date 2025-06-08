import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// Un DTO (Data Transfer Object) pour la mise à jour d'une tâche.
// Il hérite de CreateTaskDto mais rend tous les champs optionnels grâce à PartialType.
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}