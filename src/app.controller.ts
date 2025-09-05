import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey("Hello-world")
  @CacheTTL(30000)
  getHello(): string {
    return this.appService.getHello();
  }
}
