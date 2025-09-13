/* eslint-disable */
export interface AgentConfig {
  name?: string;
  modelRef: string;
  toolRefs: string[];
  responseFormat?: any; // optional zod schema for structured output
}

export interface IAgent<T = any> {
  create(config: AgentConfig, instance: any): T;
}
