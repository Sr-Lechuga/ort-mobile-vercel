const mongoose = require("mongoose");

const activityCommentSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
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
    collection: "activityComments",
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

activityCommentSchema.index({ volunteer: 1, instance: 1 }, { unique: true, name: "uq_activity_comment_volunteer_instance" });

const ActivityComment = mongoose.model("ActivityComment", activityCommentSchema);

module.exports = ActivityComment;

