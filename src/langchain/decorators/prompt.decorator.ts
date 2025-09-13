/* eslint-disable */
// src/langchain/decorators/prompt.decorator.ts
import 'reflect-metadata';
import { PROMPT_METADATA_KEY } from '../constants';
import { PromptConfig } from '../interfaces/prompt.interface';

/**
 * Type of the metadata stored by this decorator.
 */
type PromptMeta = { propertyKey: string | symbol; config: PromptConfig };

/**
 * Register a LangChain Prompt on a class property.
 * Discovery services will instantiate the prompt via PromptFactory.
 */
export function Prompt(config: PromptConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    // Explicitly cast the metadata to our known type
    const existing =
      (Reflect.getOwnMetadata(
        PROMPT_METADATA_KEY,
        (target as any).constructor,
      ) as PromptMeta[] | undefined) ?? [];

    const updated: PromptMeta[] = [...existing, { propertyKey, config }];

    Reflect.defineMetadata(
      PROMPT_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
