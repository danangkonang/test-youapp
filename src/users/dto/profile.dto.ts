import { IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  userId: string;

  username: string;

  @IsNotEmpty()
  weight: string;

  @IsNotEmpty()
  height: string;

  @IsNotEmpty()
  zodiac: string;

  @IsNotEmpty()
  horoscope: string;

  @IsNotEmpty()
  birthday: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  displayName: string;

  avatar: string;

  interest: string;

  interests: string[];
}
