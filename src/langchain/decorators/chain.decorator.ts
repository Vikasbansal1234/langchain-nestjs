/* eslint-disable */
import 'reflect-metadata';
import { ChainConfig } from '../interfaces/chain.interface';
import { CHAIN_METADATA_KEY } from '../constants';

type ChainMeta = { propertyKey: string | symbol; config: ChainConfig };

/**
 * Register a LangChain pipeline on a class property.
 * The discovery service will compose prompt → model → (parser) as a single chain.
 */
export function Chain(config: ChainConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existing =
      (Reflect.getOwnMetadata(
        CHAIN_METADATA_KEY,
        (target as any).constructor,
      ) as ChainMeta[] | undefined) ?? [];

    const updated: ChainMeta[] = [...existing, { propertyKey, config }];

    Reflect.defineMetadata(
      CHAIN_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
