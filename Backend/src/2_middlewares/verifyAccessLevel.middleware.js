// requiredAccessLevel is an array of access levels that are required to access the route
// Require to have already verified the session
const verifyAccessLevel = (requiredAccessLevel) => {
  return (req, res, next) => {
    const { session } = req;

    if (!requiredAccessLevel.find((accessLevel) => accessLevel === session.userType)) {
      res.status(403).json({ message: "No tienes permisos para acceder a esta ruta" });
      return;
    }

    next();
  };
};

module.exports = verifyAccessLevel;
