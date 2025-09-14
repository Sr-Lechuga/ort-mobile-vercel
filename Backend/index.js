import 'dotenv/config.js'
import express from 'express'
import morgan from 'morgan'

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('pong')
})

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})