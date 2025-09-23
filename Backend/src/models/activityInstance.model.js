const mongoose = require("mongoose");
const { ACTIVITY_INSTANCE_STATUS } = require("../utils/constants");

const activityInstanceSchema = new mongoose.Schema(
  {
    activity: {
      type: mongoose.Schema.ObjectId,
      ref: "Activity",
      required: true,
      validate: {
        // Validate activity exists, always an activity must exist to create an instance
        validator: async function (id) {
          const exists = await mongoose.model("Activity").exists({ _id: id });
          return !!exists;
        },
        message: "La actividad referenciada no existe",
      },
    },
    startDate: {
      type: Date,
      required: true,
      min: Date.now,
      immutable: true,
      validate: {
        validator: function (v) {
          return v >= new Date();
        },
        message: "La fecha de inicio debe ser la actual o una fecha futura",
      },
    },
    duration: {
      type: Number,
      required: true,
      min: [1, "La duración mínima es 1 minuto"],
      max: [24 * 60, "La duración máxima es 1440 minutos (24 horas)"],
    },
    location: {
      type: String,
      required: true,
      trim: true, //To avoid empty spaces at the beginning or at the end
      minLength: [3, "La ubicación debe tener al menos 3 caracteres"],
      maxLength: [255, "La ubicación debe tener menos de 255 caracteres"],
    },
    location_coordinates: {
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
    status: {
      type: String,
      enum: [...ACTIVITY_INSTANCE_STATUS],
      required: true,
    },
    inscriptionsAmount: {
      type: Number,
      required: true,
      min: [0, "La cantidad de inscriptos debe ser positiva"],
      default: 0,
    },
    //TODO: Update schemas logic
    /*inscriptions: {
      type: [inscriptionSchema],
      validate: {
        validator: function (inscriptions) {
          return inscriptions?.length >= 0;
        },
        message: "La cantidad de inscripciones debe ser positiva",
      },
    },*/
    //TODO: Update schemas logic
    /*last_comments: {
      type: [commentSchema],
      validate: {
        validator: function (comments) {
          return comments?.length <= 20;
        },
        message: "Solo se permiten hasta 20 comentarios",
      },
    },*/
  },
  {
    timestamps: true,
    collection: "activityInstances",
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

//Make sure no inserts on same date for same activity
activityInstanceSchema.index(
  { activity: 1, startDate: 1 },
  { unique: true, name: "uq_activity_start" }
);

//Used to make geospacial queries
activityInstanceSchema.index({ location: "2dsphere" });

const ActivityInstance = mongoose.model(
  "ActivityInstance",
  activityInstanceSchema
);

module.exports = ActivityInstance;
