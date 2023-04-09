import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { CreateProfileDto } from './dto/profile.dto';
import { User } from './interfaces/user.interface';
import { Profile } from './interfaces/profile.interface';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Profile')
    private readonly profileModel: Model<Profile>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const data = new this.userModel({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
      });
      const user = await data.save();
      if (!user) {
        throw new HttpException('Error creating', HttpStatus.BAD_REQUEST);
      }
      const createdProfile = new this.profileModel({
        userId: user.id,
        username: createUserDto.username,
      });
      await createdProfile.save();
      return {
        id: user.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        $or: [
          {
            username: loginDto.username,
          },
          {
            email: loginDto.username,
          },
        ],
      });
      if (!user) {
        throw new HttpException('wrong credential', HttpStatus.BAD_REQUEST);
      }
      const isValid = bcrypt.compareSync(loginDto.password, user.password);
      if (!isValid) {
        throw new HttpException('wrong credential', HttpStatus.BAD_REQUEST);
      }
      const payload = { username: user.username, id: user._id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async findProfileByUserId(userId: string): Promise<Profile> {
    try {
      return this.profileModel.findOne({ userId: userId });
    } catch (error) {
      throw error;
    }
  }

  async updateProfileByUserId(dto: CreateProfileDto): Promise<any> {
    try {
      const data = {
        displayName: dto.displayName,
        weight: dto.weight,
        height: dto.height,
        zodiac: dto.zodiac,
        horoscope: dto.horoscope,
        birthday: dto.birthday,
        gender: dto.gender,
        avatar: dto.avatar,
        interests: dto.interests,
      };
      await this.profileModel.updateOne({ userId: dto.userId }, data);
      return {
        id: dto.userId,
      };
    } catch (error) {
      throw error;
    }
  }

  async findUserByUsername(username: string): Promise<Profile> {
    return this.userModel.findOne({ username: username });
  }

  async findUserByEmail(email: string): Promise<Profile> {
    return this.userModel.findOne({ email: email });
  }
}
