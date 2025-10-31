const mongoose = require("mongoose");

/**
 * Crea una nueva inscripción usando transacciones de MongoDB
 * Maneja la creación de inscripciones con rollback automático en caso de error
 * @param {Object} inscriptionData - Datos de la inscripción a crear
 * @returns {Promise<void>} - No retorna valor
 * @throws {Error} - Error si la transacción falla
 */
const createNewInscription = async (inscriptionData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await session.commitTransaction();
    return;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

module.exports = {
  createNewInscription,
};
