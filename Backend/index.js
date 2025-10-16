require("dotenv").config();
require("./src/config/instrument");
const Sentry = require("@sentry/node");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimiter = require("./src/config/rateLimiter");
const connectDB = require("./src/config/mongodb");
const errorHandler = require("./src/2_middlewares/errorHandler.middleware");
const authRoute = require("./src/1_routes/auth.route");
const activityRoute = require("./src/1_routes/activity.route");
const organizerRoute = require("./src/1_routes/organizer.route");
const publicRouter = require("./src/1_routes/public.route");
const volunteerRoute = require("./src/1_routes/volunteer.route");

// Connection to Mongodb Atlas
connectDB();

const app = express();

// Middlewares
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", publicRouter); //Contains swagger and pong
app.use("/auth", authRoute);
app.use("/v1/activities", activityRoute);
app.use("/v1/organizers", organizerRoute);
app.use("/v1/volunteers", volunteerRoute);

// Sentry Error Handler
Sentry.setupExpressErrorHandler(app);
// Error Handler
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
