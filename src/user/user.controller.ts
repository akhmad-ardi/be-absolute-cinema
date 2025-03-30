/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, UseGuards, Request, Response } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request as Req, Response as Res } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  public async getUser(@Request() request: Req, @Response() response: Res) {
    const email = request.body.email! as string;

    const getUserService = await this.userService.getUser({ email });

    return response.status(200).json(getUserService);
  }
}
