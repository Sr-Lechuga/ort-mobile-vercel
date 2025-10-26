//-------------------------------------------------- Constants ------------------------------------------------------------
const DEFAULT_PAGE = 1;
const DEFAULT_ELEMENT_LIMIT = 10;
const DEFAULT_OFFSET = 0;
const DEFAULT_SORT = "createdAt";
const DEFAULT_SORT_ORDER = "desc";
const DEFAULT_SORT_BY = "createdAt";

//-------------------------------------------------- Security Constants ------------------------------------------------------------
const SALT_ROUNDS = 6;
const JWT_EXPIRATION = "24h";
const RATE_LIMIT_WINDOW_ATTEMPTS = 30;
const RATE_LIMIT_WINDOW_MS = 1 * 60 * 1000;

//-------------------------------------------------- Cache Constants ------------------------------------------------------------
const DEFAULT_TTL = 60 * 60 * 24; // 24 hours
// TTL específicos para diferentes tipos de cache - valores por defecto
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

//-------------------------------------------------- Volunteer Constants ------------------------------------------------------------
const VOLUNTEER_GENRE = ["hombre", "mujer", "no especificado"];

//-------------------------------------------------- Activity Constants ------------------------------------------------------------
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
  SALT_ROUNDS,
  JWT_EXPIRATION,
  DEFAULT_PAGE,
  DEFAULT_ELEMENT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_SORT,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  RATE_LIMIT_WINDOW_ATTEMPTS,
  RATE_LIMIT_WINDOW_MS,
};
