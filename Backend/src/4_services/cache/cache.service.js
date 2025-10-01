const { DEFAULT_TTL } = require("../../utils/constants");
const CacheManager = require("./cache.manager");

class CacheService {
  // -------------------------------------------------- Singleton Pattern ------------------------------------------------------------
  constructor() {
    this.cacheManager = null;
  }

  getInstance() {
    if (!this.cacheManager) {
      this.cacheManager = new CacheManager();
    }
    return this.cacheManager;
  }

  // -------------------------------------------------- Available Methods ------------------------------------------------------------
  // .......... Common Methods ..........
  async get(key) {
    try {
      return await this.getInstance().get(key);
    } catch (error) {
      if (this.isDebugEnabled()) {
        console.error(`[Cache Service] Error getting value for key: ${key}`, error);
      }
      return null;
    }
  }

  async set(key, value, ttl = DEFAULT_TTL) {
    try {
      return await this.getInstance().set(key, value, ttl);
    } catch (error) {
      if (this.isDebugEnabled()) {
        console.error(`[Cache Service] Error setting value for key: ${key}`, error);
      }
      return false;
    }
  }

  async delete(key) {
    try {
      return await this.getInstance().delete(key);
    } catch (error) {
      if (this.isDebugEnabled()) {
        console.error(`[Cache Service] Error deleting value for key: ${key}`, error);
      }
      return false;
    }
  }

  // .......... Extra Methods ..........
  async deleteMultiple(keys) {
    const promises = keys.map((key) => this.delete(key));
    return await Promise.all(promises);
  }

  generateKey(prefix, ...parts) {
    return `${prefix}:${parts.join("_")}`;
  }
  // ------------------------------------------------------------ Getters ------------------------------------------------------------
  getType() {
    return this.getInstance().getType();
  }

  isDebugEnabled() {
    return this.getInstance().isDebugEnabled();
  }
}

const cacheService = new CacheService();
module.exports = cacheService;
