const { findActivityInstanceById } = require("../../5_repositories/adapters/mongoose/activityInstance.repository");

const updateInstanceInscriptionsOpen = async (instanceId) => {
  const instance = await findActivityInstanceById(instanceId);
  await instance.populate("inscriptions");
  const { slots, inscriptions } = instance;

  if (slots === null || slots === undefined) return;

  const nAccepted = inscriptions.filter((ins) => ins.accepted).length;

  instance.inscriptionsOpen = slots > nAccepted;
  await instance.save();
};

module.exports = {
  updateInstanceInscriptionsOpen,
};
