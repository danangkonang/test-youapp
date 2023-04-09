import { Validate, IsEmail, IsNotEmpty } from 'class-validator';
import {
  IsUsernameExists,
  IsEmailExists,
  IsEqualTo,
} from '../../validation/validation';

export class CreateUserDto {
  @IsNotEmpty()
  @Validate(IsUsernameExists)
  username: string;

  @IsEmail()
  @Validate(IsEmailExists)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEqualTo('password')
  confirm_password: string;
}

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
