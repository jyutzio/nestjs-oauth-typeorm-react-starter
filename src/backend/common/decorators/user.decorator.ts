import { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: void, req: Request) => req.user
);
