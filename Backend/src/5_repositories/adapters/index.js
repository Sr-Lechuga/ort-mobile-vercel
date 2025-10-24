const createMongooseAdapter = require("./mongoose");

const createRepositoryAdapter = (type = null) => {
  switch (type.toLowerCase()) {
    case "mongoose":
      return createMongooseAdapter();
    default:
      throw new Error(`Unsupported repository adapter type: ${type}`);
  }
};

module.exports = {
  createRepositoryAdapter,
};
