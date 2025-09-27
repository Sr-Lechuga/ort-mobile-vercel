const { activitiesSelect, activityInsert, activitySelectById } = require("../4_services/activity.service");
const { activityInstanceInsert } = require("../4_services/activityInstances.service");
const { isActivityOwner } = require("./helpers/ownership.helper");

const getActivities = async (req, res) => {
  try {
    const activities = await activitiesSelect(req.query);
    res.status(200).json({ activities });
  } catch (err) {
    err.placeOfError = "Error en obtener actividades";
    next(err);
  }
};

const postActivity = async (req, res) => {
  try {
    const { id } = req.session
    const newActivity = { owner: id, ...req.body }
    const insertedActivity = await activityInsert(newActivity)
    res.status(201).json({ insertedActivity })
  }
  catch (err) {
    err.placeOfError = "Error en insertar actividad"
    next(err)
  }
};

const postActivityInstance = async (req, res) => {
  try {
    const { id } = req.params // Activity Id

    const activity = await activitySelectById(id)
    if (!activity) {
      res.status(400).json({ message: "La actividad no existe o es incorrecta" })
      return
    }
    // OWNERSHIP CHECK
    if (!isActivityOwner(activity, req.session.id)) {
      res.status(409).json({ message: "No puedes generar la instancia porque la actividad no te pertenece" })
      return
    }

    const newActivityInstance = { activity: id, ...req.body }
    const insertedActivityInstance = await activityInstanceInsert(newActivityInstance)
    res.status(201).json({ insertedActivityInstance })
  }
  catch (err) {
    err.placeOfError = "Error en insertar instancia de actividad"
    next(err)
  }
}

module.exports = {
  getActivities,
  postActivity,
  postActivityInstance
};

/*
  const {
    title,
    categories,
    description,
    date,
    status,
    location,
    locationCoordinates,
  } = req.body;

  try {
    const newActivity = {
      title,
      categories,
      description,
      date,
      status,
      location,
      locationCoordinates,
    };

    await activityInsert(newActivityInstance);

    res.status(201).json({
      message: "La actividad se creo satisfactoriamente",
    });
  } catch (err) {
    err.placeOfError = "Error al crear una actividad";
    next(err);
  }
*/