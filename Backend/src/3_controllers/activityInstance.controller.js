const {
  activityInstancesSelect,
} = require("../4_services/activityInstances.service");

const getActivityInstances = async (req, res) => {
  try {
    const activityInstances = await activityInstancesSelect(req.query);
    if (activityInstances.length == 0) {
      res.status(204).json({ message: "No hay instancias para mostrar" });
      return;
    }
    res.status(200).json({ activityInstances });
  } catch (err) {
    console.log("=====> ERROR ON GET ACTIVITY INSTANCES: ", err);
    res.status(500).json({ message: "Algo no salió correctamente" });
  }
};

module.exports = {
  getActivityInstances,
};
