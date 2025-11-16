const Activity = require("./models/activity.model");
const { ACTIVITY_STATUS } = require("../../../utils/constants");

const findActivityById = async (id) => {
  return await Activity.findById(id).populate("instances");
};

const insertActivity = async (activityData) => {
  const newActivity = await Activity.create(activityData);
  return newActivity;
};

const updateActivity = async (id, activityData) => {
  const newData = await Activity.findByIdAndUpdate(id, activityData);
  return newData;
};

const findActivities = async (filters, pagination, geoOptions = null) => {
  const { skip, limit } = pagination;

  if (geoOptions?.coordinates) {
    const { coordinates, maxDistanceInMeters } = geoOptions;
    const hasFilters = filters && Object.keys(filters).length > 0;

    const pipeline = [
      {
        $geoNear: {
          near: { type: "Point", coordinates },
          distanceField: "distanceInKilometers",
          distanceMultiplier: 0.001,
          spherical: true,
          ...(hasFilters ? { query: filters } : {}),
          ...(maxDistanceInMeters ? { maxDistance: maxDistanceInMeters } : {}),
        },
      },
      {
        $addFields: {
          distanceInKilometers: { $round: ["$distanceInKilometers", 3] },
        },
      },
    ];

    if (skip > 0) {
      pipeline.push({ $skip: skip });
    }

    if (limit > 0) {
      pipeline.push({ $limit: limit });
    }

    pipeline.push(
      {
        $lookup: {
          from: "activityInstances",
          localField: "instances",
          foreignField: "_id",
          as: "instances",
        },
      },
      {
        $project: {
          __v: 0,
          "instances.__v": 0,
        },
      }
    );

    const results = await Activity.aggregate(pipeline);
    return results;
  }

  const results = await Activity.find(filters).skip(skip).limit(limit).populate("instances");
  return results;
};

const findActiveActivitiesByOwner = async (ownerId) => {
  return await Activity.find({ owner: ownerId, status: ACTIVITY_STATUS[1] }).select(["title", "categories", "date", "location", "status"]);
};

module.exports = {
  findActivityById,
  findActivities,
  insertActivity,
  updateActivity,
  findActiveActivitiesByOwner,
};
