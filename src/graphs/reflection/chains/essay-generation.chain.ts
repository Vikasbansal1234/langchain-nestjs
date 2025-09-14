/* eslint-disable */
import { Injectable } from '@nestjs/common';
import type { Runnable } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { MessagesPlaceholder } from '@langchain/core/prompts';
import { Prompt } from 'src/langchain/decorators/prompt.decorator';
import { Chain } from 'src/langchain/decorators/chain.decorator';
import { Model } from 'src/langchain/decorators/model.decorator';
import { Provider, ModelKind } from 'src/langchain/enums/model.enums';
import { PromptKind } from 'src/langchain/enums/prompt.enums';
import { BaseRunnableChain } from 'src/langchain/interfaces/base-runnable.chain';

/**
 * Input  ->  { input: string; messages: BaseMessage[] }
 * Output ->  AI essay string
 */
@Injectable()
export class EssayGenerationChain extends BaseRunnableChain<
  {messages: any[] },
  string
> {
  // 1️⃣ Prompt: multi-message chat prompt
  @Prompt({
    name: 'essayPrompt',
    kind: PromptKind.ChatPromptTemplate,
    messages: [
      {
        role: 'system',
        template: `You are an essay assistant tasked with writing excellent 5-paragraph essays.
                   Generate the best essay possible for the user's request.
                   If the user provides critique, respond with a revised version of your previous attempts.`,
      },
      new MessagesPlaceholder('messages')
    ],
  })
  essayPrompt!: Runnable<{ messages: any[] }, string>;

  // 2️⃣ Model
  @Model({
    name: 'openaiEssayModel',
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',          // or any compatible chat model
    temperature: 0 ,
  })
  chatModel!: Runnable<string, string>;

  // 3️⃣ Chain: prompt → model
  @Chain({
    name: 'essayGenerationChain',
    modelRef: 'chatModel',
    promptRef: 'essayPrompt',
  })
  private readonly decoratedChain!: Runnable<
    { messages: any[] },
    string
  >;

  /** Expose to BaseRunnableChain */
  protected get chain(): Runnable<{ input: string; messages: any[] }, string> {
    return this.decoratedChain;
  }
}
