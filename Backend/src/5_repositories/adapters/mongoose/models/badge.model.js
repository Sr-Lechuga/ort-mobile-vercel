const mongoose = require("mongoose");
const { BADGE_TYPES, BADGE_STRATEGIES } = require("../../../../utils/constants");

// Modelo que define los tipos de badges disponibles en el sistema
const badgeSchema = new mongoose.Schema(
  {
    // Identificador único del badge (ej: "participation_5", "comment_1", "hours_10")
    badgeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Tipo de badge según BADGE_TYPES
    type: {
      type: String,
      required: true,
      enum: Object.values(BADGE_TYPES),
    },

    // Nivel dentro del tipo (ej: 5, 10, 20 para participation)
    level: {
      type: Number,
      required: true,
      min: 1,
    },

    // Información visible para el usuario
    title: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      required: true,
      maxLength: 255,
    },

    // URL de la imagen del badge
    imageUrl: {
      type: String,
      required: true,
    },

    // Nombre de la estrategia que se usa para calcular este badge
    strategy: {
      type: String,
      required: true,
      enum: Object.values(BADGE_STRATEGIES),
      // Solo permite las estrategias definidas en BADGE_STRATEGIES
    },

    // Configuración específica de la estrategia (parámetros para el cálculo)
    strategyConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      // Ejemplo: { threshold: 10 } para badges de horas, participaciones o comentarios
    },

    // Si el badge está activo en el sistema
    active: {
      type: Boolean,
      default: true,
    },

    // Prioridad visual (badges más importantes primero)
    priority: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    collection: "badges",
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

// Índice compuesto para búsquedas eficientes
badgeSchema.index({ type: 1, level: 1 });

const Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge;
