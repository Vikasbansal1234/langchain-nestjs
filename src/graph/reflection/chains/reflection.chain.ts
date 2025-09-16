/* eslint-disable */
import { Injectable } from '@nestjs/common';
import type { Runnable } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { MessagesPlaceholder } from '@langchain/core/prompts';

import { Chain } from 'src/langchain/decorators/chain.decorator';
import { Model } from 'src/langchain/decorators/model.decorator';
import { Provider, ModelKind } from 'src/langchain/enums/model.enums';
import { PromptKind } from 'src/langchain/enums/prompt.enums';
import { BaseRunnableChain } from 'src/langchain/interfaces/base-runnable.chain';
import { Prompt } from 'src/langchain/decorators/prompt.decorator';


/**
 * Input  ->  { input: string; messages: BaseMessage[] }
 *   - input: The essay text to critique
 *   - messages: Conversation history (includes original request + essay)
 *
 * Output ->  Teacher-style critique string
 */
@Injectable()
export class ReflectionChain extends BaseRunnableChain<{messages: any[] },
  string
> {
  // 1️⃣ Prompt: reflection critique prompt
  @Prompt({
    name: 'reflectionPrompt',
    kind: PromptKind.ChatPromptTemplate,
    messages: [
      {
        role: 'system',
        template: `You are a teacher grading an essay submission.
                   Generate critique and recommendations for the user's submission.
                   Provide detailed recommendations, including requests for length, depth, style, etc.`,
      },
      new MessagesPlaceholder('messages'),
    ],
  })
  reflectionPrompt!: Runnable<{messages: any[] }, string>;

  // 2️⃣ Model
  @Model({
    name: 'openaiReflectionModel',
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
    temperature: 0 ,
  })
  chatModel!: Runnable<string, string>;

  // 3️⃣ Chain: prompt → model
  @Chain({
    name: 'essayReflectionChain',
    modelRef: 'chatModel',
    promptRef: 'reflectionPrompt',
  })
  private readonly decoratedChain!: Runnable<
    { messages: any[] },
    string
  >;

  /** Expose to BaseRunnableChain */
  protected get chain(): Runnable<{ messages: any[] }, string> {
    return this.decoratedChain;
  }
}
