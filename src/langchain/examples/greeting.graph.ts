/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { BaseMessage, HumanMessage } from '@langchain/core/messages';
import { Annotation, START } from '@langchain/langgraph';
import { GraphEdge } from '../decorators/lcgraph.edge.decorator';
import { GraphNode } from '../decorators/lcgraph.node.decorator';
import { GraphState } from '../decorators/lcgraph.state.decorator';
import { GraphDecorator as Graph } from '../decorators/lcgraph.graph.decorator';


/**
 * Simple Greeting Graph Example
 *
 * Flow:
 * START → Greeter → Finalizer → END
 */
@Injectable()
export class GreetingGraphService {
  // 1️⃣ Define the state
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

  // 2️⃣ First node: Greeter
  @GraphNode({ name: 'Greeter', sources: [START] })
  async greeterNode(state: any) {
    const greeting = `Hello, ${state.userName}!`;
    return {
      messages: [new HumanMessage({ content: greeting })],
    };
  }

  // 3️⃣ Second node: Finalizer
  @GraphNode({ name: 'Finalizer', sources: ['Greeter'] })
  async finalizerNode(state: any) {
    const final = `Graph finished. Last message: ${state.messages.at(-1)?.content}`;
    return {
      messages: [new HumanMessage({ content: final })],
    };
  }

  // 5️⃣ Attach graph
  @Graph({ name: 'greetingGraph' })
  graph!: any;
}
