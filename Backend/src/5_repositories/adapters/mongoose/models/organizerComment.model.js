const mongoose = require("mongoose");

const organizerCommentSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
    instance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActivityInstance",
      required: true,
    },
    inscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inscription",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "La calificación mínima es 1"],
      max: [5, "La calificación máxima es 5"],
    },
    anonymous: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "organizerComments",
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

organizerCommentSchema.index({ volunteer: 1, organizer: 1 }, { unique: true, name: "uq_comment_volunteer_organizer" });

const OrganizerComment = mongoose.model("OrganizerComment", organizerCommentSchema);

module.exports = OrganizerComment;
