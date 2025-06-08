import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module'; // ← AJOUT

// Module principal de l'application.
// Il configure la connexion à la base de données et importe les modules nécessaires.
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
  // Importation du module TaskModule qui gère les tâches
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
