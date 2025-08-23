import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import "dotenv/config"
async function runAsWebServer() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`);
}

async function runAsCliJob() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🚀 Starting LangChain CLI test...');
    
    // Test basic service
    const appService = app.get(AppService);

    console.log('\n⏳ Processing with LangChain via JsonOutputToolsParser...');
    // Test individual joke services
    console.log('\n🎭 Testing JsonOutputParser service...');
    const jsonResult = await appService.tellJokeWithJsonOutput('programming');
    console.log('📋 JsonOutputParser result:', JSON.stringify(jsonResult, null, 2));
    
    console.log('\n🔧 Testing JsonOutputToolsParser service...');
    const toolsResult = await appService.tellJokeWithToolsParser('AI');
    console.log('📋 JsonOutputToolsParser result:', JSON.stringify(toolsResult, null, 2));
    
    console.log('\n🔑 Testing JsonOutputKeyToolsParser service...');
    const keyResult = await appService.tellJokeWithKeyToolsParser('coding');
    console.log('📋 JsonOutputKeyToolsParser result:', JSON.stringify(keyResult, null, 2));
    
    console.log('\n🎪 Testing all joke services together...');
    const allResults = await appService.testAllJokeServices('technology');
    console.log('📋 All services result:', JSON.stringify(allResults, null, 2));
    
    console.log('\n✅ LangChain CLI test completed successfully!');
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
  const mode = process.env.MODE ?? 'web'; // default is web

  if (mode === 'cli') {
    try {
      await runAsCliJob();
      console.log('\n🏁 CLI execution completed. Exiting...');
      process.exit(0); // Exit successfully
    } catch (error) {
      console.error('\n💥 CLI execution failed:', error);
      process.exit(1); // Exit with error code
    }
  } else {
    await runAsWebServer();
  }
}

bootstrap();
