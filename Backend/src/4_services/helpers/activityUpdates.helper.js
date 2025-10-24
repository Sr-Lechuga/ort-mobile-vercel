const { findActivityById } = require("../../5_repositories/adapters/mongoose/activity.repository");

// Pre: It assumes the id is always correct
const updateActivityDate = async (activityId) => {
  const activity = await findActivityById(activityId);
  const { instances } = activity;

  const dateNow = new Date(Date.now());
  const futureActiveInstances = instances.filter((ins) => ins.date >= dateNow);

  if (futureActiveInstances.length == 0) {
    activity.date = null;
  } else {
    activity.date = futureActiveInstances.map((ins) => ins.date).sort((a, b) => a - b)[0];
  }
  await activity.save();
};

module.exports = {
  updateActivityDate,
};
