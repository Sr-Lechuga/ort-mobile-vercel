const {
  activityInstancesSelect,
  activityInstancesInsert,
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
    await activityInstancesInsert(newActivityInstance);

    res.status(201).json({
      message: "La instancia de la actividad se creo satisfactoriamente",
    });
  } catch (err) {
    //console.log("=====> ERROR ON CREATE ACTIVITY INSTANCES: ", err);
    res.status(500).json({ message: "Algo no salió correctamente" });
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
    //console.log("=====> ERROR ON GET ACTIVITY INSTANCES: ", err);
    res.status(500).json({ message: "Algo no salió correctamente" });
  }
};

module.exports = {
  getActivityInstances,
  postActivityInstances,
};
