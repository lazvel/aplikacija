import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get() //localhost:3000/
  getIndex(): string {
    return 'Home Page!';
  }
}
