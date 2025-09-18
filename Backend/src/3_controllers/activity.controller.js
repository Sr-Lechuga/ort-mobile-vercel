const { activitiesSelect } = require("../4_services/activity.service")

const getActivities = async (req, res) => {
  try {
    const activities = await activitiesSelect(req.query)
    res.status(200).json({ activities })
  }
  catch (err) {
    console.log('=====> ERROR ON GET ACTIVITIES: ', err)
    res.status(500).json({ message: 'Algo no salió correctamente' })
  }
}

module.exports = {
  getActivities
}