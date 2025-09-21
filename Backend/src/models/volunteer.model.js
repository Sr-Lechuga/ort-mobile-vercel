const mongoose = require('mongoose')
const { VOLUNTEER_GENRE } = require('../utils/constants')

const volunteerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, unique: true, match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/, maxLength: 70 },
    password: { type: String, required: true, minLength: 6, maxLength: 30 },
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    lastname: { type: String, required: true, minLength: 3, maxLength: 30 },
    age: { type: Number, requird: true, min: 18, max: 110 },
    genre: { type: String, enum: [...VOLUNTEER_GENRE] }
  },
  {
    timestamps: true,
    collection: 'volunteers'
  }
)

const Volunteer = mongoose.model('Volunteer', volunteerSchema)

module.exports = Volunteer