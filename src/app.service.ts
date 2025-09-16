/* eslint-disable */
import { Injectable, Logger } from '@nestjs/common';
import { Chain } from './langchain/decorators/chain.decorator';
import { Model } from './langchain/decorators/model.decorator';
import { Provider, ModelKind } from './langchain/enums/model.enums';
import { PromptKind } from './langchain/enums/prompt.enums';
import { Prompt } from './langchain/decorators/prompt.decorator';
import { Parser } from './langchain/decorators/parser.decorator';
import { ParserKind } from './langchain/enums/parser.enums';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor() { }

  // 4️⃣ Create a chain: prompt → model → parser
  @Chain({
    name: 'tempChain',
    model: {
      name: 'openaiChat',
      provider: Provider.OpenAI,
      kind: ModelKind.Chat,
      model: 'gpt-4o',
    },
    prompt: {
      name: 'summaryPrompt',
      kind: PromptKind.PromptTemplate,
      template: 'Provide me All the complete information of this player inning age total worth in json format:\n{text}',
    }

  })
  chain!: any;



  async getHello(text: string) {
    this.logger.log('getHello called');

    try {
      const result = await this.chain.invoke({ text });
      return result;
    } catch (error: any) {
      this.logger.error('getHello failed', error.stack, 'getHello');
      throw error; // optional: or return a fallback response
    }
  }
}
