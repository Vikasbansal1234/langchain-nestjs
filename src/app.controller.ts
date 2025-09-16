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
    private readonly weatherService: WeatherAgentService,
    private readonly greetingGraphService: GreetingGraphService,
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
}
