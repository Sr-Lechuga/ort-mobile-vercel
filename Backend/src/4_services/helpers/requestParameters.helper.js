const bufferOffset = (page, limit) => {
  limit = bufferElementLimit(limit);
  page = page <= 0 ? 1 : page;
  return (parseInt(page) - 1) * parseInt(limit);
};

const bufferElementLimit = (limit) => {
  return limit <= 0 || limit > 20 ? 20 : limit;
};

const geoLocationRadiusFilter = (lat, lng, radius) => {
  if (lat && lng && radius) {
    return {
      geoLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius, 10), // in meters
        },
      },
    };
  }
  return null;
};

module.exports = {
  bufferOffset,
  bufferElementLimit,
  geoLocationRadiusFilter,
};
