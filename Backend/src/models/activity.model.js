const mongoose = require("mongoose");
const { ACTIVITY_CATEGORIES, ACTIVITY_STATUS } = require("../utils/constants");
//TODO: Es posible que neceite un cambio en este modelo por las instances

/*
  CATEGORIAS:
  Social/comunitario: apoyo a personas en situación de vulnerabilidad, ancianos, niños, refugiados.
  Ambiental: limpieza de playas, reforestación, conservación de fauna.
  Educativo/cultural: talleres, alfabetización, promoción del arte y la cultura.
  Salud: campañas de donación de sangre, jornadas médicas, apoyo en hospitales.
  Emergencias: ayuda en desastres naturales o crisis humanitarias.
*/

// ISODate format: YYYY-MM-DD || YYYY-MM-DDTHH:mm:ssZ

const activitySchema = new mongoose.Schema(
  {
    // Fields
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer", required: true },
    title: { type: String, required: true },
    categories: {
      type: [String],
      enum: [...ACTIVITY_CATEGORIES],
      required: true,
      validate: {
        validator: function (categories) {
          return 1 <= categories?.length && categories?.length <= 3;
        },
        message: "La actividad puede tener hasta un máximo de 3 categorias",
      },
    },
    description: { type: String },
    date: { type: Date, default: null },
    status: { type: String, enum: [...ACTIVITY_STATUS], default: "programado" },
    instances: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organizer", required: true }],
      default: [],
    },
    location: {
      country: { type: String, required: true, maxLength: 25 },
      city: { type: String, required: true, maxLength: 25 },
      address: { type: String, required: true, maxLength: 255 },
    },
    locationCoordinates: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (coordinates) {
            return coordinates?.length == 2;
          },
          message: "Las coordenadas deben ser [longitud, latitud]",
        },
      },
    },
  },
  {
    // Options
    timestamps: true,
    collection: "activities",
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

//Used to make geospacial queries
activitySchema.index({ locationCoordinates: "2dsphere" });

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
