import { Provider, ModelKind } from '../enums/lc.enums';

export interface ModelConfig {
  provider: Provider;
  kind: ModelKind;
  model: string;
  temperature?: number;
  apiKey?: string;
  apiVersion?: string;
  instanceName?: string;
  deploymentName?: string;
  baseUrl?: string;
}

export interface IModel<T = any> {
  create(config: ModelConfig): T;
}
