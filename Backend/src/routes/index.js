const authRoute = require("../1_routes/auth.route");
const activityRoute = require("../1_routes/activity.route");
const organizerRoute = require("../1_routes/organizer.route");
const publicRouter = require("../1_routes/public.route");
const volunteerRoute = require("../1_routes/volunteer.route");
const verifySessionMiddleware = require("../2_middlewares/verifySesion.middleware");

const setupRoutes = (app) => {
  // Rutas públicas
  app.use("/", publicRouter); // Contiene swagger y pong
  app.use("/auth", authRoute);

  // Middleware de autenticación
  app.use(verifySessionMiddleware);

  // Rutas privadas
  app.use("/v1/activities", activityRoute);
  app.use("/v1/organizers", organizerRoute);
  app.use("/v1/volunteers", volunteerRoute);
};

module.exports = setupRoutes;
