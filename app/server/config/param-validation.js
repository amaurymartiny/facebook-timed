import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      auth0Id: Joi.string().required()
    }
  },

  // PUT /api/users/:userId
  updateUser: {
    body: {
      auth0Id: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/tracks
  createTrack: {
    body: {
      auth0Id: Joi.string().required(),
      websiteId: Joi.string().hex().required(),
      today: Joi.number().required(),
      total: Joi.number().required(),
      startDate: Joi.date().required()
    }
  },

  // PUT /api/tracks/:trackId
  updateTrack: {
    body: {
      today: Joi.number().required(),
      total: Joi.number().required(),
      startDate: Joi.date().required()
    },
    params: {
      trackId: Joi.string().hex().required()
    }
  }
};
