import mongoose from 'mongoose';
import { TrackSchema } from './tracks';

/**
 * User Schema
 */
export const UserSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  tracks: {
    type: [TrackSchema],
    required: false
  }
});

export default mongoose.model('User', UserSchema);