require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const authRoute = require("./src/1_routes/auth.route")
const activityRoute = require("./src/1_routes/activity.route")
const verifySesion = require("./src/2_middlewares/verifySesion.middleware")
const connectDB = require("./src/config/mongodb")
const organizerRoute = require("./src/1_routes/organizer.route")
const errorHandler = require("./src/2_middlewares/errorHandler.middleware")
const Volunteer = require("./src/models/volunteer.model")
const Organizer = require("./src/models/organizer.model")

// Connection to Mongodb Atlas
connectDB()

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('working')
})

app.get('/test/volunteers', async (req, res) => {
  const volunteers = await Volunteer.find()
  res.json({ volunteers })
  return
})

app.get('/test/organizers', async (req, res) => {
  const organizers = await Organizer.find()
  res.json({ organizers })
  return
})

// Public Routes
app.use('/auth', authRoute)
app.use('/v1/actividades', activityRoute)

// Private Routes
app.use(verifySesion) // Session verify middleware
app.use('/v1/organizer', organizerRoute)

// Error Handler
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})