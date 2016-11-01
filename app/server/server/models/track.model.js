import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Track Schema
 */
export const TrackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  websiteId: {
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

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TrackSchema.method({
});

/**
 * Statics
 */
TrackSchema.statics = {
  /**
   * Get track
   * @param {ObjectId} id - The objectId of track.
   * @returns {Promise<Track, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((track) => {
        if (track) {
          return track;
        }
        const err = new APIError('No such track exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List tracks in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of tracks to be skipped.
   * @param {number} limit - Limit number of tracks to be returned.
   * @returns {Promise<Track[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef Track
 */
export default mongoose.model('Track', TrackSchema);