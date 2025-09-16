require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const { userRoute } = require('./src/routes/user.route.js')

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('pong')
})

app.use('/auth', userRoute)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})