import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LangchainModule } from './langchain/langchain.module';

import { LangchainService } from './langchain.service';

import { MathResolver } from './math.resolver';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LangchainModule,
  ],
  controllers: [AppController],
  providers: [AppService, LangchainService, MathResolver],
})
export class AppModule {}
