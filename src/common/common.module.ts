/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { BcryptService } from './bcrypt.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET_KEY'), // Ambil dari .env
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  exports: [PrismaService, ValidationService, BcryptService, JwtModule],
  providers: [PrismaService, ValidationService, BcryptService],
})
export class CommonModule {}
