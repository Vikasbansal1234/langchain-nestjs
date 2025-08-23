import { Injectable } from '@nestjs/common';
import { SummaryChain } from './langchain/examples/summary.chain';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import {
  JokeJsonOutputParserService,
  JokeJsonOutputToolsParserService,
  JokeJsonKeyOutputToolsParserService,
} from './langchain/services';

@Injectable()
export class AppService {
  constructor(
    private readonly summaryChain: SummaryChain,
    private readonly jokeJsonOutputService: JokeJsonOutputParserService,
    private readonly jokeToolsService: JokeJsonOutputToolsParserService,
    private readonly jokeKeyToolsService: JokeJsonKeyOutputToolsParserService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async summarizeText(text: string): Promise<any> {
    try {
      console.log('📝 AppService: Processing text summarization...');
      const result = await this.summaryChain.summarize(text);
      console.log('✅ AppService: Summarization completed');
      return result;
    } catch (error) {
      console.error('❌ AppService: Summarization failed:', error);
      throw error;
    }
  }

  // Method to test JsonOutputParser service
  async tellJokeWithJsonOutput(topic: string): Promise<any> {
    try {
      console.log(`🎭 AppService: Generating joke with JsonOutputParser about ${topic}...`);
      const result = await this.jokeJsonOutputService.tellJoke(topic);
      console.log('✅ AppService: JsonOutputParser joke generation completed');
      return result;
    } catch (error) {
      console.error('❌ AppService: Error generating JsonOutputParser joke:', error);
      throw error;
    }
  }

  // Method to test JsonOutputToolsParser service
  async tellJokeWithToolsParser(topic: string): Promise<any> {
    try {
      console.log(`🔧 AppService: Generating joke with JsonOutputToolsParser about ${topic}...`);
      const result = await this.jokeToolsService.tellJoke(topic);
      console.log('✅ AppService: JsonOutputToolsParser joke generation completed');
      return result;
    } catch (error) {
      console.error('❌ AppService: Error generating JsonOutputToolsParser joke:', error);
      throw error;
    }
  }

  // Method to test JsonOutputKeyToolsParser service
  async tellJokeWithKeyToolsParser(topic: string): Promise<any> {
    try {
      console.log(`🔑 AppService: Generating joke with JsonOutputKeyToolsParser about ${topic}...`);
      const result = await this.jokeKeyToolsService.tellJoke(topic);
      console.log('✅ AppService: JsonOutputKeyToolsParser joke generation completed');
      return result;
    } catch (error) {
      console.error('❌ AppService: Error generating JsonOutputKeyToolsParser joke:', error);
      throw error;
    }
  }

  // Convenience method to test all three parsers at once
  async testAllJokeServices(topic: string): Promise<any> {
    try {
      console.log(`🎪 AppService: Testing all joke services with topic: ${topic}`);
      
      const [jsonOutput, toolsParser, keyToolsParser] = await Promise.all([
        this.tellJokeWithJsonOutput(topic),
        this.tellJokeWithToolsParser(topic),
        this.tellJokeWithKeyToolsParser(topic),
      ]);

      const results = {
        jsonOutputParser: jsonOutput,
        jsonOutputToolsParser: toolsParser,
        jsonOutputKeyToolsParser: keyToolsParser,
      };

      console.log('🎉 AppService: All joke services tested successfully');
      return results;
    } catch (error) {
      console.error('❌ AppService: Error testing joke services:', error);
      throw error;
    }
  }
}
