const mongoose = require('mongoose')

const organizerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, unique: true, match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/, maxLength: 70 },
    contactEmail: { type: String, unique: true, match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/, maxLength: 70 },
    password: { type: String, required: true, minLength: 6 },
    name: { type: String, required: true, minLength: 2, maxLength: 50 },
    telephone: { type: String, maxLength: 25 },
    social: {
      instagram: { type: String, maxLength: 25 },
      facebook: { type: String, maxLength: 25 },
      linkedIn: { type: String, maxLength: 25 },
      personal: { type: String, maxLength: 120 }
    },
    location: {
      country: { type: String, required: true, maxLength: 25 },
      city: { type: String, required: true, maxLength: 25 },
      address: { type: String, required: true, maxLength: 255 },
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  {
    timestamps: true,
    collection: 'organizers',
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v
        delete ret.password
      }
    }
  }
)

const Organizer = mongoose.model('Organizer', organizerSchema)

module.exports = Organizer