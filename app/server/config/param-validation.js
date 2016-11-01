import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      auth0Id: Joi.string().required()
      // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      auth0Id: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      auth0Id: Joi.string().required()
      // password: Joi.string().required()
    }
  }
};
