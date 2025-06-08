import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Point d'entrée principal de l'application NestJS.
// Cette fonction démarre le serveur, active le CORS et écoute sur le port défini.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // *** Permet de faire des requêtes cross-origin (CORS).
  // Utile pour autoriser les requêtes depuis d'autres domaines (par exemple, le frontend).
  app.enableCors(); // *** 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
