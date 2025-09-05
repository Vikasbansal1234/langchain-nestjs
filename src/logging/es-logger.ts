import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

export function createEsWinstonLogger() {
  const esTransport = new ElasticsearchTransport({
    level: 'info',
    indexPrefix: 'myapp-logs',
    clientOpts: {
      node: 'http://localhost:9200', // Elastic instance
      auth: {
        username: 'elastic',
        password: 'changeme',
      },
    },
  });

  const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });

  return winston.createLogger({
    level: 'info',
    transports: [consoleTransport, esTransport],
  });
}
