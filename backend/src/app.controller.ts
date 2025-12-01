import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({
    version: VERSION_NEUTRAL,
})
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({ summary: 'Get Hello Message' })
    @ApiResponse({ status: 200, description: 'Returns a hello message.' })
    @Version('1')
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
