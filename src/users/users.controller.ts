import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { CreateProfileDto } from './dto/profile.dto';
import { AuthGuard } from './user.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('getProfile')
  async findAll(@Request() request): Promise<any> {
    return this.userService.findProfileByUserId(request.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('createProfile')
  @UseInterceptors(FileInterceptor('avatar'))
  async createProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProfileDto: CreateProfileDto,
    @Request() request,
  ): Promise<any> {
    createProfileDto.avatar = file.filename;
    createProfileDto.userId = request.user.id;
    createProfileDto.username = request.user.username;
    createProfileDto.interests = JSON.parse(createProfileDto.interest);
    return this.userService.updateProfileByUserId(createProfileDto);
  }

  @UseGuards(AuthGuard)
  @Post('updateProfile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProfileDto: CreateProfileDto,
    @Request() request,
  ): Promise<any> {
    createProfileDto.avatar = file.filename;
    createProfileDto.userId = request.user.id;
    createProfileDto.username = request.user.username;
    return this.userService.updateProfileByUserId(createProfileDto);
  }
}
