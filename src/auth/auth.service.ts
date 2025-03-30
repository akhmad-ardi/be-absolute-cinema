import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginType, RegisterType } from './auth.validation';
import { PrismaService } from '../common/prisma.service';
import { BcryptService } from '../common/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  public async register(data: RegisterType) {
    const userAlreadyExist = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });
    if (userAlreadyExist) {
      throw new BadRequestException('User already exist');
    }

    data.password = await this.bcryptService.hashPassword(data.password);

    const user = await this.prismaService.user.create({ data });

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { access_token: token };
  }

  public async login(data: LoginType) {
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comparePassword = await this.bcryptService.comparePassword(
      data.password,
      user.password,
    );
    if (!comparePassword) {
      throw new BadRequestException('Email or password is invalid');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { access_token: token };
  }
}
