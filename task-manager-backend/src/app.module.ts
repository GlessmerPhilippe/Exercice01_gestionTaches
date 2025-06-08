import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module'; // ← AJOUT

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '07112022',
      database: 'taskmanager',
      autoLoadEntities: true,
      synchronize: true, // désactivez en production
    }),
    TaskModule, // ← AJOUT
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
