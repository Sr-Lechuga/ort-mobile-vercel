require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const authRoute = require("./src/1_routes/auth.route");
const publicRouter = require("./src/1_routes/public.route");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoute);
app.use("/public", publicRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
