import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // <--- This maps to http://localhost:5000/
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus() {
    return {
      status: 'online',
      system: 'Anarchious Core',
      timestamp: new Date().toISOString(),
    };
  }
}
