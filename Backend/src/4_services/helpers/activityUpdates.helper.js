const { findActivityById } = require("../../5_repositories/adapters/mongoose/activity.repository");

/**
 * Actualiza la fecha de una actividad basándose en sus instancias futuras
 * Si no hay instancias futuras, establece la fecha como null
 * Si hay instancias futuras, establece la fecha como la más próxima
 * @param {string} activityId - ID de la actividad a actualizar
 * @returns {Promise<void>} - No retorna valor
 */
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
