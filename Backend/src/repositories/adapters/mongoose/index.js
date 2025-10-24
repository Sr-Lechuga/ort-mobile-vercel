const connectDB = require("../../../config/mongodb");
const Volunteer = require("../../../models/volunteer.model");
const Organizer = require("../../../models/organizer.model");
const Activity = require("../../../models/activity.model");
const ActivityInstance = require("../../../models/activityInstance.model");

const createMongooseAdapter = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Conectar a la base de datos
      await connectDB();

      const adapter = {
        // Test de conexión
        async testConnection() {
          try {
            await Volunteer.countDocuments();
            return true;
          } catch (error) {
            throw new Error(`Database connection test failed: ${error.message}`);
          }
        },

        // Métodos para Volunteers
        async findVolunteer(filter) {
          return await Volunteer.find(filter);
        },

        async countVolunteer(filter) {
          return await Volunteer.countDocuments(filter);
        },

        async saveVolunteer(volunteerData) {
          const volunteer = new Volunteer(volunteerData);
          return await volunteer.save();
        },

        // Métodos para Organizers
        async findOrganizer(filter) {
          return await Organizer.find(filter);
        },

        async countOrganizer(filter) {
          return await Organizer.countDocuments(filter);
        },

        async saveOrganizer(organizerData) {
          const organizer = new Organizer(organizerData);
          return await organizer.save();
        },

        // Métodos para Activities
        async findActivity(filter) {
          return await Activity.find(filter);
        },

        async countActivity(filter) {
          return await Activity.countDocuments(filter);
        },

        async saveActivity(activityData) {
          const activity = new Activity(activityData);
          return await activity.save();
        },

        // Métodos para Activity Instances
        async findActivityInstance(filter) {
          return await ActivityInstance.find(filter);
        },

        async countActivityInstance(filter) {
          return await ActivityInstance.countDocuments(filter);
        },

        async saveActivityInstance(instanceData) {
          const instance = new ActivityInstance(instanceData);
          return await instance.save();
        },
      };

      resolve(adapter);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = createMongooseAdapter;
