# Casos de Uso - Funcionalidades fuera del MVP

Casos de uso detallados para las funcionalidades RF-06, RF-15, RF-19, RF-20 y RF-21 a RF-24.

---

## UC-07 — Lista de Espera

**Código:** UC-07

**Requerimientos relacionados:** RF-06, RF-05

**Descripción:** Voluntarios pueden apuntarse a lista de espera cuando cupo está lleno; centro puede promover usuarios desde la lista.

**Pre-condiciones:** Voluntario autenticado; instancia con cupo lleno.

**Post-condiciones:** Voluntario añadido a lista de espera; centro recibe información sobre orden y cantidad.

**Secuencia normal:**

1. Usuario solicita inscripción y sistema detecta cupo lleno.
2. Sistema ofrece opción "Apuntarme a lista de espera".
3. Usuario acepta.
4. Sistema agrega al final de la cola y confirma.

**Secuencias alternativas — Actor:**

- A1: Usuario se retira de la lista → puede eliminar su entrada.

**Secuencias alternativas — Sistema:**

- S1: Se libera cupo → sistema notifica al primer en la lista (UC-14) y espera confirmación.

**Atributos:** Orden FIFO, timestamp de ingreso a lista.

---

## UC-26 — Gestionar Idiomas de Actividad

**Código:** UC-26

**Requerimientos relacionados:** RF-20

**Descripción:** Permitir que los centros seleccionen un idioma principal y opcionales secundarios al crear o editar una actividad. El sistema valida contra un catálogo maestro y propaga los metadatos para búsquedas y comunicaciones segmentadas.

**Pre-condiciones:** Centro autenticado; catálogo de idiomas disponible (ISO 639); actividad existente o flujo de creación en curso.

**Post-condiciones:** Actividad actualizada con etiquetas de idioma normalizadas; historial de cambios registrado y validación de integridad en búsquedas y notificaciones.

**Secuencia normal:**

1. Centro accede al formulario de creación o edición de actividad.
2. Selecciona idioma principal desde el catálogo y, opcionalmente, idiomas secundarios.
3. Sistema valida selección (evitar duplicados, requerir al menos uno).
4. Sistema guarda la actividad con metadatos de idioma, actualiza índices de búsqueda y reglas de segmentación.

**Secuencias alternativas — Actor:**

- A1: Centro no encuentra idioma → solicita agregarlo vía soporte o formulario de solicitud.
- A2: Centro decide remover idiomas secundarios → el sistema recalcula segmentación aplicable.

**Secuencias alternativas — Sistema:**

- S1: Catálogo de idiomas no disponible → sistema muestra mensaje y bloquea guardado hasta restablecer catálogo.
- S2: Inconsistencias con actividades existentes → marca la actividad para verificación manual y registra incidencia.

**Atributos:** Idioma principal obligatorio, hasta N idiomas secundarios configurables, códigos ISO 639-1 o 639-3, auditoría de cambios y fecha de última actualización.

---

## UC-14 — Notificar sobre Nuevas Actividades y Recordatorios

**Código:** UC-14

**Requerimientos relacionados:** RF-14, RF-15

**Descripción:** Enviar notificaciones (in-app/email) sobre confirmaciones, recordatorios, nuevas actividades relevantes (según intereses y cercanía).

**Pre-condiciones:** Voluntario con preferencias e información de contacto; triggers (nueva actividad, cambio o fecha próxima).

**Post-condiciones:** Notificación registrada y entregada (o en cola para reintento).

**Secuencia normal:**

1. Evento disparador (nueva actividad, cambio de estado, recordatorio previo a fecha).
2. Sistema calcula destinatarios (intereses, cercanía, inscriptos).
3. Genera mensaje y lo envía (in-app y/o email).
4. Registra envío en `notificaciones`.

**Secuencias alternativas — Actor:**

- A1: Usuario tiene notificaciones silenciadas → no recibirá.

**Secuencias alternativas — Sistema:**

- S1: Falla al enviar email → marcar para reintento por job.
- S2: Gran volumen de destinatarios → usar batching y control de tasa.

**Atributos:** tipo de notificación, prioridad, canal (in-app/email).

---

## UC-17 — Subir imágenes a Actividad

**Código:** UC-17

**Requerimientos relacionados:** RF-19

**Descripción:** Centro sube imágenes representativas de una actividad.

**Pre-condiciones:** Centro autenticado; permiso sobre la actividad.

**Post-condiciones:** Imágenes almacenadas en storage/CDN; URLs enlazadas a la actividad.

**Secuencia normal:**

1. Centro selecciona imágenes y las sube.
2. Sistema valida tipo y tamaño.
3. Sistema sube a storage y devuelve URLs.
4. Actualiza documento de actividad con URLs.

**Secuencias alternativas — Actor:**

- A1: Cancela subida → no se guarda.

**Secuencias alternativas — Sistema:**

- S1: Archivo muy grande → rechaza y muestra límite.
- S2: Storage falla → reintentar o mostrar error.

**Atributos:** formato permitido, límite de MB por archivo, cantidad máxima de imágenes.

---

## UC-21 — Recomendación de Actividades Personalizadas

**Código:** UC-21

**Requerimientos relacionados:** RF-21

**Descripción:** Motor de recomendación que sugiere actividades al voluntario basado en intereses, historial verificado y proximidad geográfica. Debe ser explicable y soportar fallback para usuarios nuevos.

**Pre-condiciones:** Voluntario autenticado; existencia de datos: intereses, historial o ubicación. Catálogo de actividades poblado.

**Post-condiciones:** Lista de actividades recomendadas con puntaje y motivo; registro de la recomendación (logs) para análisis.

**Secuencia normal:**

1. Usuario accede a la sección "Recomendaciones" o recibe recomendaciones proactivas (notificación).
2. Sistema recupera perfil: intereses, historial de participación, ubicación (si disponible).
3. Sistema ejecuta algoritmo de scoring (peso por intereses, proximidad, rating, recencia) y genera listado ordenado con scores.
4. Sistema muestra lista con la razón principal para cada ítem (p.ej. "cercano a tu ubicación" / "Relacionado con: Educación").
5. Usuario interactúa con resultados (ver detalle, inscribirse, guardar, descartar). Estas interacciones alimentan el modelo.

**Secuencias alternativas — Actor:**

- A1: Usuario sin datos suficientes → sistema sugiere completar intereses o muestra actividades populares.
- A2: Usuario modifica preferencias en el flujo → sistema re-calcula recomendaciones al vuelo.

**Secuencias alternativas — Sistema:**

- S1: Servicio de scoring no disponible → fallback a reglas simples (intereses directos, proximidad básica) o a actividades populares.
- S2: Latencia alta → devolver resultados parciales y cargar resto en background con indicador de progreso.

**Atributos/Validaciones:** Tolerancia a datos faltantes, log de razones, TTL de caché de recomendaciones.

---

## UC-22 — Reporte de Actividad e Impacto

**Código:** UC-22

**Requerimientos relacionados:** RF-22

**Descripción:** Interfaz y jobs que calculan métricas de impacto para centros y usuarios: número de participantes, tasa de asistencia, horas de voluntariado, evolución por periodo y por categoría.

**Pre-condiciones:** Datos de instancias, inscripciones y asistencias registrados y validados; permisos de centro para ver reportes.

**Post-condiciones:** Panel de KPIs visible en backoffice; posibilidad de exportar los reportes a CSV/PDF; almacenado del histórico de reportes.

**Secuencia normal:**

1. Centro accede al módulo "Reportes" y selecciona rango de fechas y filtros (categoría, actividad específica).
2. Sistema solicita o ejecuta jobs para agregar datos (si no están precomputados).
3. Sistema devuelve KPIs: total participantes, asistencias validadas, horas totales, tasa de conversión inscripción→asistencia, top actividades por asistencia.
4. Centro puede exportar el reporte en PDF/CSV o programar envíos periódicos.

**Secuencias alternativas — Actor:**

- A1: Solicita export con filtros personalizados → sistema los aplica antes de generar.

**Secuencias alternativas — Sistema:**

- S1: Datos recientes no agregados → trigger job de agregación y mostrar estado "en curso" hasta completar.
- S2: Error en generación de PDF → encolar job de generación y notificar cuando esté listo.

**Atributos/Validaciones:** Nivel de granularidad (diario/semanal/mensual), manejo de zonas horarias, integridad de datos para calculo de horas.

---

## UC-23 — Exportar Historial de Participación (PDF/CSV)

**Código:** UC-23

**Requerimientos relacionados:** RF-23

**Descripción:** Voluntario exporta su historial verificado en PDF o CSV, filtrable por rango de fechas, centros o categorías. El sistema debe garantizar que sólo información autorizada sea exportada.

**Pre-condiciones:** Voluntario autenticado; participaciones validadas (asistió) disponibles.

**Post-condiciones:** Archivo generado y disponible para descarga o enviado por email; evento registrado en logs de auditoría.

**Secuencia normal:**

1. Voluntario solicita exportar historial y define filtros (fechas, centros, incluir badges?).
2. Sistema valida permisos y compila datos (instancias asistidas, fechas, centros, badges asociados).
3. Sistema genera PDF/CSV y lo presenta para descarga o lo envía por email.
4. Sistema registra la acción en logs.

**Secuencias alternativas — Actor:**

- A1: Solicita envío por email en lugar de descarga inmediata.
- A2: Solicita rango grande → sistema sugiere encolar job y avisar cuando esté listo.

**Secuencias alternativas — Sistema:**

- S1: Error de generación → encola y notifica al usuario una vez resuelto.
- S2: Requiere consentimiento para incluir datos de contacto → solicitar confirmación antes de generar.

**Atributos/Validaciones:** Consentimientos, formato CSV normalizado, plantilla de PDF, inclusión opcional de certificados/digital signatures.

---

## UC-24 — Exportar lista de voluntarios de instancias pasadas (Informe para Centros)

**Código:** UC-24

**Requerimientos relacionados:** RF-24

**Descripción:** Centro genera informes descargables (PDF/CSV) con la lista de voluntarios de instancias pasadas, estados de asistencia y notas (según políticas de privacidad y consentimiento).

**Pre-condiciones:** Centro autenticado; instancias e inscripciones históricas registradas; cumplimiento de políticas de privacidad para exportación de datos.

**Post-condiciones:** Informe generado, disponible para descarga y registro de auditoría. Si el informe incluye datos personales sensibles, se aplica control de acceso y registro de consentimiento.

**Secuencia normal:**

1. Centro accede a la instancia histórica y selecciona "Exportar lista".
2. Define filtros (incluir ausentes, incluir emails si hay consentimiento, rango de fechas).
3. Sistema valida permisos y consentimiento; compila la lista con campos permitidos (username, nombre público, estado asistencia, notas, fecha de inscripción).
4. Sistema genera PDF/CSV y lo entrega para descarga; registra la operación.

**Secuencias alternativas — Actor:**

- A1: Centro solicita incluir correos pero voluntarios no dieron consentimiento → sistema advierte y oculta correos o solicita autorización.

**Secuencias alternativas — Sistema:**

- S1: Error en generación/export → encola job y notifica cuando esté listo.
- S2: Petición masiva de exportes → aplicar throttling y políticas de uso.

**Atributos/Validaciones:** masking de datos sensibles, logs de auditoría, TTL del enlace de descarga, políticas de retención.

---

_Fin de los casos de uso para casos de uso fuera de MVP._
