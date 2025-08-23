import { Injectable } from '@nestjs/common';
import { LC } from '../decorators/lc.decorator';
import {
  Provider,
  ModelKind,
  PromptKind,
  ParserKind,
} from '../enums/lc.enums';
import { z } from 'zod';

@Injectable()
export class SummaryChain {
  @LC.Model({
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
    temperature: 0.3,
  })
  chatModel!: any;

  @LC.Prompt({
    kind: PromptKind.Chat,
    template: 'Summarize the following text and return the result as JSON with this exact format: {{"summary": "your summary here", "keywords": ["keyword1", "keyword2", "keyword3"]}}\n\nText to summarize:\n{text}\n\nJSON Response:',
  })
  summaryPrompt!: any;

  @LC.Parser({
    kind: ParserKind.Structured,
    zodFactory: () =>
      z.object({
        summary: z.string(),
        keywords: z.array(z.string()).min(1).max(5),
      }),
  })
  outputParser!: any;

  @LC.Chain({
    modelKey: 'chatModel',
    promptKey: 'summaryPrompt',
    parserKey: 'outputParser',
  })
  chain!: any;

  async summarize(text: string) {
    return await this.chain.invoke({ text });
  }
}
