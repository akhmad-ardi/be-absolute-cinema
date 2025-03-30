import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
