const { createRepositoryAdapter } = require("./adapters");

class RepositoryManager {
  #type;

  constructor(type = null) {
    this.#type = type || process.env.STORAGE_TYPE || "mongoose";
    try {
      this.adapter = createRepositoryAdapter(this.#type);
    } catch (error) {
      throw error;
    }
  }

  async testConnection() {
    return (await this.adapter).testConnection();
  }

  // Métodos para Volunteers
  async findVolunteer(filter) {
    return (await this.adapter).findVolunteer(filter);
  }

  async countVolunteer(filter) {
    return (await this.adapter).countVolunteer(filter);
  }

  async saveVolunteer(volunteerData) {
    return (await this.adapter).saveVolunteer(volunteerData);
  }

  // Métodos para Organizers
  async findOrganizer(filter) {
    return (await this.adapter).findOrganizer(filter);
  }

  async countOrganizer(filter) {
    return (await this.adapter).countOrganizer(filter);
  }

  async saveOrganizer(organizerData) {
    return (await this.adapter).saveOrganizer(organizerData);
  }

  // Métodos para Activities
  async findActivity(filter) {
    return (await this.adapter).findActivity(filter);
  }

  async countActivity(filter) {
    return (await this.adapter).countActivity(filter);
  }

  async saveActivity(activityData) {
    return (await this.adapter).saveActivity(activityData);
  }

  // Métodos para Activity Instances
  async findActivityInstance(filter) {
    return (await this.adapter).findActivityInstance(filter);
  }

  async countActivityInstance(filter) {
    return (await this.adapter).countActivityInstance(filter);
  }

  async saveActivityInstance(instanceData) {
    return (await this.adapter).saveActivityInstance(instanceData);
  }
}

module.exports = RepositoryManager;
