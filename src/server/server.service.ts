import { Injectable } from '@nestjs/common';

@Injectable()
export class AppServerService {
  getHello() {
    return 'Hello world!';
  }
}
