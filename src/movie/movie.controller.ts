/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Request as Req, Response as Res } from 'express';
import { MovieService } from './movie.service';
import { DeleteMoviesSchema, SaveMovieSchema } from './movie.swagger';
import { ValidationService } from 'src/common/validation.service';
import { SaveMovieType, saveMovieValidation } from './movie.validation';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';

@Controller('api/movie')
export class MovieController {
  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private validationService: ValidationService,
  ) {}

  @ApiBody({ type: SaveMovieSchema })
  @UseGuards(AuthGuard)
  @Post()
  public async saveMovie(@Request() request: Req, @Response() response: Res) {
    const user = await this.userService.getUser({ id: request.body.user_id });

    const data: SaveMovieType = {
      movie_id: request.body.movie_id,
      title: request.body.title,
      poster_url: request.body.poster_url,
      user_id: user.id,
    };

    const validatedData = this.validationService.validate(
      saveMovieValidation,
      data,
    );

    const saveMovieService = await this.movieService.saveMovie(validatedData);

    return response.status(201).json(saveMovieService);
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getMoviesSaved(
    @Request() request: Req,
    @Response() response: Res,
  ) {
    const movies = await this.movieService.getMoviesSaved(
      request.body.user_id as number,
    );

    return response.status(200).json(movies);
  }

  @ApiBody({ type: DeleteMoviesSchema })
  @UseGuards(AuthGuard)
  @Delete(':movie_id')
  public async deleteMovieSaved(
    @Param('movie_id') movie_id: string,
    @Request() request: Req,
    @Response() response: Res,
  ) {
    const user = await this.userService.getUser({ id: request.body.user_id });

    const movieDeleteService = await this.movieService.deleteMovieSaved(
      parseInt(movie_id),
      user.id,
    );

    return response.status(200).json(movieDeleteService);
  }
}
