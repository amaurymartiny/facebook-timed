import resource from 'resource-router-middleware';
import websites from '../models/websites';

export default ({ config, db }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id : 'website',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    let website = websites.find( website => website.id===id ),
      err = website ? null : 'Not found';
    callback(err, website);
  },

  /** GET / - List all entities */
  index({ params }, res) {
    res.json(websites);
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    body.id = websites.length.toString(36);
    websites.push(body);
    res.json(body);
  },

  /** GET /:id - Return a given entity */
  read({ website }, res) {
    res.json(website);
  },

  /** PUT /:id - Update a given entity */
  update({ website, body }, res) {
    for (let key in body) {
      if (key!=='id') {
        website[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({ website }, res) {
    websites.splice(websites.indexOf(website), 1);
    res.sendStatus(204);
  }
});
