/* eslint-disable */
// src/langchain/factories/agent.factory.ts
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { AgentConfig } from '../interfaces/agent.interface';

export class AgentFactory {
  static create<T>(config: AgentConfig, instance: any): T {
    const model = instance[config.modelRef];  // 👈 use the model that is already attached
    if (!model) throw new Error(`Model '${config.modelRef}' not found on instance`);

    const tools = (config.toolRefs || []).map(ref => {
      const tool = instance[ref];
      if (!tool) throw new Error(`Tool '${ref}' not found on instance`);
      return tool;
    });

    return createReactAgent({
      llm: model,
      tools,
      responseFormat: config.responseFormat,
    }) as T;
  }
}
