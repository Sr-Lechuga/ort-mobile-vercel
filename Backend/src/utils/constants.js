//-------------------------------------------------- Cache Constants ------------------------------------------------------------
const DEFAULT_TTL = 60 * 60 * 24; // 24 hours

//-------------------------------------------------- User Types ------------------------------------------------------------
const USER_VOLUNTEER = "volunteer";
const USER_ORGANIZER = "organizer";
const VOLUNTEER_GENRE = ["hombre", "mujer", "no especificado"];
const ACTIVITY_CATEGORIES = ["social", "ambiental", "educativo", "cultural", "salud", "emergencia"];
const ACTIVITY_STATUS = ["inactiva", "en curso"];

module.exports = {
  DEFAULT_TTL,
  USER_VOLUNTEER,
  USER_ORGANIZER,
  ACTIVITY_CATEGORIES,
  VOLUNTEER_GENRE,
  ACTIVITY_STATUS,
};

/*
const ACTIVITY_STATUS = [
  "inactiva",
  "programado",
  "cerrado",
  "en curso",
  "finalizado",
];

  const ACTIVITY_INSTANCE_STATUS = ["pending", "confirmed", "cancelled"];
*/
