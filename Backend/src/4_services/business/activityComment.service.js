const { findActivityInstanceById } = require("../../5_repositories/adapters/mongoose/activityInstance.repository");
const { findInscriptionByVolunteerAndInstance } = require("../../5_repositories/adapters/mongoose/inscription.repository");
const {
  insertActivityComment,
  findActivityCommentByVolunteerAndInstance,
} = require("../../5_repositories/adapters/mongoose/activityComment.repository");
const badgeService = require("./badge.service");

const createActivityInstanceComment = async (volunteerId, activityId, instanceId, commentPayload) => {
  const instance = await findActivityInstanceById(instanceId);
  if (!instance) throw new Error("ERROR 001, No se encontró la Instancia");

  if (instance.activity.toString() !== activityId) {
    throw new Error("ERROR 012, La instancia no pertenece a la actividad indicada");
  }

  const inscription = await findInscriptionByVolunteerAndInstance(volunteerId, instanceId);
  if (!inscription) {
    throw new Error("ERROR 013, No estás inscripto en esta instancia");
  }

  if (!inscription.accepted) {
    throw new Error("ERROR 014, La inscripción aún no fue aceptada");
  }

  if (!inscription.assisted) {
    throw new Error("ERROR 015, Solo puedes comentar actividades a las que asististe");
  }

  const existingComment = await findActivityCommentByVolunteerAndInstance(volunteerId, instanceId);
  if (existingComment) {
    throw new Error("ERROR 016, Ya registraste un comentario para esta instancia");
  }

  const newCommentData = {
    volunteer: volunteerId,
    activity: activityId,
    instance: instanceId,
    inscription: inscription._id,
    comment: commentPayload.comment,
    rating: commentPayload.rating,
    anonymous: commentPayload.anonymous ?? false,
  };

  const createdComment = await insertActivityComment(newCommentData);

  try {
    await badgeService.checkAndAwardBadges(volunteerId);
  } catch (error) {
    console.error("Error al verificar badges después de crear comentario:", error.message);
  }

  return createdComment;
};

module.exports = {
  createActivityInstanceComment,
};

