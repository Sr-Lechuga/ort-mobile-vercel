const { activitiesSelect, activityInsert, activitySelectById } = require("../4_services/activity.service");
const { activityInstanceInsert, activityInstanceAddInscription, activityInstanceUpdate } = require("../4_services/activityInstances.service");
const { checkOwnership } = require("./helpers/ownership.helper");

const getActivities = async (req, res, next) => {
  try {
    const activities = await activitiesSelect(req.query);
    res.status(200).json({ activities });
  } catch (err) {
    err.placeOfError = "Error en obtener actividades";
    next(err);
  }
};

const postActivity = async (req, res, next) => {
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

const patchActivity = async (req, res, next) => {
  try {
    const { activityId } = req.params

    // OWNERSHIP CHECK
    const isOwner = checkOwnership(res, activitySelectById, activityId, "Actividad", req.session.id)

    if (isOwner) {
      const newActivityData = { ...req.body }
      const newData = await activityInsert(activityId, newActivityData)
      res.status(201).json({ newData })
    }
  }
  catch (err) {
    err.placeOfError = "Error en editar (patch) actividad"
    next(err)
  }
};

const postActivityInstance = async (req, res, next) => {
  try {
    const { activityId } = req.params

    // OWNERSHIP CHECK
    const isOwner = await checkOwnership(res, activitySelectById, activityId, "Actividad", req.session.id)

    if (isOwner) {
      const newActivityInstance = { activity: id, ...req.body }
      const insertedActivityInstance = await activityInstanceInsert(newActivityInstance)
      res.status(201).json({ insertedActivityInstance })
    }
  }
  catch (err) {
    err.placeOfError = "Error en insertar instancia de actividad"
    next(err)
  }
}

const patchActivityInstance = async (req, res, next) => {
  try {
    const { activityId, instanceId } = req.params

    // OWNERSHIP CHECK
    const isOwner = await checkOwnership(res, activitySelectById, instanceId, "Instance de Actividad", req.session.id)

    if (isOwner) {
      const newActivityInstanceData = { ...req.body }
      const newData = await activityInstanceUpdate(instanceId, newActivityInstanceData)
      res.status(201).json({ newData })
    }
  }
  catch (err) {
    err.placeOfError = "Error en insertar instancia de actividad"
    next(err)
  }
}

const postInstanceInscription = async (req, res, next) => {
  try {
    const volunteerId = req.session.id
    const { activityId, instanceId } = req.params

    if (!volunteerId || !activityId || !instanceId) {
      res.status(400).json({ message: "Faltan datos" })
    }

    const newInscription = await activityInstanceAddInscription(instanceId, volunteerId)
    res.status(200).json({
      message: "Inscripción realizada correctamente",
      inscription: newInscription
    })
  }
  catch (err) {
    err.placeOfError = "Error en inscripcion de voluntario en instancia"
    next(err)
  }
}

module.exports = {
  getActivities,
  postActivity,
  patchActivity,
  postActivityInstance,
  patchActivityInstance,
  postInstanceInscription
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