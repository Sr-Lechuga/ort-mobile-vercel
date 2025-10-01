const redis = require("@upstash/redis");

let redisClient = null;

const createRedisAdapter = () => {
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("Redis config not found: REDIS_URL and REDIS_TOKEN are required, set them in the environment variables");
  }
  if (!redisClient) {
    const connectionOptions = {
      url: REDIS_URL,
      token: REDIS_TOKEN,
    };
    redisClient = new Redis(connectionOptions);

    if (process.env.CACHE_DEBUG === "true") {
      console.log("[Redis Cache] Connected to Upstash Redis");
    }
  }
  return redisClient;
};

module.exports = {
  createRedisAdapter,
};
