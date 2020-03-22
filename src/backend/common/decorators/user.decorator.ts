import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (_data: void, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request.user;
  }
);
