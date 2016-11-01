import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Website Schema
 */
const WebsiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
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
WebsiteSchema.method({
});

/**
 * Statics
 */
WebsiteSchema.statics = {
  /**
   * Get website
   * @param {ObjectId} id - The objectId of website.
   * @returns {Promise<Website, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((website) => {
        if (website) {
          return website;
        }
        const err = new APIError('No such website exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List websites in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of websites to be skipped.
   * @param {number} limit - Limit number of websites to be returned.
   * @returns {Promise<Website[]>}
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
 * @typedef Website
 */
export default mongoose.model('Website', WebsiteSchema);
