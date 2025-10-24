const createApp = require("../src/app");
const repositoryService = require("../src/5_repositories/repositories.service");

// Para Vercel, necesitamos inicializar de forma síncrona en el primer request
let appInstance = null;
let initializationPromise = null;

const initializeApp = async () => {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        await repositoryService.initialize();
        appInstance = createApp();
        console.log("App initialized for Vercel");
        return appInstance;
      } catch (error) {
        console.error("Failed to initialize app:", error.message);
        throw error;
      }
    })();
  }
  return initializationPromise;
};

module.exports = async (req, res) => {
  try {
    const app = await initializeApp();
    return app(req, res);
  } catch (error) {
    res.status(503).json({
      error: "Service temporarily unavailable",
      message: "Database initialization failed",
    });
  }
};
