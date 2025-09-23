const { activitiesSelect } = require("../4_services/activity.service")

const getActivities = async (req, res) => {
  try {
    const activities = await activitiesSelect(req.query)
    res.status(200).json({ activities })
  }
  catch (err) {
    err.placeOfError = 'Error en obtener actividades'
    next(err)
  }
}

module.exports = {
  getActivities
}