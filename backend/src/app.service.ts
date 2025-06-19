import { Injectable } from '@nestjs/common';
import { BaseService } from '@simply-direct/common';

@Injectable()
export class AppService extends BaseService {
  getHello(): string {
    return 'Hello World!';
  }
}
