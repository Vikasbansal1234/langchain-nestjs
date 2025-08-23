export interface ChainConfig {
  modelKey: string;   // e.g. 'model'
  promptKey: string;  // e.g. 'prompt'
  parserKey: string;  // e.g. 'parser'
}

export interface IChain<T = any> {
  create(config: ChainConfig, instance: any): T;
}
