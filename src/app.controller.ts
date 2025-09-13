/* eslint-disable */
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslationService } from './langchain/examples/translation.service';
import { GreetingGraphService } from './langchain/examples/greeting.graph';
import { VectorExampleService } from './langchain/examples/vector-example.service';
import { SummaryChain } from './langchain/examples/summary.chain';
import { WeatherAgentService } from './langchain/examples/weather-agent.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly translator: TranslationService,
    private readonly weatherService: WeatherAgentService,
    private readonly summaryChain:SummaryChain,
    private readonly greetingGraphService: GreetingGraphService,
    private readonly vectorService: VectorExampleService, // ✅ new injection
  ) {}

  /**
   * Example using GreetingGraph
   * URL: GET /translate?text=Vikas
   */
  @Get('translate')
  async translate(@Query('text') name: string) {
    const results = await this.greetingGraphService.graph.invoke({
      userName: name || 'Anonymous',
      messages: [],
    });

    return results;
  }

  @Get()
  async getHello(@Query('text') text:string){
    return this.appService.getHello(text);
  }

  @Get('forecast')
  async getWeather(@Query('city') city: string) {
    const output = await this.weatherService.forecast(city);
    return { city, forecast: output.forecast };
  }
  /**
   * ➕ Add a sample document to the Redis vector index
   * URL: GET /vector/add
   */
  @Get('vector/add')
  async addVectorDoc() {
    const message = await this.vectorService.addSampleDocument();
    return { status: 'ok', message };
  }

  /**
   * 🔎 Search for documents similar to the query text
   * URL: GET /vector/search?q=Apple
   */
  @Get('vector/search')
  async searchVector(@Query('q') q: string) {
    if (!q) return { error: 'Query parameter "q" is required' };
    const results = await this.vectorService.querySimilar(q);
    return { query: q, results };
  }

   @Get('summary')
  async summarize(@Query('text') text: string) {
    const output = await this.summaryChain.run(text);
    return { input: text, summary: output };
  }

  /**
   * 🧮 Generate embeddings directly (optional demo)
   * URL: GET /vector/embed?text=Hello%20world
   */
  @Get('vector/embed')
  async embedVector(@Query('text') text: string) {
    if (!text) return { error: 'Query parameter "text" is required' };
    const vector = await this.vectorService.embeddings.embedQuery(text);
    return {
      input: text,
      vectorLength: vector.length,
      preview: vector.slice(0, 5), // show first few numbers
    };
    
  }
}
