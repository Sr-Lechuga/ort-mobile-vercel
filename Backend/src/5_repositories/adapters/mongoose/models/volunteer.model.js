const mongoose = require("mongoose");
const { VOLUNTEER_GENRE } = require("../../../../utils/constants");

const volunteerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/,
      maxLength: 70,
    },
    password: { type: String, required: true, minLength: 6 },
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    lastname: { type: String, required: true, minLength: 3, maxLength: 30 },
    age: { type: Number, requird: true, min: 18, max: 110 },
    genre: { type: String, enum: [...VOLUNTEER_GENRE] },
    inscriptions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inscription",
          required: true,
        },
      ],
      default: [],
    },
    registrationDate: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    collection: "volunteers",
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
