import { ApiProperty } from '@nestjs/swagger';

const example = {
  email: 'test@example.com',
  name: 'test',
  password: 'testpassword',
};

export class RegisterSchema {
  @ApiProperty({ example: example.email })
  email: string;

  @ApiProperty({ example: example.name })
  name: string;

  @ApiProperty({ example: example.password })
  password: string;
}

export class LoginSchema {
  @ApiProperty({ example: example.email })
  email: string;

  @ApiProperty({ example: example.password })
  password: string;
}
