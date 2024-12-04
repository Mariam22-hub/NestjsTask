import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '.././schema/user.schema';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const { email, password, role = 'User' } = dto; // default role to 'User' if not provided
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new this.userModel({ email, password: hashedPassword, role });
    return user.save();
  }
  

  async login(dto: LoginDto): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: dto.email });
    
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { id: user._id, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
