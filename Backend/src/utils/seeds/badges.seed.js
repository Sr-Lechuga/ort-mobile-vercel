const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../../config/mongodb");
const Badge = require("../../5_repositories/adapters/mongoose/models/badge.model");
const { BADGE_TYPES, BADGE_STRATEGIES } = require("../constants");

/**
 * Script para inicializar badges en la base de datos
 * Debe ejecutarse manualmente o automáticamente al iniciar la aplicación
 */

const badgesToInsert = [
  // Badges de Participación
  {
    badgeId: "participation_5",
    type: BADGE_TYPES.PARTICIPATION,
    level: 5,
    title: "Explorador Solidario",
    description: "Completa 5 actividades verificadas",
    imageUrl: "/images/badges/participation_5.png",
    strategy: BADGE_STRATEGIES.PARTICIPATION_COUNT,
    strategyConfig: { threshold: 5 },
    active: true,
    priority: 1,
  },
  {
    badgeId: "participation_10",
    type: BADGE_TYPES.PARTICIPATION,
    level: 10,
    title: "Comprometido",
    description: "Completa 10 actividades verificadas",
    imageUrl: "/images/badges/participation_10.png",
    strategy: BADGE_STRATEGIES.PARTICIPATION_COUNT,
    strategyConfig: { threshold: 10 },
    active: true,
    priority: 2,
  },
  {
    badgeId: "participation_20",
    type: BADGE_TYPES.PARTICIPATION,
    level: 20,
    title: "Guerrero Solidario",
    description: "Completa 20 actividades verificadas",
    imageUrl: "/images/badges/participation_20.png",
    strategy: BADGE_STRATEGIES.PARTICIPATION_COUNT,
    strategyConfig: { threshold: 20 },
    active: true,
    priority: 3,
  },
  {
    badgeId: "participation_50",
    type: BADGE_TYPES.PARTICIPATION,
    level: 50,
    title: "Leyenda Solidaria",
    description: "Completa 50 actividades verificadas",
    imageUrl: "/images/badges/participation_50.png",
    strategy: BADGE_STRATEGIES.PARTICIPATION_COUNT,
    strategyConfig: { threshold: 50 },
    active: true,
    priority: 4,
  },

  // Badges de Horas
  {
    badgeId: "hours_10",
    type: BADGE_TYPES.HOURS,
    level: 10,
    title: "Primeros Pasos",
    description: "Acumula 10 horas de voluntariado",
    imageUrl: "/images/badges/hours_10.png",
    strategy: BADGE_STRATEGIES.HOURS_ACCUMULATED,
    strategyConfig: { threshold: 10 },
    active: true,
    priority: 1,
  },
  {
    badgeId: "hours_50",
    type: BADGE_TYPES.HOURS,
    level: 50,
    title: "Experiencia Valiosa",
    description: "Acumula 50 horas de voluntariado",
    imageUrl: "/images/badges/hours_50.png",
    strategy: BADGE_STRATEGIES.HOURS_ACCUMULATED,
    strategyConfig: { threshold: 50 },
    active: true,
    priority: 2,
  },
  {
    badgeId: "hours_100",
    type: BADGE_TYPES.HOURS,
    level: 100,
    title: "Veterano del Voluntariado",
    description: "Acumula 100 horas de voluntariado",
    imageUrl: "/images/badges/hours_100.png",
    strategy: BADGE_STRATEGIES.HOURS_ACCUMULATED,
    strategyConfig: { threshold: 100 },
    active: true,
    priority: 3,
  },

  // Badges de Comentarios (preparado para futuro)
  {
    badgeId: "comment_1",
    type: BADGE_TYPES.COMMENTS,
    level: 1,
    title: "Voz Comunitaria",
    description: "Realiza tu primer comentario",
    imageUrl: "/images/badges/comment_1.png",
    strategy: BADGE_STRATEGIES.COMMENT_COUNT,
    strategyConfig: { threshold: 1 },
    active: false, // Inactivo hasta que se implemente la funcionalidad
    priority: 1,
  },
];

/**
 * Inserta o actualiza los badges en la base de datos
 * Usa upsert para que sea idempotente
 */
const seedBadges = async () => {
  try {
    console.log("🌱 Iniciando seeding de badges...");

    const operations = badgesToInsert.map((badge) => ({
      updateOne: {
        filter: { badgeId: badge.badgeId },
        update: { $set: badge },
        upsert: true,
      },
    }));

    await Badge.bulkWrite(operations);
    console.log(`✅ ${badgesToInsert.length} badges procesados correctamente`);
  } catch (error) {
    console.error("❌ Error al insertar badges:", error.message);
    throw error;
  }
};

/**
 * Ejecuta el seeding
 */
const run = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();
    console.log("📊 Conectado a MongoDB");

    await seedBadges();

    await mongoose.connection.close();
    console.log("🌳 Seed de badges completado");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Ejecutar solo si se llama directamente, no deja importar este archivo
if (require.main === module) {
  run();
}

module.exports = { seedBadges };
