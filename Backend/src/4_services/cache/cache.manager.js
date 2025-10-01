const { createCacheAdapter } = require("./adapters");

class CacheManager {
  #type;
  #debug;

  constructor(type = null, debug = null) {
    this.#type = type || process.env.CACHE_TYPE || "in-memory";
    this.#debug = debug !== null ? debug : process.env.CACHE_DEBUG === "true";
    this.client = createCacheAdapter(this.#type);

    if (this.#debug) {
      console.log(`[Cache Manager] Using ${this.#type.toUpperCase()} cache adapter`);
    }
  }

  // -------------------------------------------------- Required Methods ------------------------------------------------------------
  async get(key) {
    if (this.#debug) {
      console.log(`[Cache Manager] Getting value for key: ${key}`);
    }
    const value = await this.client.get(key);

    if (!value) {
      if (this.#debug) {
        console.log(`[Cache Manager] Cache miss for key: ${key}`);
      }
      return null;
    }
    try {
      const parsedValue = JSON.parse(value);
      if (this.#debug) {
        console.log(`[Cache Manager] Value parsed for key: ${key}`);
      }
      return parsedValue;
    } catch (err) {
      if (this.#debug) {
        console.log(`[Cache Manager] Error parsing value for key: ${key}, returning raw value instead`);
      }
      return value;
    }
  }

  async set(key, value, ttl) {
    if (this.#debug) {
      console.log(`[Cache Manager] Setting value for key: ${key}`);
    }

    const serializedValue = JSON.stringify(value);

    if (this.#type === "redis") {
      return await this.client.setex(key, ttl, serializedValue);
    } else {
      return await this.client.set(key, serializedValue, ttl);
    }
  }

  async delete(key) {
    if (this.#debug) {
      console.log(`[Cache Manager] Deleting value for key: ${key}`);
    }
    return await this.client.del(key);
  }

  // ------------------------------------------------------------ Getters ------------------------------------------------------------
  getType() {
    return this.#type;
  }

  isDebugEnabled() {
    return this.#debug;
  }
}

module.exports = CacheManager;
