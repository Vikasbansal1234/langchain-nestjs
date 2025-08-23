import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { LC } from '../decorators/lc.decorator';
import { Provider, ModelKind } from '../enums/lc.enums';
import { JokeOutput } from './schemas/joke.schema';

@Injectable()
export class JokeJsonOutputParserService {
  @LC.Model({
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
    temperature: 0.3,
  })
  llm!: any;

  async tellJoke(topic: string): Promise<JokeOutput> {
    const parser = new JsonOutputParser<JokeOutput>();
    const format = parser.getFormatInstructions();

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You ONLY reply with valid JSON.'],
      ['human', `Tell a joke about {topic} as JSON with "setup" and "punchline".\n${format}`],
    ]);

    const chain = prompt.pipe(this.llm).pipe(parser);
    return chain.invoke({ topic });
  }
}
