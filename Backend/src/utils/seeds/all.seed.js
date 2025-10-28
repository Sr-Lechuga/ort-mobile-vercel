const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../../config/mongodb");
const Organizer = require("../../5_repositories/adapters/mongoose/models/organizer.model");
const Volunteer = require("../../5_repositories/adapters/mongoose/models/volunteer.model");
const Activity = require("../../5_repositories/adapters/mongoose/models/activity.model");
const ActivityInstance = require("../../5_repositories/adapters/mongoose/models/activityInstance.model");
const Inscription = require("../../5_repositories/adapters/mongoose/models/inscription.model");
const { seedOrganizers } = require("./organizers.seed");
const { seedVolunteers } = require("./volunteers.seed");
const { seedBadges } = require("./badges.seed");

/**
 * Seed completo para popular toda la base de datos
 * Ejecuta todos los seeds en el orden correcto
 */
const runAllSeeds = async () => {
  try {
    console.log("🌱 Iniciando seed completo de la base de datos...\n");

    // 1. Seed de Organizers
    console.log("📋 Paso 1/5: Seeding de Organizadores");
    await seedOrganizers();
    console.log("✅ Organizadores completados\n");

    // 2. Seed de Volunteers
    console.log("📋 Paso 2/5: Seeding de Voluntarios");
    await seedVolunteers();
    console.log("✅ Voluntarios completados\n");

    // 3. Seed de Badges
    console.log("📋 Paso 3/5: Seeding de Badges");
    await seedBadges();
    console.log("✅ Badges completados\n");

    // 4. Seed de Activities (requiere organizadores)
    console.log("📋 Paso 4/6: Seeding de Actividades");
    await seedActivities();
    console.log("✅ Actividades completadas\n");

    // 5. Seed de Activity Instances (requiere actividades)
    console.log("📋 Paso 5/6: Seeding de Instancias de Actividad");
    await seedActivityInstances();
    console.log("✅ Instancias de actividad completadas\n");

    // 6. Seed de Inscriptions (requiere voluntarios y instancias)
    console.log("📋 Paso 6/6: Seeding de Inscripciones");
    await seedInscriptions();
    console.log("✅ Inscripciones completadas\n");

    console.log("🌳 Seed completo finalizado exitosamente!");
  } catch (error) {
    console.error("❌ Error en seed completo:", error.message);
    throw error;
  }
};

/**
 * Crea actividades de ejemplo para los organizadores
 */
const seedActivities = async () => {
  try {
    // Buscar el primer organizador
    const organizer = await Organizer.findOne({ username: "ccbarriosur" });

    if (!organizer) {
      throw new Error("No se encontró el organizador para crear actividades");
    }

    const activitiesData = [
      {
        owner: organizer._id,
        title: "Taller de Arte Urbano Comunitario",
        categories: ["cultural", "social"],
        description: "Taller práctico donde los participantes aprenderán técnicas de arte urbano y muralismo para embellecer espacios públicos del barrio.",
        status: "en curso",
        location: {
          country: "Uruguay",
          city: "Montevideo",
          address: "Av. 18 de Julio 1670, Barrio Sur",
        },
        locationCoordinates: {
          type: "Point",
          coordinates: [-56.180523, -34.903077],
        },
      },
      {
        owner: organizer._id,
        title: "Cine Debate: Identidad Afrodescendiente",
        categories: ["cultural", "educativo"],
        description: "Proyección de documentales sobre la cultura afrodescendiente en Uruguay, seguido de un debate moderado por especialistas.",
        status: "en curso",
        location: {
          country: "Uruguay",
          city: "Montevideo",
          address: "Av. 18 de Julio 1670, Barrio Sur",
        },
        locationCoordinates: {
          type: "Point",
          coordinates: [-56.180523, -34.903077],
        },
      },
      {
        owner: organizer._id,
        title: "Mercado Solidario Barrio Sur",
        categories: ["social"],
        description: "Feria comunitaria donde emprendedores locales pueden vender sus productos a precios accesibles.",
        status: "inactiva",
        location: {
          country: "Uruguay",
          city: "Montevideo",
          address: "Av. 18 de Julio 1670, Barrio Sur",
        },
        locationCoordinates: {
          type: "Point",
          coordinates: [-56.180523, -34.903077],
        },
      },
    ];

    for (const activityData of activitiesData) {
      const existing = await Activity.findOne({ title: activityData.title });
      if (!existing) {
        await Activity.create(activityData);
        console.log(`✅ Actividad ${activityData.title} creada`);
      }
    }
  } catch (error) {
    console.error("❌ Error al crear actividades:", error.message);
    throw error;
  }
};

/**
 * Crea instancias de actividad para las actividades existentes
 */
const seedActivityInstances = async () => {
  try {
    const activities = await Activity.find();

    if (activities.length === 0) {
      console.log("⚠️  No hay actividades para crear instancias");
      return;
    }

    // Configuración de instancias para cada actividad
    const instancesData = [
      // Para la primera actividad (Arte Urbano)
      {
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // En 7 días
        duration: 180, // 3 horas en minutos
        inscriptionsOpen: true,
        slots: 20,
      },
      {
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // En 14 días
        duration: 180,
        inscriptionsOpen: true,
        slots: 20,
      },
      // Para la segunda actividad (Cine Debate)
      {
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // En 8 días
        duration: 120, // 2 horas
        inscriptionsOpen: true,
        slots: 50,
      },
      {
        date: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000), // En 22 días
        duration: 120,
        inscriptionsOpen: true,
        slots: 50,
      },
      // Para la tercera actividad (Mercado Solidario)
      {
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // En 5 días
        duration: 240, // 4 horas
        inscriptionsOpen: true,
        slots: 100,
      },
    ];

    let created = 0;
    const instanceIndex = [0, 1, 2, 2, 3, 3, 4]; // Asigna instancias a actividades

    for (let i = 0; i < activities.length && i < instancesData.length; i++) {
      const activity = activities[i];
      const instanceData = instancesData[i];

      // Verificar si ya tiene instancias
      if (activity.instances && activity.instances.length > 0) {
        console.log(`⏭️  Actividad "${activity.title}" ya tiene instancias`);
        continue;
      }

      // Crear la instancia
      const instance = await ActivityInstance.create({
        owner: activity.owner,
        activity: activity._id,
        ...instanceData,
      });

      // Asociar la instancia con la actividad
      activity.instances.push(instance._id);
      await activity.save();

      console.log(`✅ Instancia creada para "${activity.title}" (${new Date(instanceData.date).toLocaleDateString()})`);
      created++;
    }

    console.log(`✅ ${created} instancias creadas en total`);
  } catch (error) {
    console.error("❌ Error al crear instancias:", error.message);
    throw error;
  }
};

/**
 * Crea inscripciones de ejemplo para voluntarios y actividades
 */
const seedInscriptions = async () => {
  try {
    const volunteers = await Volunteer.find();
    const activities = await Activity.find();

    if (volunteers.length === 0 || activities.length === 0) {
      console.log("⚠️  No hay suficientes datos para crear inscripciones");
      return;
    }

    // Obtener instancias de las primeras 3 actividades
    const instances = [];
    for (const activity of activities.slice(0, 3)) {
      if (activity.instances && activity.instances.length > 0) {
        const instance = await ActivityInstance.findById(activity.instances[0]);
        if (instance) instances.push(instance);
      }
    }

    if (instances.length === 0) {
      console.log("⚠️  No hay instancias disponibles para crear inscripciones");
      return;
    }

    // Crear algunas inscripciones de ejemplo
    const inscriptionsData = [
      {
        volunteer: volunteers[0]._id,
        instance: instances[0]._id,
        accepted: true,
        assisted: true,
      },
      {
        volunteer: volunteers[0]._id,
        instance: instances[1]._id,
        accepted: true,
        assisted: false,
      },
      {
        volunteer: volunteers[1]._id,
        instance: instances[0]._id,
        accepted: true,
        assisted: true,
      },
      {
        volunteer: volunteers[2]._id,
        instance: instances[1]._id,
        accepted: true,
        assisted: true,
      },
    ];

    let created = 0;
    for (const inscriptionData of inscriptionsData) {
      const existing = await Inscription.findOne({
        volunteer: inscriptionData.volunteer,
        instance: inscriptionData.instance,
      });

      if (!existing) {
        await Inscription.create(inscriptionData);
        created++;
      }
    }

    console.log(`✅ ${created} inscripciones creadas`);
  } catch (error) {
    console.error("❌ Error al crear inscripciones:", error.message);
    throw error;
  }
};

/**
 * Función principal
 */
const run = async () => {
  try {
    await connectDB();
    console.log("📊 Conectado a MongoDB\n");

    await runAllSeeds();

    await mongoose.connection.close();
    console.log("\n🌳 Conexión cerrada");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Ejecutar solo si se llama directamente
if (require.main === module) {
  run();
}

module.exports = { runAllSeeds, seedActivities, seedActivityInstances, seedInscriptions };
