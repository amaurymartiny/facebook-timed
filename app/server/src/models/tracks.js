import mongoose from 'mongoose';

/**
 * Track Schema
 */
export const TrackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  timeSpentToday: {
    type: Number
  },
  timeSpentTotal: {
    type: Number
  }
});

export default mongoose.model('Track', TrackSchema);