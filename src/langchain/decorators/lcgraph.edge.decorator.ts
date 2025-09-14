/* eslint-disable */
import 'reflect-metadata';
import { EDGE_METADATA_KEY } from '../constants';

export interface EdgeConfig {
  from: string;
}

type EdgeMeta = { config: EdgeConfig; method: Function };

export function GraphEdge(config: EdgeConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const existing =
      (Reflect.getOwnMetadata(EDGE_METADATA_KEY, target.constructor) as any[]) ?? [];
    existing.push({ propertyKey, config });
    Reflect.defineMetadata(EDGE_METADATA_KEY, existing, target.constructor);
  };
}