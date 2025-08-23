import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JsonOutputToolsParser } from "@langchain/core/output_parsers/openai_tools";
import { LC } from '../decorators/lc.decorator';
import { Provider, ModelKind } from '../enums/lc.enums';
import { createJokeTool, JokeOutput } from './schemas/joke.schema';

// Tool definition using shared schema
const jokeTool = createJokeTool();

export interface JokeToolOutput {
  type: string;
  args: JokeOutput;
}

@Injectable()
export class JokeJsonOutputToolsParserService {
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
      tool_choice: jokeTool, // force it to call our "joke" tool
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a hilarious comedian.'],
      ['human', 'Tell me a joke about {topic}'],
    ]);

    const chain = prompt.pipe(llmWithTools).pipe(new JsonOutputToolsParser());
    return chain.invoke({ topic });
  }
}
