# LangChain-NestJS Decorator Framework

This project demonstrates a **modular, metadata-driven** integration of  
[LangChainJS](https://js.langchain.com) and [LangGraph](https://github.com/langchain-ai/langgraph)  
inside a **NestJS** application.

All LangChain components (Prompt, Model, Parser, Chain, VectorStore, Retriever, Tool, Agent, Graph)
are defined via **TypeScript decorators** and automatically **discovered and instantiated** at runtime.

---

## ⚡ Quick Start

```bash
npm install
npm run start:dev
Make sure you export any required API keys (e.g. OPENAI_API_KEY)
and run with Node.js 20+.

🏗️ Example: Full Service Using Multiple Decorators
code
// src/app.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { Prompt } from './langchain/decorators/prompt.decorator';
import { Model } from './langchain/decorators/model.decorator';
import { Parser } from './langchain/decorators/parser.decorator';
import { Chain } from './langchain/decorators/chain.decorator';
import { Tool } from './langchain/decorators/tool.decorator';
import { Agent } from './langchain/decorators/agent.decorator';
import { Provider, ModelKind } from './langchain/enums/model.enums';
import { PromptKind } from './langchain/enums/prompt.enums';
import { ParserKind } from './langchain/enums/parser.enums';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // 1️⃣ Prompt
  @Prompt({
    name: 'summaryPrompt',
    kind: PromptKind.PromptTemplate,
    template: 'Summarize the following text:\n{text}',
  })
  summaryPrompt!: any;

  // 2️⃣ Model
  @Model({
    name: 'openaiChat',
    provider: Provider.OpenAI,
    kind: ModelKind.Chat,
    model: 'gpt-4o',
  })
  chatModel!: any;

  // 3️⃣ Parser
  @Parser({
    name: 'stringParser',
    kind: ParserKind.String,
  })
  stringParser!: any;

  // 4️⃣ Chain (Prompt → Model → Parser)
  @Chain({
    name: 'summaryChain',
    promptRef: 'summaryPrompt',
    modelRef: 'chatModel',
    parserRef: 'stringParser',
  })
  summaryChain!: any;

  // 5️⃣ Tool
  @Tool({
    name: 'get_weather',
    description: 'Return fake weather for a city',
    schema: z.object({ city: z.string() }),
  })
  async getWeather({ city }: { city: string }) {
    return `It is always sunny in ${city}!`;
  }

  // 6️⃣ Agent (ReAct with model + tool)
  @Agent({
    name: 'weatherAgent',
    modelRef: 'chatModel',
    toolRefs: ['getWeather'],
    responseFormat: z.object({ forecast: z.string() }),
  })
  weatherAgent!: any;

  async summarize(text: string) {
    return this.summaryChain.invoke({ text });
  }

  async forecast(city: string) {
    const result = await this.weatherAgent.invoke({
      messages: [{ role: 'user', content: `Weather in ${city}?` }],
    });
    return result.structuredResponse;
  }
}
💾 Vector Store Example
code
// src/langchain/examples/vector-example.service.ts
import { Injectable } from '@nestjs/common';
import { VectorStore } from '../decorators/vector.decorator';
import { VectorStoreKind } from '../enums/vector.enums';
import { Model } from '../decorators/model.decorator';
import { Provider, ModelKind } from '../enums/model.enums';

@Injectable()
export class VectorExampleService {
  // OpenAI embeddings
  @Model({
    name: 'openaiEmbeddings',
    provider: Provider.OpenAI,
    kind: ModelKind.Embeddings,
    model: 'text-embedding-3-large',
  })
  embeddings!: any;

  // Redis vector store
  @VectorStore({
    name: 'redisStore',
    kind: VectorStoreKind.Redis,
    indexName: 'langchain-index',
    embeddingsRef: 'embeddings',
    clientRef: 'redisClient',
  })
  redisVector!: any;

  async addSample() {
    await this.redisVector.addDocuments([
      { pageContent: 'Apple is a red fruit.', metadata: { category: 'fruit' } },
    ]);
    return 'Document added!';
  }

  async search(query: string) {
    return this.redisVector.similaritySearch(query, 2);
  }
}
🌐 Graph Example
code
// src/langchain/examples/greeting.graph.ts
import { Injectable } from '@nestjs/common';
import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import { Annotation, START } from '@langchain/langgraph';
import { GraphState } from '../decorators/lcgraph.state.decorator';
import { GraphNode } from '../decorators/lcgraph.node.decorator';
import { GraphEdge } from '../decorators/lcgraph.edge.decorator';
import { GraphDecorator as Graph } from '../decorators/lcgraph.graph.decorator';

@Injectable()
export class GreetingGraphService {
  @GraphState({
    name: 'greetingState',
    schema: () =>
      Annotation.Root({
        messages: Annotation<BaseMessage[]>({
          reducer: (x, y) => x.concat(y),
          default: () => [],
        }),
        userName: Annotation<string>({
          reducer: (x, y) => y ?? x,
          default: () => 'Anonymous',
        }),
      }),
  })
  state!: any;

  @GraphNode({ name: 'Greeter', sources: [START] })
  async greeter(state: any) {
    return { messages: [new HumanMessage({ content: `Hello, ${state.userName}!` })] };
  }

  @GraphNode({ name: 'Finalizer', sources: ['Greeter'] })
  async finalizer(state: any) {
    return { messages: [new HumanMessage({ content: `Goodbye, ${state.userName}!` })] };
  }

  @GraphEdge({
    from: 'Greeter',
    router: () => 'Finalizer',
    mapping: { Finalizer: 'Finalizer' },
  })
  conditional!: any;

  @Graph({ name: 'greetingGraph' })
  graph!: any;
}

import { MessagesPlaceholder } from '@langchain/core/prompts';

@Prompt({
  name: 'multiMessagePrompt',
  kind: PromptKind.ChatPromptTemplate,
  messages: [
    { role: 'system', template: 'You are a sarcastic critic.' },
    new MessagesPlaceholder('history'),
    { role: 'human', template: 'Critique: {topic}' },
  ],
})
multiMessagePrompt!: ChatPromptTemplate;

@Prompt({
  name: 'singleTemplatePrompt',
  kind: PromptKind.ChatPromptTemplate,
  template: 'You are a witty assistant. Respond to: {question}',
})
singleTemplatePrompt!: ChatPromptTemplate;
