import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// Le service contient la logique métier pour manipuler les tâches.
// Il utilise le repository TypeORM pour interagir avec la base de données.
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>, // Injection du repository Task
  ) { }

  // Crée une nouvelle tâche à partir du DTO et la sauvegarde en base
  create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  // Retourne toutes les tâches
  findAll() {
    return this.taskRepository.find();
  }

  // Retourne une tâche par son id
  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  // Met à jour une tâche existante
  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }
  
  // Supprime une tâche par son id
  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}