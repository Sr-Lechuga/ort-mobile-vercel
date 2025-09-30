// requiredAccessLevel is an array of access levels that are required to access the route
// Require to have already verified the session
const verifyAccessLevel = (requiredAccessLevel) => {
  return (req, res, next) => {
    const { session } = req;

    if (!session || !session.userType) {
      return res.status(401).json({ message: "Sesión inválida o inexistente" });
    }

    if (!requiredAccessLevel.includes(session.userType)) {
      return res.status(403).json({ message: "No tienes permisos para acceder a esta ruta" });
    }

    next();
  };
};

module.exports = verifyAccessLevel;
