export default {
  env: 'development',
  MONGOOSE_DEBUG: true,
  jwtSecret: 'put your secret here',
  jwtAudience: 'put your audience here',
  db: 'mongodb://localhost/timed-dev',
  port: 8080
};
