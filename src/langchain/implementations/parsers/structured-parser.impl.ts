import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { IParser, ParserConfig } from '../../interfaces/parser.interface';

export class StructuredParserImpl implements IParser<StructuredOutputParser<any>> {
  create(config: ParserConfig): StructuredOutputParser<any> {
    const zodSchema = config.zodFactory();
    return StructuredOutputParser.fromZodSchema(zodSchema);
  }
}
