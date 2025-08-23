import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';

import { LC } from '../decorators/lc.decorator';
import { Provider, ModelKind } from '../enums/lc.enums';
import { createJokeTool, JokeOutput } from './schemas/joke.schema';
import { JsonOutputKeyToolsParser } from '@langchain/core/output_parsers/openai_tools';

// Tool definition using shared schema
const jokeTool = createJokeTool();

export type JokeKeyOutput = JokeOutput;

@Injectable()
export class JokeJsonKeyOutputToolsParserService {
  @LC.Model({
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
    temperature: 0.3,
  })
  llm!: any;

  async tellJoke(topic: string): Promise<any> {
    const llmWithTools = this.llm.bind({
      tools: [jokeTool],
      tool_choice: jokeTool,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a hilarious comedian.'],
      ['human', 'Tell me a joke about {topic}'],
    ]);

    const keyParser = new JsonOutputKeyToolsParser({
      keyName: 'joke', // matches the tool args key
      returnSingle: true,
    });

    const chain = prompt.pipe(llmWithTools).pipe(keyParser);
    return chain.invoke({ topic });
  }
}
