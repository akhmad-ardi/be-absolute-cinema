/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    const token = authHeader?.split(' ')[1];

    if (!authHeader || !token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const { id, email } = this.jwtService.verify(token);

      request.body = { email, user_id: id, ...request.body };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
