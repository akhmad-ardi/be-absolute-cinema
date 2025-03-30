import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, CommonModule, MovieModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
