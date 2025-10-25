require("dotenv").config();
const createApp = require("../src/app");
const repositoryService = require("../src/5_repositories/repositories.service");

const startServer = async () => {
  try {
    await repositoryService.initialize();
    const app = createApp();
    const { PORT } = process.env;

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`Database: ${process.env.STORAGE_TYPE || "mongoose"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
