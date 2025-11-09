const { findOrganizerById } = require("../../5_repositories/adapters/mongoose/organizer.repository");
const {
  findOrganizerCommentByVolunteerAndOrganizer,
  insertOrganizerComment,
  findOrganizerCommentsByOrganizer,
  getOrganizerCommentsStats,
} = require("../../5_repositories/adapters/mongoose/organizerComment.repository");
const { findInscriptionByVolunteerAndInstance, findAssistedInstanceIdsByVolunteer } = require("../../5_repositories/adapters/mongoose/inscription.repository");
const { findActivityInstanceByIdsAndOwner } = require("../../5_repositories/adapters/mongoose/activityInstance.repository");
const badgeService = require("./badge.service");

const createOrganizerComment = async (volunteerId, organizerId, commentPayload) => {
  const organizer = await findOrganizerById(organizerId);
  if (!organizer) {
    throw new Error("ERROR 017, El centro no existe");
  }

  const existingComment = await findOrganizerCommentByVolunteerAndOrganizer(volunteerId, organizerId);
  if (existingComment) {
    throw new Error("ERROR 018, Ya registraste un comentario para este centro");
  }

  const assistedInstanceIds = await findAssistedInstanceIdsByVolunteer(volunteerId);
  if (!assistedInstanceIds?.length) {
    throw new Error("ERROR 019, Debes haber asistido a una actividad de este centro antes de comentar");
  }

  const relatedInstance = await findActivityInstanceByIdsAndOwner(assistedInstanceIds, organizerId);
  if (!relatedInstance) {
    throw new Error("ERROR 019, Debes haber asistido a una actividad de este centro antes de comentar");
  }

  const relatedInscription = await findInscriptionByVolunteerAndInstance(volunteerId, relatedInstance._id);
  if (!relatedInscription || !relatedInscription.accepted || !relatedInscription.assisted) {
    throw new Error("ERROR 020, Solo puedes comentar centros en los que tu asistencia fue registrada");
  }

  const newCommentData = {
    volunteer: volunteerId,
    organizer: organizerId,
    instance: relatedInstance._id,
    inscription: relatedInscription._id,
    comment: commentPayload.comment,
    rating: commentPayload.rating,
    anonymous: commentPayload.anonymous ?? false,
  };

  const createdComment = await insertOrganizerComment(newCommentData);

  try {
    await badgeService.checkAndAwardBadges(volunteerId);
  } catch (error) {
    console.error("Error al verificar badges después de comentar centro:", error.message);
  }

  return createdComment;
};

const getOrganizerCommentsSummary = async (organizerId) => {
  const comments = await findOrganizerCommentsByOrganizer(organizerId);
  const stats = await getOrganizerCommentsStats(organizerId);

  return {
    organizerId,
    totalComments: stats.totalComments,
    averageRating: Number(stats.averageRating?.toFixed?.(2) ?? 0),
    comments,
  };
};

module.exports = {
  createOrganizerComment,
  getOrganizerCommentsSummary,
};
