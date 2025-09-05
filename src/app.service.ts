import { Injectable, Logger } from '@nestjs/common';
import { SummaryChain } from './langchain/examples/summary.chain';
import {
  JokeJsonOutputParserService,
  JokeJsonOutputToolsParserService,
  JokeJsonKeyOutputToolsParserService,
} from './langchain/services';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly summaryChain: SummaryChain,
    private readonly jokeJsonOutputService: JokeJsonOutputParserService,
    private readonly jokeToolsService: JokeJsonOutputToolsParserService,
    private readonly jokeKeyToolsService: JokeJsonKeyOutputToolsParserService,
  ) {}

  getHello(): string {
    this.logger.log('getHello called');
  
    try {
      // Simulate error for testing logs
      throw new Error('💥 Simulated error from getHello');
    } catch (error: any) {
      this.logger.error('getHello failed', error.stack, 'getHello');
      throw error; // optional: or return a fallback response
    }
  }

  async summarizeText(text: string): Promise<any> {
    const start = Date.now();
    this.logger.log('Summarize start', { op: 'summarizeText', textLen: text?.length ?? 0 });

    try {
      const result = await this.summaryChain.summarize(text);
      this.logger.log('Summarize success', { op: 'summarizeText', ms: Date.now() - start });
      return result;
    } catch (error: any) {
      this.logger.error('Summarize failed', error?.stack, 'summarizeText');
      // optional: include duration for failures too
      this.logger.warn('Summarize failure timing', { op: 'summarizeText', ms: Date.now() - start });
      throw error;
    }
  }

  // JsonOutputParser
  async tellJokeWithJsonOutput(topic: string): Promise<any> {
    const start = Date.now();
    this.logger.log('Joke(JsonOutput) start', { op: 'joke:jsonOutput', topic });

    try {
      const result = await this.jokeJsonOutputService.tellJoke(topic);
      this.logger.log('Joke(JsonOutput) success', { op: 'joke:jsonOutput', ms: Date.now() - start });
      return result;
    } catch (error: any) {
      this.logger.error('Joke(JsonOutput) failed', error?.stack, 'tellJokeWithJsonOutput');
      this.logger.warn('Joke(JsonOutput) failure timing', { op: 'joke:jsonOutput', ms: Date.now() - start });
      throw error;
    }
  }

  // JsonOutputToolsParser
  async tellJokeWithToolsParser(topic: string): Promise<any> {
    const start = Date.now();
    this.logger.log('Joke(ToolsParser) start', { op: 'joke:toolsParser', topic });

    try {
      const result = await this.jokeToolsService.tellJoke(topic);
      this.logger.log('Joke(ToolsParser) success', { op: 'joke:toolsParser', ms: Date.now() - start });
      return result;
    } catch (error: any) {
      this.logger.error('Joke(ToolsParser) failed', error?.stack, 'tellJokeWithToolsParser');
      this.logger.warn('Joke(ToolsParser) failure timing', { op: 'joke:toolsParser', ms: Date.now() - start });
      throw error;
    }
  }

  // JsonOutputKeyToolsParser
  async tellJokeWithKeyToolsParser(topic: string): Promise<any> {
    const start = Date.now();
    this.logger.log('Joke(KeyToolsParser) start', { op: 'joke:keyToolsParser', topic });

    try {
      const result = await this.jokeKeyToolsService.tellJoke(topic);
      this.logger.log('Joke(KeyToolsParser) success', { op: 'joke:keyToolsParser', ms: Date.now() - start });
      return result;
    } catch (error: any) {
      this.logger.error('Joke(KeyToolsParser) failed', error?.stack, 'tellJokeWithKeyToolsParser');
      this.logger.warn('Joke(KeyToolsParser) failure timing', { op: 'joke:keyToolsParser', ms: Date.now() - start });
      throw error;
    }
  }

  // Run all three parsers
  async testAllJokeServices(topic: string): Promise<any> {
    const start = Date.now();
    this.logger.log('Joke(All) start', { op: 'joke:all', topic });

    try {
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

      this.logger.log('Joke(All) success', { op: 'joke:all', ms: Date.now() - start });
      return results;
    } catch (error: any) {
      this.logger.error('Joke(All) failed', error?.stack, 'testAllJokeServices');
      this.logger.warn('Joke(All) failure timing', { op: 'joke:all', ms: Date.now() - start });
      throw error;
    }
  }
}
