/* eslint-disable */
import 'reflect-metadata';
import { MODEL_METADATA_KEY } from '../constants';
import { ModelConfig } from '../interfaces/model.interface';

/**
 * Configuration object used by the @Model decorator.
 * Mirrors the previous ModelConfig interface but is now defined inline.
 */

/**
 * Metadata entry stored by the decorator.
 */
type ModelMeta = { propertyKey: string | symbol; config: ModelConfig };

/**
 * Register a LangChain Model on a class property.
 * Discovery services will instantiate the model via ModelFactory.
 */
export function Model(config: ModelConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existing =
      (Reflect.getOwnMetadata(
        MODEL_METADATA_KEY,
        (target as any).constructor,
      ) as ModelMeta[] | undefined) ?? [];

    const updated: ModelMeta[] = [...existing, { propertyKey, config }];

    Reflect.defineMetadata(
      MODEL_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
