const { activityInsert } = require("../4_services/business/activity.service");

const postActivityByOrganizer = async (req, res) => {
  try {
    const { id } = req.session;
    const newActivity = { owner: id, ...req.body };
    const insertedActivity = await activityInsert(newActivity);
    res.status(201).json({ insertedActivity });
  } catch (err) {
    console.log("ERROR EN INSERTAR ACTIVITY: ", err);
    res.status(500).json({ message: "Algo no salió correctamente" });
  }
};

module.exports = {
  postActivityByOrganizer,
};
