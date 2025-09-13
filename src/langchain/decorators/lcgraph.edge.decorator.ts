/* eslint-disable */
import 'reflect-metadata';
import { EDGE_METADATA_KEY } from '../constants';

export interface EdgeConfig {
  from: string;
  router: (state: any) => string;
  mapping: Record<string, string>;
}

type EdgeMeta = { config: EdgeConfig; method: Function };

export function GraphEdge(config: EdgeConfig): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const existing =
      (Reflect.getOwnMetadata(
        EDGE_METADATA_KEY,
        (target as any).constructor,
      ) as EdgeMeta[] | undefined) ?? [];

    const updated: EdgeMeta[] = [
      ...existing,
      { config, method: descriptor.value },
    ];

    Reflect.defineMetadata(
      EDGE_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
