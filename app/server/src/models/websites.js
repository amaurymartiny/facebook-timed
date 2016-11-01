import mongoose from 'mongoose';

/**
 * Website Schema
 */
export const WebsiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

export default mongoose.model('Website', WebsiteSchema);