const { activityInsert } = require("../4_services/business/activity.service");
const { getOrganizerPublicProfile } = require("../4_services/business/organizer.service");
const { createOrganizerComment, getOrganizerCommentsSummary } = require("../4_services/business/organizerComment.service");

const postActivityByOrganizer = async (req, res, next) => {
  try {
    const { id } = req.session;
    const newActivity = { owner: id, ...req.body };
    const insertedActivity = await activityInsert(newActivity);
    res.status(201).json({ insertedActivity });
  } catch (err) {
    err.placeOfError = "Error en insertar actividad";
    next(err);
  }
};

const postOrganizerComment = async (req, res, next) => {
  try {
    const volunteerId = req.session.id;
    const { organizerId } = req.params;
    const { comment, rating, anonymous } = req.body;

    const createdComment = await createOrganizerComment(volunteerId, organizerId, { comment, rating, anonymous });

    res.status(201).json({
      message: "Comentario registrado con éxito",
      comment: createdComment,
    });
  } catch (err) {
    err.placeOfError = "Error en crear comentario para organizador";
    next(err);
  }
};

const getOrganizerComments = async (req, res, next) => {
  try {
    const { organizerId } = req.params;
    const summary = await getOrganizerCommentsSummary(organizerId);

    res.status(200).json({
      message: "Comentarios obtenidos correctamente",
      ...summary,
    });
  } catch (err) {
    err.placeOfError = "Error en obtener comentarios de organizador";
    next(err);
  }
};

const getOrganizerPublicProfileController = async (req, res, next) => {
  try {
    const { organizerId } = req.params;
    const profile = await getOrganizerPublicProfile(organizerId);

    if (!profile) {
      return res.status(404).json({
        message: "Organizador no encontrado",
      });
    }

    res.status(200).json({
      message: "Perfil público del organizador obtenido con éxito",
      organizer: profile,
    });
  } catch (err) {
    err.placeOfError = "Error en obtener perfil público de organizador";
    next(err);
  }
};

module.exports = {
  postActivityByOrganizer,
  postOrganizerComment,
  getOrganizerComments,
  getOrganizerPublicProfileController,
};
