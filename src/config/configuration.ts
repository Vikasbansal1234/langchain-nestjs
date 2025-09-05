export default () => ({
    port: 3000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    cache: {
      ttl: parseInt(process.env.CACHE_TTL ?? '60000'),
      max: parseInt(process.env.CACHE_MAX ?? '100'),
      store: process.env.CACHE_STORE,
    },
  });