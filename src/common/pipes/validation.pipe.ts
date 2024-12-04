import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    
    if (errors.length > 0) {
      const details = errors.map(err => ({
        field: err.property,
        issues: Object.values(err.constraints),
      }));
      throw new BadRequestException({ message: 'Validation failed', details });
    }
    
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}