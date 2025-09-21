const mongoose = require('mongoose')

const organizerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, unique: true, match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/, maxLength: 70 },
    contactEmail: { type: String, required: true, unique: true, match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/, maxLength: 70 },
    password: { type: String, required: true, minLength: 6, maxLength: 30 },
    name: { type: String, required: true, minLength: 2, maxLength: 50 },
    telephone: { type: String, maxLength: 25 },
    socialMedias: {
      instagram: { type: String, maxLength: 25 },
      facebook: { type: String, maxLength: 25 },
      linkedIn: { type: String, maxLength: 25 },
      personal: { type: String, maxLength: 120 }
    },
    direction: {
      country: { type: String, maxLength: 25 },
      city: { type: String, maxLength: 25 },
      street: { type: String, maxLength: 120 }
    },
    mapLocation: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  {
    timestamps: true,
    collection: 'organizers'
  }
)

const Organizer = mongoose.model('Organizer', organizerSchema)

module.exports = Organizer