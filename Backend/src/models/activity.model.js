const mongoose = require('mongoose')
const { ACTIVITY_CATEGORIES } = require('../utils/constants')

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
  { // Fields
    owner: { type: mongoose.Schema.ObjectId, ref: 'Volunteer', required: true },
    title: { type: String, required: true },
    categories: {
      type: [String],
      enum: [...ACTIVITY_CATEGORIES],
      required: true,
      validate: {
        validator: function (categories) {
          return categories?.length <= 3
        },
        message: 'La actividad puede tener hasta un máximo de 3 categorias'
      }
    },
    description: { type: String },
    date: { type: Date, required: true },
    status: { type: String, enum: ['inactiva', 'programado', 'en curso', 'finalizado'] },
    open: { type: Boolean, required: true, default: true },
    volunteers: {
      type: [
        {
          id: { type: mongoose.Schema.ObjectId, ref: 'Volunteer', required: true },
          username: String,
          name: String,
          email: String
        }
      ],
      default: []
    }
  },
  { // Options
    timestamps: true,
    collection: 'activities'
  }
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity