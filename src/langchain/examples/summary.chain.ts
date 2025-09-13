/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { Chain } from '../decorators/chain.decorator';
import { Model } from '../decorators/model.decorator';
import { Prompt } from '../decorators/prompt.decorator';
import { Provider, ModelKind } from '../enums/model.enums';
import { PromptKind } from '../enums/prompt.enums';

@Injectable()
export class SummaryChain {
  // 1️⃣ Register a prompt
  @Prompt({
    name: 'summaryPrompt',
    kind: PromptKind.PromptTemplate,
    template: 'Summarize the following text in one sentence:\n{text}',
  })
  summaryPrompt!: any;

  // 2️⃣ Register a model
  @Model({
    name: 'openaiChat',
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
  })
  chatModel!: any;



  // 4️⃣ Create a chain: prompt → model → parser
  @Chain({
    name: 'summaryChain',
    modelRef: 'chatModel',
    promptRef: 'summaryPrompt',
  })
  chain!: any;

  async run(text: string) {
    // The chain behaves like a Runnable
    return this.chain.invoke({ text });
  }
}
