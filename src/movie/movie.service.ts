import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { SaveMovieType } from './movie.validation';

@Injectable()
export class MovieService {
  constructor(private prismaService: PrismaService) {}

  public async saveMovie(data: SaveMovieType) {
    const movieSavedAlreadyExist =
      await this.prismaService.movieSaved.findFirst({
        where: {
          AND: [{ user_id: data.user_id }, { movie_id: data.movie_id }],
        },
      });
    if (movieSavedAlreadyExist) {
      throw new BadRequestException('Movie already saved');
    }

    await this.prismaService.movieSaved.create({ data });

    return { message: 'movie saved' };
  }

  public async getMoviesSaved(user_id: number) {
    const movies = await this.prismaService.movieSaved.findMany({
      where: { user_id },
    });

    return { data: movies };
  }

  public async deleteMovieSaved(movie_id: number, user_id: number) {
    const movie = await this.prismaService.movieSaved.findFirst({
      where: {
        AND: [{ movie_id }, { user_id }],
      },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.prismaService.movieSaved.delete({
      where: { movie_id, user_id },
    });

    return { message: 'Movie deleted' };
  }
}
