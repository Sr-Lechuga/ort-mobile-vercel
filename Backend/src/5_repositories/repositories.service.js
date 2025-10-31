const RepositoryManager = require("./repositories.manager");

class RepositoryFactory {
  #repoManager;
  #initialized;

  constructor() {
    this.#repoManager = null;
    this.#initialized = false;
  }

  getInstance() {
    if (!this.#repoManager) {
      this.#repoManager = new RepositoryManager();
    }
    return this.#repoManager;
  }

  async initialize() {
    if (this.#initialized) {
      return true;
    }

    try {
      const manager = this.getInstance();
      // Test de conexión verificando que la base de datos esté disponible
      await manager.testConnection();

      this.#initialized = true;
      console.log("Repository service initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize repository service:", error.message);
      throw error;
    }
  }

  isInitialized() {
    return this.#initialized;
  }

  // Métodos para Volunteers
  async findVolunteer(filter) {
    return await this.getInstance().findVolunteer(filter);
  }

  async countVolunteer(filter) {
    return await this.getInstance().countVolunteer(filter);
  }

  async saveVolunteer(volunteerData) {
    return await this.getInstance().saveVolunteer(volunteerData);
  }

  // Métodos para Organizers
  async findOrganizer(filter) {
    return await this.getInstance().findOrganizer(filter);
  }

  async countOrganizer(filter) {
    return await this.getInstance().countOrganizer(filter);
  }

  async saveOrganizer(organizerData) {
    return await this.getInstance().saveOrganizer(organizerData);
  }

  // Métodos para Activities
  async findActivity(filter) {
    return await this.getInstance().findActivity(filter);
  }

  async countActivity(filter) {
    return await this.getInstance().countActivity(filter);
  }

  async saveActivity(activityData) {
    return await this.getInstance().saveActivity(activityData);
  }

  // Métodos para Activity Instances
  async findActivityInstance(filter) {
    return await this.getInstance().findActivityInstance(filter);
  }

  async countActivityInstance(filter) {
    return await this.getInstance().countActivityInstance(filter);
  }

  async saveActivityInstance(instanceData) {
    return await this.getInstance().saveActivityInstance(instanceData);
  }
}

const repoFactory = new RepositoryFactory();
module.exports = repoFactory;
