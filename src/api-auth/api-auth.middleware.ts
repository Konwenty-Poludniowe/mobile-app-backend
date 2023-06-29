import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiAuthMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}
  use(req: Request, res: any, next: () => void) {
    const recievedApiKey = req.header('x-api-key');
    if (!recievedApiKey || recievedApiKey !== this.config.get('API_KEY')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  }
}
