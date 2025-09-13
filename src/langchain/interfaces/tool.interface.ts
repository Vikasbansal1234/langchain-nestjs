/* eslint-disable */
export interface ToolConfig {
  name: string;
  description: string;
  schema?: any; // zod schema for tool inputs
}

export interface ITool<T = any> {
  create(config: ToolConfig & { method: Function }): T;
}
