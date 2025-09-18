const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.ATLAS_URI)
    console.log('Server connected to Atlas')
  }
  catch (err) {
    console.log('=====> ERROR CONNECTING TO ATLAS: ', err)
  }
}

module.exports = connectDB