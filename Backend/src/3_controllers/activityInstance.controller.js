const {
  activityInstancesSelect,
  activityInstanceInsert,
} = require("../4_services/activityInstances.service");

const postActivityInstances = async (req, res) => {
  const {
    activity,
    startDate,
    duration,
    location,
    locationCoordinates,
    status,
  } = req.body;
  const inscriptionsAmount = 0; //By default inscriptions must be 0

  try {
    const newActivityInstance = {
      activity,
      startDate,
      duration,
      location,
      locationCoordinates,
      status,
      inscriptionsAmount,
    };
    await activityInstanceInsert(newActivityInstance);

    res.status(201).json({
      message: "La instancia de la actividad se creo satisfactoriamente",
    });
  } catch (err) {
    err.placeOfError = "Error al crear una instancia de actividad";
    next(err);
  }
};

const getActivityInstances = async (req, res) => {
  const { location, status, minDate, maxDate, page, limit, lat, lng, radius } =
    req.query;
  try {
    const parameters = {
      location,
      status,
      minDate,
      maxDate,
      page,
      limit,
      lat,
      lng,
      radius,
    };
    const activityInstances = await activityInstancesSelect(parameters);

    if (activityInstances.length == 0) {
      res.status(204).json({ message: "No hay instancias para mostrar" });
      return;
    }
    res.status(200).json({ activityInstances });
  } catch (err) {
    err.placeOfError = "Error en obtener instancias de actividades";
    next(err);
  }
};

module.exports = {
  getActivityInstances,
  postActivityInstances,
};
