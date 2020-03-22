import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyLogger } from '../../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly myLogger: MyLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const user = request.user.username ?? request.ip;
    const controller = context.getClass().name;

    this.myLogger.log(
      `(User: ${user}) ${request.method} ${request.path}`,
      controller
    );

    return next.handle();
  }
}
