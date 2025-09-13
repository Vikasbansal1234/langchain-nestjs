/* eslint-disable */
import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';


import { Tool } from '../decorators/lc.tool';
import { Agent } from '../decorators/lc.agent';

import { Provider, ModelKind } from '../enums/model.enums';
import { Model } from '../decorators/model.decorator';

/**
 * WeatherAgentService
 * -------------------
 * Registers:
 *   - OpenAI chat model
 *   - A weather-fetching tool
 *   - A ReAct agent that uses the model and tool
 */
@Injectable()
export class WeatherAgentService {
  private readonly logger = new Logger(WeatherAgentService.name);

  // 1️⃣ Model – OpenAI GPT-4o chat model
  @Model({
    name: 'openaiChat',
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
    temperature: 0,
  })
  chatModel!: any;

  // 2️⃣ Tool – Fake weather fetcher with Zod schema validation
  @Tool({
    name: 'getWeather',
    description: 'Fetch a fake weather report for a given city',
    schema: z.object({ city: z.string().describe('City to get weather for') }),
  })
  async getWeather({ city }: { city: string }) {
    // Replace with a real weather API call if needed
    return `It is always sunny in ${city}!`;
  }

  // 3️⃣ Agent – ReAct agent that can call the above tool
  @Agent({
    name: 'weatherAgent',
    modelRef: 'chatModel',        // must match the @Model property
    toolRefs: ['getWeather'],     // must match the @Tool property
    responseFormat: z.object({
      forecast: z.string().describe('Short weather forecast'),
    }),
  })
  weatherAgent!: any;

  /**
   * Invoke the agent with a city query.
   */
  async forecast(city: string) {
    this.logger.log(`Requesting forecast for ${city}`);
    const result = await this.weatherAgent.invoke({
      messages: [{ role: 'user', content: `What is the weather in ${city}?` }],
    });
    return result.structuredResponse; // => { forecast: 'It is always sunny in NYC!' }
  }
}
