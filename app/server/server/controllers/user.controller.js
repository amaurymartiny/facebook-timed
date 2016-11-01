import User from '../models/user.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Get user
 * @returns {User}
 */
function getOrCreate(req, res, next) {
  get(req.res)
}

/**
 * Create new user
 * @property {string} req.body.auth0Id - The auth0Id of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    auth0Id: req.body.auth0Id
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.auth0Id - The auth0Id of user.
 * @property {array} req.body.tracks - The tracks of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.auth0Id = req.body.auth0Id;
  user.tracks = req.body.tracks;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
