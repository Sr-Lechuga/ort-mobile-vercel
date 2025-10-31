const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../../config/mongodb");
const Volunteer = require("../../5_repositories/adapters/mongoose/models/volunteer.model");

/**
 * Datos de ejemplo para voluntarios
 * Basado en documentacion/examples/volunteers.json
 */
const volunteersData = [
  {
    username: "mrodriguez",
    email: "mrodriguez@gmail.com",
    password: "$2b$06$L5gMQkCDBggdTLuTenPV7u5Z7hVbWV30L.6CT9EsAQUnGE30pz4Fa", // Maria.123 hasheado
    name: "Maria",
    lastname: "Rodriguez",
    age: 25,
    genre: "mujer",
  },
  {
    username: "cpereira",
    email: "cpereira@gmail.com",
    password: "$2b$06$2TdXPOhBOp2TBuKhLBFQquj67OFnOZpo60Wyfht2WhKpkreG6V1Va", // Carlos.123 hasheado
    name: "Carlos",
    lastname: "Pereira",
    age: 68,
    genre: "hombre",
  },
  {
    username: "scabrera",
    email: "scabrera@gmail.com",
    password: "$2b$06$lL8LVjErTLME5RtjcfLIbuavwTC8IKgz3uArwSpmGYqQ6dy5cBSum", // Sofia.123 hasheado
    name: "Sofia",
    lastname: "Cabrera",
    age: 34,
    genre: "no especificado",
  },
];

/**
 * Inserta voluntarios en la base de datos
 */
const seedVolunteers = async () => {
  try {
    console.log("🌱 Iniciando seeding de voluntarios...");

    for (const volunteerData of volunteersData) {
      const existingVolunteer = await Volunteer.findOne({ username: volunteerData.username });

      if (!existingVolunteer) {
        await Volunteer.create(volunteerData);
        console.log(`✅ Voluntario ${volunteerData.username} creado`);
      } else {
        console.log(`⏭️  Voluntario ${volunteerData.username} ya existe, omitiendo`);
      }
    }

    console.log(`✅ ${volunteersData.length} voluntarios procesados`);
  } catch (error) {
    console.error("❌ Error al insertar voluntarios:", error.message);
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

    await seedVolunteers();

    await mongoose.connection.close();
    console.log("🌳 Seed de voluntarios completado");
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

module.exports = { seedVolunteers };
