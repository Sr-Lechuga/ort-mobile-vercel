const { activitiesSelect, activityInsert, activitySelectById, activityLogicalDelete, activityUpdate, activitiesSelectByUsername } = require("../4_services/business/activity.service");
const { activityInstanceInsert, activityInstanceAddInscription, activityInstanceUpdate, activityInstanceSelectById } = require("../4_services/business/activityInstances.service");
const { updateInscriptionAttendance } = require("../4_services/business/inscription.service");
const { createActivityInstanceComment, getActivityCommentsSummary } = require("../4_services/business/activityComment.service");
const { checkOwnership } = require("./helpers/ownership.helper");

const getActivities = async (req, res, next) => {
  try {
    const activities = await activitiesSelect(req.query);
    res.status(200).json({ activities });
  } catch (err) {
    err.placeOfError = "Error en obtener actividades";
    next(err);
  }
};

const getActivitiesByUsername = async (req, res, next) => {
  try {
    const { username } = req.params
    const { page } = req.query

    const pageNum = page ? Number(page) : 1

    const activities = await activitiesSelectByUsername(username, pageNum);
    res.status(200).json({ activities });
  } catch (err) {
    err.placeOfError = "Error en obtener actividades por username";
    next(err);
  }
};

const postActivity = async (req, res, next) => {
  try {
    const { id } = req.session;
    const { title, categories, description, location } = req.body

    const newActivity = { owner: id, title, categories, description, location };
    const insertedActivity = await activityInsert(newActivity);
    res.status(201).json({ insertedActivity });
  } catch (err) {
    err.placeOfError = "Error en insertar actividad";
    next(err);
  }
};

const patchActivity = async (req, res, next) => {
  try {
    const { activityId } = req.params;

    // OWNERSHIP CHECK
    const isOwner = await checkOwnership(res, activitySelectById, activityId, "Actividad", req.session.id);

    if (isOwner) {
      const newActivityData = { ...req.body };
      const newData = await activityUpdate(activityId, newActivityData);
      res.status(200).json({ insertedActivity: newData });
    }
  } catch (err) {
    err.placeOfError = "Error en editar (patch) actividad";
    next(err);
  }
};

const deleteActivity = async (req, res, next) => {
  try {
    const { activityId } = req.params;

    // OWNERSHIP CHECK
    const isOwner = await checkOwnership(res, activitySelectById, activityId, "Actividad", req.session.id);

    if (isOwner) {
      const deletedActivity = await activityLogicalDelete(activityId);
      res.status(200).json({
        message: "Actividad desactivada correctamente",
        deletedActivity,
      });
    }
  } catch (err) {
    err.placeOfError = "Error en desactivar actividad";
    next(err);
  }
};

const postActivityInstance = async (req, res, next) => {
  try {
    const { activityId } = req.params;

    // OWNERSHIP CHECK
    const isOwner = await checkOwnership(res, activitySelectById, activityId, "Actividad", req.session.id);

    if (isOwner) {
      const newActivityInstance = { owner: req.session.id, activity: activityId, ...req.body };
      const insertedActivityInstance = await activityInstanceInsert(newActivityInstance);
      res.status(201).json({ insertedActivityInstance });
    }
  } catch (err) {
    err.placeOfError = "Error en insertar instancia de actividad";
    next(err);
  }
};

const patchActivityInstance = async (req, res, next) => {
  try {
    const { activityId, instanceId } = req.params;

    // OWNERSHIP CHECK
    const isOwner = await checkOwnership(res, activityInstanceSelectById, instanceId, "Instance de Actividad", req.session.id);

    if (isOwner) {
      const newActivityInstanceData = { ...req.body };
      const newData = await activityInstanceUpdate(instanceId, newActivityInstanceData, activityId);
      res.status(200).json({ insertedActivityInstance: newData });
    }
  } catch (err) {
    err.placeOfError = "Error en actualizar instancia de actividad";
    next(err);
  }
};

const postInstanceInscription = async (req, res, next) => {
  try {
    const volunteerId = req.session.id;
    const { activityId, instanceId } = req.params;

    if (!volunteerId || !activityId || !instanceId) {
      res.status(400).json({ message: "Faltan datos" });
    }

    const newInscription = await activityInstanceAddInscription(instanceId, volunteerId);
    res.status(201).json({
      message: "Inscripción realizada exitosamente",
      inscription: newInscription,
    });
  } catch (err) {
    err.placeOfError = "Error en inscripcion de voluntario en instancia";
    next(err);
  }
};

const postActivityInstanceComment = async (req, res, next) => {
  try {
    const volunteerId = req.session.id;
    const { activityId, instanceId } = req.params;
    const { comment, rating } = req.body;

    const createdComment = await createActivityInstanceComment(volunteerId, activityId, instanceId, {
      comment,
      rating,
    });

    res.status(201).json({
      message: "Comentario registrado con éxito",
      comment: createdComment,
    });
  } catch (err) {
    err.placeOfError = "Error en crear comentario de instancia";
    next(err);
  }
};

const getActivityComments = async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const summary = await getActivityCommentsSummary(activityId);

    res.status(200).json({
      message: "Comentarios obtenidos correctamente",
      ...summary,
    });
  } catch (err) {
    err.placeOfError = "Error en obtener comentarios de actividad";
    next(err);
  }
};

///:activityId/instances/:instanceId/inscriptions/:inscriptionId/attendance"
const patchInscriptionAttendance = async (req, res, next) => {
  try {
    const { activityId, instanceId, inscriptionId } = req.params;
    const { assisted } = req.body;

    // Activity Ownership check
    const isOwner = await checkOwnership(res, activitySelectById, activityId, "Actividad", req.session.id);

    if (isOwner) {
      await updateInscriptionAttendance(inscriptionId, instanceId, assisted);
      res.status(200).json({ message: "Asistencia actualizada exitosamente" });
    }
  } catch (err) {
    err.placeOfError = "Error en actualizar asistencia de inscripción";
    next(err);
  }
};

module.exports = {
  getActivities,
  postActivity,
  patchActivity,
  deleteActivity,
  postActivityInstance,
  patchActivityInstance,
  postInstanceInscription,
  patchInscriptionAttendance,
  postActivityInstanceComment,
  getActivityComments,
  getActivitiesByUsername
};
