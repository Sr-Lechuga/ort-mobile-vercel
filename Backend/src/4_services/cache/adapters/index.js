const createRedisAdapter = require("./redis.adapter");
const createInMemoryAdapter = require("./inMemory.adapter");

const createCacheAdapter = (type = "in-memory") => {
  switch (type.toLowerCase()) {
    case "in-memory":
    case "memory":
      return createInMemoryAdapter();

    case "redis":
      return createRedisAdapter();

    default:
      throw new Error(`Invalid cache adapter type: ${type}`);
  }
};

const getSupportedCacheAdapters = () => {
  return ["in-memory", "memory", "redis"];
};

module.exports = {
  createCacheAdapter,
  getSupportedCacheAdapters,
  createRedisAdapter,
  createInMemoryAdapter,
};
