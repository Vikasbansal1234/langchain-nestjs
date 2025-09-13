/* eslint-disable */
import 'reflect-metadata';
import { NODE_METADATA_KEY } from '../constants';

export interface NodeConfig {
  name: string;
  sources?: string[];
  targets?: string[];
}

type NodeMeta = {
  propertyKey: string | symbol;
  config: NodeConfig;
  method: Function;
};

export function GraphNode(config: NodeConfig): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const existing =
      (Reflect.getOwnMetadata(
        NODE_METADATA_KEY,
        (target as any).constructor,
      ) as NodeMeta[] | undefined) ?? [];

    const updated: NodeMeta[] = [
      ...existing,
      { propertyKey, config, method: descriptor.value },
    ];

    Reflect.defineMetadata(
      NODE_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
