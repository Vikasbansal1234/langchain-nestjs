import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor() {}

  getHello(): string {
    this.logger.log('getHello called');

    try {
      // Simulate error for testing logs
      throw new Error('💥 Simulated error from getHello');
    } catch (error: any) {
      this.logger.error('getHello failed', error.stack, 'getHello');
      throw error; // optional: or return a fallback response
    }
  }
}
