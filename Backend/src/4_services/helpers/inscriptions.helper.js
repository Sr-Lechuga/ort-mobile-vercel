const mongoose = require("mongoose")

const createNewInscription = async (inscriptionData) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {

    await session.commitTransaction()
    return
  }
  catch (err) {
    await session.abortTransaction()
    throw err
  }
  finally {
    session.endSession()
  }
}

module.exports = {
  createNewInscription
}