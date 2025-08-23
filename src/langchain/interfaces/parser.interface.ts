import { ParserKind } from '../enums/lc.enums';

export interface ParserConfig {
  kind: ParserKind;
  zodFactory: () => any;
}

export interface IParser<T = any> {
  create(config: ParserConfig): T;
}
