import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

// Le module regroupe tous les éléments liés aux tâches (entity, service, controller)
// TypeOrmModule.forFeature([Task]) permet d'injecter le repository Task dans le service
@Module({
  imports: [TypeOrmModule.forFeature([Task])], // ← INDISPENSABLE !
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
