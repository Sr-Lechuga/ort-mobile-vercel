const { activityInsert } = require("../4_services/business/activity.service");

const postActivityByOrganizer = async (req, res) => {
  try {
    const { id } = req.session;
    const newActivity = { owner: id, ...req.body };
    const insertedActivity = await activityInsert(newActivity);
    res.status(201).json({ insertedActivity });
  } catch (err) {
    err.placeOfError = "Error en insertar actividad";
    next(err);
  }
};

module.exports = {
  postActivityByOrganizer,
};
