const { findInscriptionById, deleteInscriptionById } = require("../../5_repositories/adapters/mongoose/inscription.repository");
const { USER_VOLUNTEER } = require("../../utils/constants");
const { userLogin, userInsert } = require("../helpers/userAuth.helper");

const volunteerLogin = async (username, password) => {
  const token = await userLogin(username, password, USER_VOLUNTEER);
  return token;
};

const volunteerSignUp = async (volunteerData) => {
  await userInsert(volunteerData, USER_VOLUNTEER);
};

const deleteInscriptionService = async (volunteerId, inscriptionId) => {
  const inscription = await findInscriptionById(inscriptionId);

  if (!inscription) throw new Error("ERROR 001, No se encontró la Inscripción");
  if (inscription.volunteer != volunteerId) throw new Error("ERROR 011, La inscripción no te pertenece");

  await deleteInscriptionById(inscriptionId);
};

module.exports = {
  volunteerLogin,
  volunteerSignUp,
  deleteInscriptionService,
};
