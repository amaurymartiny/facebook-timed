import { jwtSecret, jwtAudience } from './development'

export default {
  env: 'test',
  jwtSecret: jwtSecret,
  jwtAudience: jwtAudience,
  db: 'mongodb://localhost/timed-test',
  port: 8080
};
