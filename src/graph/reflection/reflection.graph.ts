/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { END, START, MemorySaver, Annotation } from '@langchain/langgraph';
import { BaseMessage, AIMessage, HumanMessage } from '@langchain/core/messages';
import { EssayGenerationChain } from './chains/essay-generation.chain';
import { ReflectionChain } from './chains/reflection.chain';
import { GraphEdge } from 'src/langchain/decorators/lcgraph.edge.decorator';
import { GraphNode } from 'src/langchain/decorators/lcgraph.node.decorator';
import { GraphState } from 'src/langchain/decorators/lcgraph.state.decorator';

/**
 * Reflection Graph
 * ----------------
 * 1️⃣ Generate an essay
 * 2️⃣ Critique it
 * 3️⃣ Loop until stop condition
 */
@Injectable()
export class ReflectionGraph {
  constructor(
    private readonly generator: EssayGenerationChain,
    private readonly reflector: ReflectionChain,
  ) {}

  /**
   * Shared graph state – all messages from every step.
   * Reducer concatenates new messages each run.
   */
  @GraphState({
    name: 'state',
    schema: () =>
      Annotation.Root({
        messages: Annotation<BaseMessage[]>({
          reducer: (prev, next) => prev.concat(next),
        }),
      }),
  })
  state!: any;

  // ➡️ 1. Essay generation node
  @GraphNode({ name: 'generate', sources: [START] })
  async generateNode(state: any) {
    const { messages } = state;
    const essayMsg = await this.generator.invoke({ messages });
    return { messages: [essayMsg] };
  }

  // ➡️ 2. Reflection / critique node
  @GraphNode({ name: 'reflect', sources: ['generate'] })
  async reflectNode(state: any) {
    const { messages } = state;

    // Reverse speaker roles for critique (AI ↔ Human)
    const swapMap: Record<string, new (content: string) => BaseMessage> = {
      ai: HumanMessage,
      human: AIMessage,
    };
    const translated = [
      messages[0],
      ...messages
        .slice(1)
        .map((m) => new swapMap[m._getType()](m.content.toString())),
    ];

    const critique = await this.reflector.invoke({ messages: translated });
    // Treat critique as new Human feedback for next generation
    return { messages: [new HumanMessage({ content: critique })] };
  }

  // ➡️ 3. Conditional edge – decide next step
  // Decorator lets discovery service register this as a branching function
  @GraphEdge({ from: 'generate' })
  shouldContinue(state: any) {
    const { messages } = state;
    // Stop after 3 generate/reflect iterations (≈6 messages)
    return messages.length > 6 ? END : 'reflect';
  }
}
