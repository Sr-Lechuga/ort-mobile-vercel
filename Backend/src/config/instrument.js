const Sentry = require("@sentry/node");

// Validar que el DSN de Sentry esté configurado
if (!process.env.SENTRY_DSN) {
  console.warn("⚠️ ADVERTENCIA: SENTRY_DSN no está configurado. El monitoreo de errores está deshabilitado.");
  console.warn("   Crea un archivo .env en Backend/ con la variable SENTRY_DSN");
}

// Solo inicializar Sentry si hay un DSN configurado
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    serverName: process.env.SERVER_NAME || "ORT_Movile_Backend",
    environment: process.env.ENVIRONMENT || "development",
  });
  console.log("✅ Sentry inicializado correctamente");
}

module.exports = Sentry;
