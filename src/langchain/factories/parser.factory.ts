/* eslint-disable */
import { ParserKind } from '../enums/parser.enums';
import { IParser, ParserConfig } from '../interfaces/parser.interface';

const registry: Map<ParserKind, IParser> = new Map([
]);

export class ParserFactory {
  static create<T>(config: ParserConfig): T {
    const impl = registry.get(config.kind);
    if (!impl) {
      throw new Error(`No parser implementation for kind: ${config.kind}`);
    }
    return impl.create(config) as T;
  }
}
