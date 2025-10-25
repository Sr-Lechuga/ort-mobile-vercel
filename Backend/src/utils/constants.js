//-------------------------------------------------- Cache Constants ------------------------------------------------------------
const DEFAULT_TTL = 60 * 60 * 24; // 24 hours

// TTL específicos para diferentes tipos de cache
const CACHE_TTL = {
  ACTIVITIES_LIST: 60 * 60, // 1 hora - listas de actividades
  ACTIVITY_DETAIL: 60 * 60 * 2, // 2 horas - detalles de actividad individual
  ACTIVITY_INSTANCE: 60 * 30, // 30 minutos - instancias de actividad
  OWNERSHIP_CHECK: 60 * 15, // 15 minutos - validaciones de ownership
  USER_DATA: 60 * 60, // 1 hora - datos de usuario
};

//-------------------------------------------------- User Types ------------------------------------------------------------
const USER_VOLUNTEER = "volunteer";
const USER_ORGANIZER = "organizer";
const VOLUNTEER_GENRE = ["hombre", "mujer", "no especificado"];
const ACTIVITY_CATEGORIES = ["social", "ambiental", "educativo", "cultural", "salud", "emergencia"];
const ACTIVITY_STATUS = ["inactiva", "en curso"];

module.exports = {
  DEFAULT_TTL,
  CACHE_TTL,
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
