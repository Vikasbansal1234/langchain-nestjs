/* eslint-disable */
import 'reflect-metadata';
import { PARSER_METADATA_KEY } from '../constants';
import { ParserConfig } from '../interfaces/parser.interface';

type ParserMeta = { propertyKey: string | symbol; config: ParserConfig };

export function Parser(config: ParserConfig): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existing =
      (Reflect.getOwnMetadata(
        PARSER_METADATA_KEY,
        (target as any).constructor,
      ) as ParserMeta[] | undefined) ?? [];

    const updated: ParserMeta[] = [...existing, { propertyKey, config }];

    Reflect.defineMetadata(
      PARSER_METADATA_KEY,
      updated,
      (target as any).constructor,
    );
  };
}
