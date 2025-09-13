/* eslint-disable */
import 'reflect-metadata';
import { GRAPH_METADATA_KEY } from '../constants';

export interface GraphConfig {
  name: string;
}

type GraphMeta = { propertyKey: string | symbol; config: GraphConfig };

export function Graph(config: GraphConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(
      GRAPH_METADATA_KEY,
      { propertyKey, config } as GraphMeta,
      (target as any).constructor,
    );
  };
}
