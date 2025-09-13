/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { Prompt } from '../decorators/prompt.decorator';
import { Model } from '../decorators/model.decorator';
import { PromptKind } from '../enums/prompt.enums';
import { Provider, ModelKind } from '../enums/model.enums';

/**
 * This service declares both a Prompt and a Model.
 * The decorators only store metadata; the actual objects
 * are created by their DiscoveryServices at runtime.
 */
@Injectable()
export class TranslationService {

  @Prompt({
    name: 'translatePrompt',
    kind: PromptKind.PromptTemplate,
    template: 'Translate the following sentence to French: {sentence}',
  })
  translatePrompt!: any; // will be PromptTemplate after discovery


  @Model({
    name: 'openaiChat',
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
    temperature: 0.5,
  })
  openaiModel!: any; // will be ChatOpenAI after discovery


  async translate(sentence: string): Promise<string> {
    // Call the OpenAI chat model with the formatted prompt
    const response = await this.translatePrompt.pipe(this.openaiModel).invoke({sentence});
    return response;
  }
}
