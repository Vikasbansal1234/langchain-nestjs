/* eslint-disable */
import 'reflect-metadata';
import { RETRIEVER_METADATA_KEY } from '../constants';
import { RetrieverConfig } from '../interfaces/retriever.interface';

type RetrieverMeta = { propertyKey: string | symbol; config: RetrieverConfig };

export function Retriever(config: RetrieverConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existing =
      (Reflect.getOwnMetadata(
        RETRIEVER_METADATA_KEY,
        (target as any).constructor,
      ) as RetrieverMeta[] | undefined) ?? [];

    const updated: RetrieverMeta[] = [...existing, { propertyKey, config }];

    Reflect.defineMetadata(
      RETRIEVER_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
