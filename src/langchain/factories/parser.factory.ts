import { ParserKind } from '../enums/lc.enums';
import { ParserConfig, IParser } from '../interfaces/parser.interface';

// Implementations
import { StructuredParserImpl } from '../implementations/parsers/structured-parser.impl';

export class ParserFactory {
  private static readonly registry = new Map<ParserKind, IParser>([
    [ParserKind.Structured, new StructuredParserImpl()],
  ]);

  static create<T>(config: ParserConfig): T {
    const impl = ParserFactory.registry.get(config.kind);
    if (!impl) throw new Error(`No parser found for ${config.kind}`);
    return impl.create(config);
  }
}
