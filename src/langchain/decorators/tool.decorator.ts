/* eslint-disable */
import 'reflect-metadata';
import { TOOL_METADATA_KEY } from '../constants';

export interface ToolConfig {
  name: string;
  description: string;
  schema: any; // usually a Zod schema
}

type ToolMeta = {
  propertyKey: string | symbol;
  config: ToolConfig;
  method: Function;
};

/**
 * Register a LangChain Tool on a class **method**.
 */
export function Tool(config: ToolConfig): MethodDecorator {
  return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const existing =
      (Reflect.getOwnMetadata(
        TOOL_METADATA_KEY,
        (target as any).constructor,
      ) as ToolMeta[] | undefined) ?? [];

    const updated: ToolMeta[] = [
      ...existing,
      { propertyKey, config, method: descriptor.value },
    ];

    Reflect.defineMetadata(
      TOOL_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
