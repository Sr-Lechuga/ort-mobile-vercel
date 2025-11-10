/**
 * Convierte un valor de categorías en un arreglo normalizado
 * Recibe cadenas CSV o arreglos y devuelve un arreglo limpio sin valores vacíos
 * @param {string|string[]} categories - Valor recibido desde la consulta
 * @returns {string[]} - Arreglo de categorías normalizado
 */
const stringCategoriesToArray = (categories) => {
  if (!categories) {
    return [];
  }

  if (Array.isArray(categories)) {
    return categories.map((value) => String(value).trim()).filter(Boolean);
  }

  return String(categories)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
};

module.exports = { stringCategoriesToArray };
