import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import "dotenv/config"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LangchainService } from './langchain.service';
import { WinstonModule } from 'nest-winston';
import { createEsWinstonLogger } from './logging/es-logger';

async function runAsWebServer() {
  const logger =createEsWinstonLogger();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Employee API')
    .setDescription('CRUD operations for employee')
    .setVersion('1.0')
    .addTag('Employee')
    .build();
    app.useLogger(WinstonModule.createLogger({
      instance: logger,
    }));
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // Swagger UI at /api
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`);
}

async function runAsCliJob() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🚀 Starting LangChain CLI test...');

    // Test basic service
    const langchainService = app.get(LangchainService);
    await langchainService.execute("India");
  } catch (err) {
    console.error('❌ CLI job failed:', err);
    if (err.stack) {
      console.error('Stack trace:', err.stack);
    }
  } finally {
    await app.close();
  }
}

async function bootstrap() {
  // Decide which mode to run
  await runAsWebServer();
}

bootstrap();
