import Track from '../models/track.model';

/**
 * Load track and append to req.
 */
function load(req, res, next, id) {
  Track.get(id)
    .then((track) => {
      req.track = track; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get track
 * @returns {Track}
 */
function get(req, res) {
  return res.json(req.track);
}

/**
 * Get track
 * @returns {Track}
 */
function getOrCreate(req, res, next) {
  get(req.res)
}

/**
 * Create new track
 * @property {string} req.body.auth0Id - The auth0Id of track.
 * @returns {Track}
 */
function create(req, res, next) {
  const track = new Track({
    auth0Id: req.body.auth0Id
  });

  track.save()
    .then(savedtrack => res.json(savedtrack))
    .catch(e => next(e));
}

/**
 * Update existing track
 * @property {string} req.body.auth0Id - The auth0Id of track.
 * @property {array} req.body.tracks - The tracks of track.
 * @returns {Track}
 */
function update(req, res, next) {
  const track = req.track;
  track.auth0Id = req.body.auth0Id;
  track.tracks = req.body.tracks;

  track.save()
    .then(savedtrack => res.json(savedtrack))
    .catch(e => next(e));
}

/**
 * Get user's track list.
 * @returns {Track[]}
 */
function list(req, res, next) {
  console.log(req.user)
  Track.find({ auth0Id: req.user.auth0Id })
    .then(tracks => res.json(tracks))
    .catch(e => next(e));
}

/**
 * Delete track.
 * @returns {Track}
 */
function remove(req, res, next) {
  const track = req.track;
  track.remove()
    .then(deletedTrack => res.json(deletedTrack))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
