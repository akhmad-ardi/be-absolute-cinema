import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { BcryptService } from './bcrypt.service';

@Global()
@Module({
  exports: [PrismaService, ValidationService, BcryptService],
  providers: [PrismaService, ValidationService, BcryptService],
})
export class CommonModule {}
