const Activity = require('../models/activity.model')

const findActivities = async (filters = {}, pagination = { skip: 0, limit: 10 }) => {
  const { skip, limit } = pagination
  const results = await Activity.find(filters).skip(skip).limit(limit)
  return results
}

module.exports = {
  findActivities
}