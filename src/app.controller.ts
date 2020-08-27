import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {

  @Get() //localhost:3000/
  getHello(): string {
    return 'Holla chico!';
  }

  @Get('/world') //localhost:3000/world/
  getWorld(): string {
    return 'World!!';
  }
}
