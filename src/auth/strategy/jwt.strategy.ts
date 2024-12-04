/**
 *  validating the token on subsequent requests and ensuring that the client is authorized to 
 * access specific resources
 * Automatically validates incoming JWTs in protected routes using JwtGuard.
Decodes the JWT and extracts user-related data (payload), making it available in the request object 
for further processing.

 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
