const USER_VOLUNTEER = "volunteer";
const USER_ORGANIZER = "organizer";
const VOLUNTEER_GENRE = ["hombre", "mujer", "no especificado"];
const ACTIVITY_CATEGORIES = [
  "social",
  "ambiental",
  "educativo",
  "cultural",
  "salud",
  "emergencia",
];
const ACTIVITY_STATUS = [
  "inactiva",
  "programado",
  "cerrado",
  "en curso",
  "finalizado",
];
const ACTIVITY_INSTANCE_STATUS = ["pending", "confirmed", "cancelled"];

module.exports = {
  USER_VOLUNTEER,
  USER_ORGANIZER,
  ACTIVITY_CATEGORIES,
  VOLUNTEER_GENRE,
  ACTIVITY_STATUS,
  ACTIVITY_INSTANCE_STATUS,
};
