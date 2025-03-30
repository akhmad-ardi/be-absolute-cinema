import { Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ValidationService {
  validate<T>(schema: ZodSchema<T>, data: any): T {
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }

    return result.data;
  }
}
