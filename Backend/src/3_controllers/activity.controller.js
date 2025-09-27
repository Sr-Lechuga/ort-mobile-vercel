const {
  activityPostRequestSchema,
} = require("../2_middlewares/request_schemas/acitivityRequest.schema");
const {
  activitiesSelect,
  activityInsert,
} = require("../4_services/activity.service");

const getActivities = async (req, res) => {
  try {
    const activities = await activitiesSelect(req.query);
    if (activities.length == 0)
      res.status(204).json({ messages: "No hay actividades para mostrar" });
    res.status(200).json({ activities });
  } catch (err) {
    err.placeOfError = "Error en obtener actividades";
    next(err);
  }
};

const postActivity = async (req, res) => {
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
};

module.exports = {
  getActivities,
  postActivity,
};
