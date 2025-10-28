const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../../config/mongodb");
const Organizer = require("../../5_repositories/adapters/mongoose/models/organizer.model");

/**
 * Datos de ejemplo para centros/organizadores
 * Basado en documentacion/examples/organizations.json
 */
const organizersData = [
  {
    username: "ccbarriosur",
    email: "ccbarriosur@gmail.com",
    contactEmail: "ccbarriosur@gmail.com",
    password: "$2a$06$k.QzHkxm8F1XlkqvGZvxWe3V9Yq2GqJqXR2Q9Z9KQzQzKzQXZQzKz", // ccbarriosur123 hasheado (deberías hashearlo real)
    name: "Centro Cultural Barrio Sur",
    telephone: "59899123456",
    social: {
      instagram: "@ccbarriosur",
      facebook: "@ccbarriosur",
      linkedIn: "/ccbarriosur",
      personal: "https://ccbarriosur.com",
    },
    location: {
      country: "Uruguay",
      city: "Montevideo",
      address: "Av. 18 de Julio 1670",
      lat: -34.903077,
      lng: -56.180523,
    },
  },
  {
    username: "crv",
    name: "Centro Raices Verdes",
    email: "crv@gmail.com",
    contactEmail: "crv@gmail.com",
    password: "$2a$06$k.QzHkxm8F1XlkqvGZvxWe3V9Yq2GqJqXR2Q9Z9KQzQzKzQXZQzKz", // crv123 hasheado
    telephone: "59899123456",
    social: {
      instagram: "@crv",
      facebook: "@crv",
      linkedIn: "/crv",
      personal: "https://crv.com",
    },
    location: {
      country: "Uruguay",
      city: "Canelones",
      address: "Los Camalotes esq. Calle 2",
      lat: -34.854641,
      lng: -56.018665,
    },
  },
];

/**
 * Inserta organizadores en la base de datos
 */
const seedOrganizers = async () => {
  try {
    console.log("🌱 Iniciando seeding de organizadores...");

    for (const organizerData of organizersData) {
      const existingOrganizer = await Organizer.findOne({ username: organizerData.username });

      if (!existingOrganizer) {
        await Organizer.create(organizerData);
        console.log(`✅ Organizador ${organizerData.username} creado`);
      } else {
        console.log(`⏭️  Organizador ${organizerData.username} ya existe, omitiendo`);
      }
    }

    console.log(`✅ ${organizersData.length} organizadores procesados`);
  } catch (error) {
    console.error("❌ Error al insertar organizadores:", error.message);
    throw error;
  }
};

/**
 * Ejecuta el seeding
 */
const run = async () => {
  try {
    await connectDB();
    console.log("📊 Conectado a MongoDB");

    await seedOrganizers();

    await mongoose.connection.close();
    console.log("🌳 Seed de organizadores completado");
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

module.exports = { seedOrganizers };
