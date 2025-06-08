import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// Ce contrôleur gère les routes liées aux tâches (tasks)
@Controller('tasks')
export class TaskController {
  // Injection du service qui contient la logique métier
  constructor(private readonly taskService: TaskService) { }

  // Crée une nouvelle tâche (POST /tasks)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  // Récupère toutes les tâches (GET /tasks)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  // Récupère une tâche par son id (GET /tasks/:id)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  // Met à jour partiellement une tâche (PATCH /tasks/:id)
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  // Met à jour complètement une tâche (PUT /tasks/:id)
  @Put(':id')
  fullUpdate(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  // Supprime une tâche (DELETE /tasks/:id)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}