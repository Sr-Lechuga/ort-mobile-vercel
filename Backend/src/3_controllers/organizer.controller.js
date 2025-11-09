const { activityInsert } = require("../4_services/business/activity.service");
const { createOrganizerComment } = require("../4_services/business/organizerComment.service");

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

module.exports = {
  postActivityByOrganizer,
  postOrganizerComment,
};
