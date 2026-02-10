import { Injectable } from "@nestjs/common";
import { NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request & { context?: any }, res: Response, next: NextFunction) {
        req.context = {
            request_id: randomUUID(),
            client_ip:
                (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                req.ip ||
                req.socket.remoteAddress,
            user_agent: req.headers['user-agent'],
        };

        next();
    }
}
