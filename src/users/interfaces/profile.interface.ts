import { Document } from 'mongoose';

export interface Profile extends Document {
  userId: string;
  username: string;
  weight: string;
  height: string;
  zodiac: string;
  horoscope: string;
  birthday: string;
  gender: string;
  displayName: string;
  avatar: string;
  interest: Array<string>;
}
