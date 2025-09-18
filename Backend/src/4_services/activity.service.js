const { findActivities } = require("../5_repositories/activity.repository")
const { createDate } = require("../utils/datesHandler")

const activitiesSelect = async (requestQuery) => {
  const filters = {}
  const { category, location, minDate, maxDate, page = 1, limit = 10 } = requestQuery

  if (limit <= 0 || limit > 10) limit = 10
  const skip = (parseInt(page) - 1) * parseInt(limit)
  const pagination = { skip, limit }

  if (category) filters.category = category
  if (location) filters.location = new RegExp(location, 'i') // 'i' = Case insensitive
  if (minDate) {
    const isValid = createDate(minDate)
    if (isValid) filters.date = { $gte: isValid }
  }
  if (maxDate) {
    const isValid = createDate(maxDate)
    if (isValid) filters.date = { ...(filters.date || {}), $lte: isValid }
  }

  const activities = await findActivities(filters, pagination)

  return activities
}

module.exports = {
  activitiesSelect
}