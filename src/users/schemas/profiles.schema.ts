import * as mongoose from 'mongoose';

export const ProfilesSchema = new mongoose.Schema({
  userId: { type: String },
  username: { type: String },
  weight: { type: String },
  height: { type: String },
  zodiac: { type: String },
  horoscope: { type: String },
  birthday: { type: String },
  gender: { type: String },
  displayName: { type: String },
  avatar: { type: String },
  interests: { type: Array },
});
