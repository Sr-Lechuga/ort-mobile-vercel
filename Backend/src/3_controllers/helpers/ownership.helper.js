const isActivityOwner = (activity, organizerId) => {
  return activity?.id == organizerId
}

module.exports = {
  isActivityOwner
}