const { verifyToken } = require("../4_services/helpers/jwt.helper");

const verifySesion = async (req, res, next) => {
  // In case the token comes with the "Bearer " prefix, we need to remove it
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  const decodedUserData = verifyToken(token);

  if (!token || !decodedUserData) {
    res.send(401).json({
      message: "Sesión expirada o inválida. Por favor inicie sesión nuevamente",
    });
    return;
  }

  req.session = decodedUserData;
  next();
};

module.exports = verifySesion;
