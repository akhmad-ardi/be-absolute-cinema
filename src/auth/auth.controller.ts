import { Controller, Post, Body, Response } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { ValidationService } from '../common/validation.service';
import {
  registerValidate,
  RegisterType,
  LoginType,
  loginValidate,
} from './auth.validation';
import { AuthService } from './auth.service';
import { LoginSchema, RegisterSchema } from './auth.swagger';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
  ) {}

  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBody({ type: RegisterSchema })
  @Post('/register')
  public async register(@Body() body: RegisterType, @Response() response: Res) {
    const validatedData = this.validationService.validate(
      registerValidate,
      body,
    );

    const registerService = await this.authService.register(validatedData);

    return response.status(201).json(registerService);
  }

  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBody({ type: LoginSchema })
  @Post('/login')
  public async login(@Body() body: LoginType, @Response() response: Res) {
    const validatedData = this.validationService.validate(loginValidate, body);

    const loginService = await this.authService.login(validatedData);

    return response.status(200).json(loginService);
  }
}
