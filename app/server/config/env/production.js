export default {
  env: 'production',
  jwtSecret: process.env.JWT_SECRET,
  jwtAudience: process.env.JWT_AUDIENCE,
  db: process.env.MONGODB_URI,
  port: process.env.PORT || 8080
};
