require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const authRoute = require("./src/1_routes/auth.route")

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('pong')
})

// Routes
app.use('/auth', authRoute)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})