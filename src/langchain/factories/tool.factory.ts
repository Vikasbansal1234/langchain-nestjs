/* eslint-disable */
// src/langchain/factories/tool.factory.ts
import { tool } from '@langchain/core/tools';
import { ToolConfig } from '../interfaces/tool.interface';

export class ToolFactory {
  static create(config: ToolConfig & { method: Function }) {
    // Wrap the user method in an async RunnableFunc
    const runnable = async (input: unknown) => {
      // Zod will validate 'input' automatically if schema is provided
      return config.method(input);
    };

    return tool(runnable, {
      name: config.name,
      description: config.description,
      schema: config.schema,  // e.g. z.object(...)
    });
  }
}
