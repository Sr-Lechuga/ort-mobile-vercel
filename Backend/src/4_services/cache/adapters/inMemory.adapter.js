const NodeCache = require("node-cache");

let inMemoryClient = null;

const createInMemoryAdapter = () => {
  if (!inMemoryClient) {
    inMemoryClient = new NodeCache();
    if (process.env.CACHE_DEBUG === "true") {
      console.log("[In Memory Cache] Connected to Node Cache");
    }
  }
  return inMemoryClient;
};

module.exports = {
  createInMemoryAdapter,
};
