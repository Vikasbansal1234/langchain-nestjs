/* eslint-disable */
import { StringOutputParser } from '@langchain/core/output_parsers';
import { IParser, ParserConfig } from '../../interfaces/parser.interface';

/**
 * Parser that returns the raw string output from the model.
 * Useful when you just want plain text without any structure.
 */
export class StringOutputParserImpl implements IParser<StringOutputParser> {
  create(_config: ParserConfig): StringOutputParser {
    // No config needed—StringOutputParser has no required constructor args.
    return new StringOutputParser();
  }
}
