import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (_data: void, req: Request) => req.user
);
