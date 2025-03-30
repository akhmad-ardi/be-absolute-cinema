import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

type Query = {
  id?: number;
  email?: string;
};

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getUser({ id = 0, email = '' }: Query) {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ id }, { email }] },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = '';

    return user;
  }
}
