import Website from '../models/website.model';

/**
 * Load website and append to req.
 */
function load(req, res, next, id) {
  Website.get(id)
    .then((website) => {
      req.website = website; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get website
 * @returns {Website}
 */
function get(req, res) {
  return res.json(req.website);
}

/**
 * Create new website
 * @property {string} req.body.auth0Id - The auth0Id of website.
 * @returns {Website}
 */
function create(req, res, next) {
  const website = new Website({
    auth0Id: req.body.auth0Id
  });

  website.save()
    .then(savedwebsite => res.json(savedwebsite))
    .catch(e => next(e));
}

/**
 * Update existing website
 * @property {string} req.body.auth0Id - The auth0Id of website.
 * @property {array} req.body.websites - The websites of website.
 * @returns {Website}
 */
function update(req, res, next) {
  const website = req.website;
  website.auth0Id = req.body.auth0Id;
  website.websites = req.body.websites;

  website.save()
    .then(savedwebsite => res.json(savedwebsite))
    .catch(e => next(e));
}

/**
 * Get website list.
 * @returns {Website[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Website.list({ limit, skip })
    .then(websites => res.json(websites))
    .catch(e => next(e));
}

/**
 * Find websites matching query.
 * @returns {Website[]}
 */
function find(req, res, next) {
  Website.find(req.query.url ? { url: req.query.url } : {})
    .then(websites => res.json(websites))
    .catch(e => next(e));
}

/**
 * Delete website.
 * @returns {Website}
 */
function remove(req, res, next) {
  const website = req.website;
  website.remove()
    .then(deletedWebsite => res.json(deletedWebsite))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, find };
