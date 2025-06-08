import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Contrôleur principal de l'application.
// Il gère la route racine ("/") et délègue la logique à AppService.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Route GET "/" qui retourne un message de bienvenue
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
