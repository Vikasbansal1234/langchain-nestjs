/* eslint-disable */
import { Injectable } from '@nestjs/common';
import type { Runnable } from '@langchain/core/runnables';
import { Chain } from '../decorators/chain.decorator';
import { Model } from '../decorators/model.decorator';
import { Prompt } from '../decorators/prompt.decorator';
import { Provider, ModelKind } from '../enums/model.enums';
import { PromptKind } from '../enums/prompt.enums';
import { BaseRunnableChain } from '../interfaces/base-runnable.chain';

/**
 * Input  -> { text: string }
 * Output -> string
 */
@Injectable()
export class SummaryChain
  extends BaseRunnableChain<{ text: string }, string>
{
  // 1️⃣ Prompt
  @Prompt({
    name: 'summaryPrompt',
    kind: PromptKind.PromptTemplate,
    template: 'Summarize the following text in one sentence:\n{text}',
  })
  summaryPrompt!: Runnable<{ text: string }, string>;

  // 2️⃣ Model
  @Model({
    name: 'openaiChat',
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
  })
  chatModel!: Runnable<string, string>;

  // 3️⃣ Chain: prompt → model
  @Chain({
    name: 'summaryChain',
    modelRef: 'chatModel',
    promptRef: 'summaryPrompt',
  })
  private readonly decoratedChain!: Runnable<{ text: string }, string>;

  /** Expose the decorated chain to BaseRunnableChain */
  protected get chain(): Runnable<{ text: string }, string> {
    return this.decoratedChain;
  }
}
