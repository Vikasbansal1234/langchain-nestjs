import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LangchainModule } from './langchain/langchain.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import configuration from './config/configuration';
import { createKeyv } from '@keyv/redis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LangchainService } from './langchain.service';
import { McpModule } from '@nestjs-mcp/server';
import { SocketModule } from './socket/socket.module';
import { MathResolver } from './math.resolver';
@Module({
  imports: [LangchainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration], // ✅ Register your config file
    }),
     McpModule.forRoot({
      name: 'My Server',
      version: '1.0.0',
      instructions: 'A server providing utility tools and data.',
     }),
    MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get<string>('mongoUri'),
      }
    },
    inject: [ConfigService],    
   
  })],
  controllers: [AppController,],
  providers: [AppService,LangchainService,MathResolver],
})
export class AppModule {}
