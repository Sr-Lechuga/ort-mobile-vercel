const mongoose = require("mongoose")

const inscriptionSchema = mongoose.Schema(
  {
    volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", required: true },
    instance: { type: mongoose.Schema.Types.ObjectId, ref: "ActivityInstance", required: true },
    accepted: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now },
    assisted: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
    collection: "inscriptions",
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v
        delete ret.password
      }
    }
  }
)

inscriptionSchema.post("findOneAndDelete", async function (doc) {
  try {
    await mongoose.model("ActivityInstance").findByIdAndUpdate(
      doc.instance,
      { $pull: { inscriptions: doc._id } }
    );
    await mongoose.model("Volunteer").findByIdAndUpdate(
      doc.volunteer,
      { $pull: { inscriptions: doc._id } }
    );
  } catch (err) {
    err.placeOfError = "Post delete en inscriptionSchema"
    next(err);
  }
})


inscriptionSchema.post("save", async function (doc, next) {
  try {
    await mongoose.model("ActivityInstance").findByIdAndUpdate(
      doc.instance,
      { $push: { inscriptions: doc._id } }
    );
    await mongoose.model("Volunteer").findByIdAndUpdate(
      doc.volunteer,
      { $push: { inscriptions: doc._id } }
    );
    next();
  } catch (err) {
    err.placeOfError = "Post save en inscriptionSchema"
    next(err);
  }
})

const Inscription = mongoose.model("Inscription", inscriptionSchema)

module.exports = Inscription