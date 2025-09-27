const mongoose = require("mongoose");
const { ACTIVITY_INSTANCE_STATUS } = require("../utils/constants");

const activityInstanceSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.ObjectId, ref: "Organizer", required: true },
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
    date: {
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
    quota: {
      type: Number,
      min: [0, "La cantidad maxima de inscriptos debe ser positiva"]
    }
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

const ActivityInstance = mongoose.model(
  "ActivityInstance",
  activityInstanceSchema
);

module.exports = ActivityInstance;
