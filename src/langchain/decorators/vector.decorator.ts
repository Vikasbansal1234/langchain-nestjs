/* eslint-disable */
import 'reflect-metadata';
import { VECTOR_STORE_METADATA_KEY } from '../constants';
import { VectorStoreConfig } from '../interfaces/vector.interface';

type VectorMeta = { propertyKey: string | symbol; config: VectorStoreConfig };

export function VectorStore(config: VectorStoreConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existing =
      (Reflect.getOwnMetadata(
        VECTOR_STORE_METADATA_KEY,
        (target as any).constructor,
      ) as VectorMeta[] | undefined) ?? [];

    const updated: VectorMeta[] = [...existing, { propertyKey, config }];

    Reflect.defineMetadata(
      VECTOR_STORE_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
