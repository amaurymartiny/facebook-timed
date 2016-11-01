import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const config = require('../../config/env');

// sample user, used for authentication
const user = {
  auth0Id: 'facebook|992994024131835',
  password: 'express'
};

/**
 * Returns jwt token if valid auth0Id and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.auth0Id === user.auth0Id /*&& req.body.password === user.password*/) {
    const token = jwt.sign({
      auth0Id: user.auth0Id
    }, config.jwtSecret);
    return res.json({
      token,
      auth0Id: user.auth0Id
    });
  }

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
  return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  console.log(req.user)
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
