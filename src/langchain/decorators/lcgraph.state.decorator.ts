/* eslint-disable */
import 'reflect-metadata';
import { STATE_METADATA_KEY } from '../constants';

export interface GraphStateConfig {
  name: string;
  schema: () => any;
}

type GraphStateMeta = { propertyKey: string | symbol; config: GraphStateConfig };

export function GraphState(config: GraphStateConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(
      STATE_METADATA_KEY,
      { propertyKey, config } as GraphStateMeta,
      (target as any).constructor,
    );
  };
}
