import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
    version: VERSION_NEUTRAL,
})
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Version('1')
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
