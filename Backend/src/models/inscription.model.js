const mongoose = require('mongoose')

const inscriptionSchema = mongoose.Schema(
  {
    volunteer: { type: mongoose.Schema.ObjectId, required: true },
    accepted: { type: boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now },
    assisted: { type: boolean, required: true, default: false }
  },
  {
    timestamps: true,
    collection: 'inscriptions',
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v
        delete ret.password
      }
    }
  }
)

const Inscription = mongoose.model('Inscription', inscriptionSchema)

module.exports = Inscription