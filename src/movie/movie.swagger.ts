import { ApiProperty } from '@nestjs/swagger';

export class SaveMovieSchema {
  @ApiProperty()
  movie_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  poster_url: string;
}

export class DeleteMoviesSchema {
  @ApiProperty()
  movie_id: number;
}
