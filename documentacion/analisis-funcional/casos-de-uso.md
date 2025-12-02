# Casos de Uso - Sistema de Gestión de Voluntariados

Documento con casos de uso individuales derivados de los requerimientos funcionales discutidos. Cada caso de uso incluye: Nombre, Código, Requerimientos relacionados, Descripción, Pre-condiciones, Post-condiciones, Secuencia normal, Secuencias alternativas (actor y sistema) y atributos/validaciones relevantes.

---

## UC-01 — Registro de Voluntario

**Código:** UC-01

**Requerimientos relacionados:** RF-01, RF-09, RF-13

**Descripción:** Permitir que una persona cree una cuenta de voluntario con correo, username, contraseña y preferencias iniciales (categorías de interés).

**Pre-condiciones:** Usuario no autenticado; correo y username no existen en el sistema.

**Post-condiciones:** Voluntario creado en la BD; perfil básico disponible; (opcional) correo de verificación enviado.

**Secuencia normal:**

1. Usuario abre formulario de registro.
2. Completa campos obligatorios: nombre, apellido, username, correo, contraseña, edad, género, idioma, intereses.
3. Envía formulario.
4. Sistema valida unicidad (correo/username) y formatos.
5. Sistema crea el registro y establece `fecha_registro`.
6. Sistema devuelve confirmación y (si aplica) envía email de verificación.

**Secuencias alternativas — Actor:**

- A1: Usuario decide cambiar username antes de enviar → vuelve al paso 2.

**Secuencias alternativas — Sistema:**

- S1: Correo/username duplicado → muestra error y solicita cambio.
- S2: Validación inválida (formato email, contraseña débil) → rechaza y muestra mensajes de validación.
- S3: Error de persistencia → mostrar mensaje de fallo y permitir reintento.

**Atributos/Validaciones importantes:** email único, username único, validación mínima de contraseña, longitud de campos.

---

## UC-02 — Registro de Organzador

**Código:** UC-02

**Requerimientos relacionados:** RF-02, RF-10, RF-18, RF-19

**Descripción:** Permitir a un centro crear su cuenta y perfil con datos de contacto y hasta 3 áreas de enfoque.

**Pre-condiciones:** Usuario no autenticado; correo de centro no existe.

**Post-condiciones:** Centro creado; perfil público visible.

**Secuencia normal:**

1. Centro abre formulario de registro.
2. Completa: nombre, correo, teléfono, persona_contacto, descripción, dirección, coords, hasta 3 áreas_enfoque.
3. Envía formulario.
4. Sistema valida campos y crea registro.
5. Perfil público queda disponible.

**Secuencias alternativas — Actor:**

- A1: Centro omite áreas de enfoque → sistema permite pero aconseja completar.

**Secuencias alternativas — Sistema:**

- S1: Correo duplicado → error.
- S2: Más de 3 áreas → validar y rechazar hasta cumplir límite.

**Atributos/Validaciones:** validación geocoords, formato de teléfono opcional, máximo 3 áreas.

---

## UC-03 — Login de Voluntarios y Centros

**Código:** UC-03

**Requerimientos relacionados:** implícitos para RF-01, RF-02

**Descripción:** Autenticar voluntarios y centros para acceder a funciones protegidas.

**Pre-condiciones:** Usuario registrado.

**Post-condiciones:** Sesión iniciada / token JWT emitido.

**Secuencia normal:**

1. Usuario ingresa email/username y contraseña.
2. Sistema valida credenciales.
3. Si son correctas, sistema crea sesión o emite token.
4. Usuario accede a funcionalidades autorizadas.

**Secuencias alternativas — Actor:**

- A1: Olvidó contraseña → inicia flujo de recuperación.

**Secuencias alternativas — Sistema:**

- S1: Credenciales inválidas → muestra error.
- S2(🦄): Tras N intentos fallidos → aplicar bloqueo temporal.

**Atributos:** expiración de token, refresco de token si aplica.

---

## UC-04 — Crear Actividad (Evento base)

**Código:** UC-04

**Requerimientos relacionados:** RF-03, RF-16, RF-19

**Descripción:** Centro crea actividad con datos generales: título, descripción, categorías, imágenes, cupo y estado.

**Pre-condiciones:** Centro autenticado.

**Post-condiciones:** Actividad creada y visible públicamente según estado.

**Secuencia normal:**

1. Centro selecciona "Crear actividad".
2. Completa campos: nombre, descripción, categorías, imágenes (opcional), cupo, inscripcion_abierta, estado.
3. Envía formulario.
4. Sistema valida categorías y crea la actividad.
5. Actividad aparece en listados públicos.

**Secuencias alternativas — Actor:**

- A1: No sube imágenes → puede crear sin ellas.

**Secuencias alternativas — Sistema:**

- S1: Categoría inválida → sugerir crear nueva categoría (si permisos) o seleccionar otra.
- S2: Error al subir imagen → reintento o mensaje de fallo.

**Atributos/Validaciones:** cupo > 0 opcional, validación de formatos de imagen y tamaño.

---

## UC-05 — Crear Instancia Evento puntual

**Código:** UC-05

**Requerimientos relacionados:** RF-03, RF-04

**Descripción:** Desde una actividad base, crear instancias puntuales (fechas/ubicaciones) y soportar recurrencia (generar múltiples instancias).

**Pre-condiciones:** Centro autenticado; actividad existente y editable.

**Post-condiciones:** Instancia(s) asociadas creadas; disponibles para inscripciones y calendario.

**Secuencia normal:**

1. Centro elige actividad y "Agregar instancia".
2. Define fecha_hora, dirección/coords, estado_instancia y parámetros de recurrencia opcional.
3. Envía.
4. Sistema crea instancia(s) vinculadas a la actividad.
5. Instancia(s) aparecen en calendario y listados.

**Secuencias alternativas — Actor:**

- A1: Configura recurrencia → revisa y confirma múltiples instancias generadas.

**Secuencias alternativas — Sistema:**

- S1: Conflicto horario detectado → advertir y permitir continuar o cancelar.
- S2: Límite de instancias excedido → rechazar o solicitar confirmación especial.

**Atributos:** Validar zona horaria, formato de fecha, lat/lon min/max.

---

## UC-06 — Inscribirse en Instancia (Inscripción individual)

**Código:** UC-06

**Requerimientos relacionados:** RF-05, RF-13, RF-14, RF-16

**Descripción:** Voluntario se inscribe individualmente en una instancia.

**Pre-condiciones:** Voluntario autenticado; instancias con inscripciones abiertas.

**Post-condiciones:** Inscripción registrada; contador de inscriptos actualizado; notificación enviada.

**Secuencia normal:**

1. Voluntario selecciona instancia y clic en "Inscribirme".
2. Sistema verifica estado de inscripciones y cupo.
3. Crea registro de Inscripción (estado: pendiente o confirmada según reglas).
4. Actualiza `cantidad_inscriptos` de la instancia.
5. Envía notificación de inscripción.

**Secuencias alternativas — Actor:**

- A1: Cancela antes de confirmar → no se crea inscripción.

**Secuencias alternativas — Sistema:**

- S1: Cupo lleno → ofrecer lista de espera (redirigir a UC-07).
- S2: Inscripciones cerradas → mostrar mensaje.
- S3: Ya inscrito → mostrar estado actual y opciones (cancelar).

**Atributos:** Validar duplicados por voluntario+instancia.

---

## UC-08 — Certificar Asistencia

**Código:** UC-08

**Requerimientos relacionados:** RF-07, RF-05, RF-13, RF-08

**Descripción:** Centro marca asistencia de voluntarios inscritos; esto valida participación para historial y badges.

**Pre-condiciones:** Centro autenticado; instancia en curso o finalizada; existan inscripciones.

**Post-condiciones:** Inscripciones actualizadas a "asistió" o "ausente"; históricos de voluntarios actualizados; puede disparar asignación de badges.

**Secuencia normal:**

1. Centro abre la instancia y visualiza lista de inscriptos.
2. Marca asistencia (checkbox) por voluntario.
3. Envía confirmación.
4. Sistema actualiza cada Inscripción y añade entrada al `historial` del voluntario.
5. Sistema invoca proceso de evaluación de badges (UC-11).

**Secuencias alternativas — Actor:**

- A1: Requiere corrección posterior → centro edita estado de inscripción.

**Secuencias alternativas — Sistema:**

- S1: Error parcial en persistencia → sistema intenta reintento o marca inconsistencias para reconciliación.

**Atributos:** Posibilidad de edición posterior con auditoría (quién/ cuándo modificó).

---

## UC-09 — Publicar Comentario y Rating

**Código:** UC-09

**Requerimientos relacionados:** RF-11, RF-12, RF-13

**Descripción:** Voluntario que participó deja comentario y rating sobre actividad/instancia o centro; opción de anonimato.

**Pre-condiciones:** Voluntario autenticado; haber participado (estado "asistió") al menos en una instancia del objetivo.

**Post-condiciones:** Comentario guardado en colección `comentarios`; snapshot actualizado en `ultimos_comentarios` (actividad/centro); rating promedio recalculado.

**Secuencia normal:**

1. Voluntario accede a "Dejar comentario".
2. Selecciona objetivo, escribe texto, rating y elige anonimato si desea.
3. Envía.
4. Sistema valida participación previa.
5. Crea comentario en colección y agrega/sincroniza snapshot en instancia/centro (mantener últimos 20).
6. Recalcula rating promedio y actualiza visible.

**Secuencias alternativas — Actor:**

- A1: Publicar anónimo → sistema guarda autor internamente pero marca anonimato en UI.

**Secuencias alternativas — Sistema:**

- S1: Usuario no cumplió condición de participación → rechaza y explica.
- S2: Fallo DB → mostrar error y permitir reintento.

**Atributos:** longitud mínima/máxima del texto, rating entre 1 y 5.

---

## UC-11 — Asignación Automática de Badges

**Código:** UC-11

**Requerimientos relacionados:** RF-08

**Descripción:** Sistema otorga badges automáticamente cuando el voluntario alcanza condiciones definidas (p.ej. 5,10,20 participaciones). Estas reglas están almacenadas en un catálogo de badges y el proceso debe evitar duplicados y registrar la fecha de obtención.

**Pre-condiciones:** Historial de asistencias actualizado; catálogo de badges definido en el sistema.

**Post-condiciones:** Badge añadido al `voluntario.badges` con `fecha_obtencion`; notificación enviada al voluntario; registro de actividad (audit log) de la asignación.

**Secuencia normal:**

1. Ocurre un evento que afecta el historial (por ejemplo, UC-08 marca asistencia) o corre un job programado de reconciliación.
2. Sistema calcula el número de participaciones validadas del voluntario.
3. Sistema compara conteo con reglas del catálogo de badges.
4. Si el voluntario cumple una condición no previously otorgada, el sistema crea una entrada en `voluntario.badges` con `badge_id`, `titulo` y `fecha_obtencion`.
5. Sistema registra la acción en el log de auditoría y envía notificación al voluntario.

**Secuencias alternativas — Actor:**

- A1: Ninguna directa — proceso automático. El voluntario solo recibe notificación.

**Secuencias alternativas — Sistema:**

- S1: El voluntario ya posee el badge → no se duplica; se registra chequeo y se ignora.
- S2: Inconsistencia detectada (por ejemplo conteo no coincide) → marca para job de reconciliación y envía alerta al backoffice.
- S3: Error al persistir badge (DB) → encola la operación para reintento y notifica al equipo de soporte.

**Atributos/Validaciones:** unicidad por `badge_id` en el array `voluntario.badges`, fecha obligatoria de obtención, referencia a `Badge`, regla única por nivel, imagen/ícono.

---

## UC-12 — Buscar Actividades por Categoría / Filtros

**Código:** UC-12

**Requerimientos relacionados:** RF-16, RF-18, RF-19

**Descripción:** Permitir al usuario (autenticado o no) buscar actividades aplicando filtros por categoría(s), fecha, estado y paginación.

**Pre-condiciones:** Al menos una actividad existiendo; índices actualizados para búsqueda.

**Post-condiciones:** Retornar lista paginada de actividades que cumplen los filtros con metadatos (distancia si aplica, número de inscriptos, rating promedio).

**Secuencia normal:**

1. Usuario abre el buscador y selecciona filtros: categorías, rango de fechas, estado, ordenamiento.
2. Usuario ejecuta búsqueda.
3. Sistema valida filtros y consulta índices/colecciones.
4. Sistema devuelve resultados paginados con resumen de cada actividad y enlaces a detalle.

**Secuencias alternativas — Actor:**

- A1: No selecciona filtros → sistema aplica filtros por defecto (p. ej. actividades próximas o populares).

**Secuencias alternativas — Sistema:**

- S1: Índices no disponibles o desactualizados → sistema devuelve resultados pero marca posible desincronización y sugiere reintentar más tarde.
- S2: Consulta demasiado amplia → sistema sugiere aplicar filtros adicionales para mejorar relevancia.
- S3: Error en consulta → mostrar mensaje.

**Atributos:** paginación (limit, offset/nextCursor), facetas por categoría, caché para resultados frecuentes, orden por relevancia o fecha.

---

## UC-13 — Buscar Actividades por Cercanía (geoubicación)

**Código:** UC-13

**Requerimientos relacionados:** RF-17, RF-16

**Descripción:** Mostrar y ordenar actividades por proximidad a la ubicación del voluntario (coords provistas por el usuario o ingresadas manualmente). Incluir distancia estimada en la respuesta.

**Pre-condiciones:** El usuario provee permisos de ubicación o ingresa coordenadas/dirección; existen actividades con coords válidas.

**Post-condiciones:** Lista de actividades ordenadas por distancia con información de la distancia y tiempo estimado si aplica.

**Secuencia normal:**

1. Usuario autoriza el uso de ubicación o introduce una dirección/coords.
2. Usuario selecciona el filtro de cercanía y define (opcional) un radio.
3. Sistema realiza geoconsulta (geoNear / geospatial index) y calcula distancia para cada resultado.
4. Sistema devuelve lista ordenada por proximidad y paginada.

**Secuencias alternativas — Actor:**

- A1: Usuario no autoriza ubicación → ofrece ingresar manualmente una ubicación o dirección.

**Secuencias alternativas — Sistema:**

- S1: Servicio de geocoding externo falla → solicitar coords manuales o reintentar.
- S2: No hay actividades en el radio → mostrar mensaje y sugerir ampliar radio.

**Atributos:** soportar unidad de distancia (km/millas), radio por defecto, tolerancia para proximidad.

---

## UC-14 — Notificar sobre Nuevas Actividades y Recordatorios

**Código:** UC-14

**Requerimientos relacionados:** RF-14, RF-15

**Descripción:** Enviar notificaciones in-app y/o por email a voluntarios sobre confirmaciones de inscripción, cambios en actividades, recordatorios antes de eventos y nuevas actividades relevantes (según intereses y/o cercanía).

**Pre-condiciones:** Voluntario con preferencias y datos de contacto configurados; el sistema tiene acceso a un servicio de envío (email/push).

**Post-condiciones:** Notificaciones generadas y enviadas o encoladas para reintentos; registros en la colección `notificaciones` con estado de entrega.

**Secuencia normal:**

1. Evento disparador (nuevo evento, cambio de estado, recordatorio X horas antes, liberación de cupo para lista de espera).
2. Sistema determina audiencia: inscriptos, voluntarios con intereses coincidentes dentro de un radio, u otros segmentos.
3. Sistema construye el contenido de la notificación y decide canal(es).
4. Envía notificaciones (batched si es gran volumen) y registra cada envío en `notificaciones` con estado (enviado, fallido, pendiente).

**Secuencias alternativas — Actor:**

- A1: Voluntario ha silenciado notificaciones o desactivó canal (email/push) → no recibe por ese canal.

**Secuencias alternativas — Sistema:**

- S1: Falla en envío (smtp/push) → encola para reintento y marca registro como pendiente.
- S2: Alto volumen de destinatarios → uso de batch + control de tasa; reportes de entrega graduales.

**Atributos:** prioridad (alta/normal/baja), canal (in-app/email/push), TTL del mensaje, plantilla de contenido.

---

## UC-15 — Ver Perfil Público de Voluntario

**Código:** UC-15

**Requerimientos relacionados:** RF-09, RF-13, RF-08

**Descripción:** Mostrar al público el perfil de un voluntario por username/pseudónimo: badges, conteo de participaciones, reseñas públicas, y elementos que el usuario permita compartir.

**Pre-condiciones:** Perfil creado y no borrado; controles de privacidad aplicados por el propietario.

**Post-condiciones:** Perfil mostrado con la información pública y enlaces a actividades destacadas.

**Secuencia normal:**

1. Visitante solicita perfil mediante búsqueda o link.
2. Sistema recupera datos públicos (username, badges, conteo de asistencias, reseñas públicas, foto/avatar si aplica).
3. Sistema presenta la página de perfil respetando las opciones de privacidad (p.ej. ocultar edad, correo).

**Secuencias alternativas — Actor:**

- A1: Propietario ajustó privacidad → ciertos campos ocultos o contenido limitado.

**Secuencias alternativas — Sistema:**

- S1: Perfil no existe o fue eliminado → mostrar mensaje "Perfil no disponible".

**Atributos:** indicadores de verificación opcional (p.ej. email verificado), URL amigable (slug), métricas públicas (horas voluntariado totales, número de actividades), respetar anonimato en comentarios.

---

## UC-16 — Gestionar Categorías (Admin/Backoffice)

**Código:** UC-16

**Requerimientos relacionados:** RF-18

**Descripción:** Backoffice/Admin gestiona el catálogo global de categorías: crear, editar, desactivar o eliminar. Asegurar integridad cuando una categoría está en uso (no eliminar sin reasignación).

**Pre-condiciones:** Usuario con rol admin; existencia de categorías.

**Post-condiciones:** Catálogo actualizado; cambios registrados en logs y, si aplica, notificaciones a centros cuando una categoría clave cambia; índices de búsqueda ajustados.

**Secuencia normal:**

1. Admin accede al módulo de categorías.
2. Elige crear/editar/desactivar/eliminar categoría.
3. Sistema valida unicidad y aplica cambios (si es eliminación y categoría en uso, solicita reasignación o bloquea la acción).
4. Sistema actualiza índices y caches de búsqueda.

**Secuencias alternativas — Actor:**

- A1: Admin reasigna actividades de una categoría a otra antes de eliminar.

**Secuencias alternativas — Sistema:**

- S1: Intento de eliminar categoría en uso → bloquear y pedir acción de reasignación.
- S2: Error en actualización de índices → marcar para job de reindexación.

**Atributos:** slug único, activo/disabled flag, icono/imagen y descripción breve, metadatos (ícono, descripción corta).

---

## UC-17 — Subir imágenes a Actividad

**Código:** UC-17

**Requerimientos relacionados:** RF-19

**Descripción:** Centro carga imágenes para enriquecer la ficha de la actividad. Se validan tipo, tamaño y cantidad máxima por actividad.

**Pre-condiciones:** Centro autenticado; permiso para editar la actividad.

**Post-condiciones:** Imágenes almacenadas en storage (CDN) y URLs guardadas en el documento de la actividad; miniaturas generadas si aplica.

**Secuencia normal:**

1. Centro selecciona archivos y los sube desde la UI.
2. Sistema valida formato y tamaño; genera thumbnails y optimiza si procede.
3. Sistema sube archivos a storage y recibe URLs.
4. Actualiza documento de actividad con lista de URLs y metadatos (size, mimeType).

**Secuencias alternativas — Actor:**

- A1: Cancela subida → no se guardan cambios.

**Secuencias alternativas — Sistema:**

- S1: Archivo excede tamaño límite → rechaza y notifica al usuario.
- S2: Error en storage → encola y notifica para reintento o presentar error.

**Atributos:** formatos permitidos (jpg, png, webp), tamaño máximo por archivo, número máximo de imágenes, política de expiración/retención.

---

## UC-18 — Recomendación de Actividades Personalizadas

**Código:** UC-18

**Requerimientos relacionados:** RF-15, RF-12, RF-16, RF-17

**Descripción:** Motor de recomendación que sugiere actividades al voluntario basado en intereses, historial verificado y proximidad geográfica. El motor debe ser explicable y permitir fallback para usuarios nuevos.

**Pre-condiciones:** Usuario autenticado; perfil con intereses o historial parcialmente poblado (si no, usar fallback de populares).

**Post-condiciones:** Lista de actividades recomendadas con puntaje/motivo (p.ej. "Cercano a tu ubicación" / "Relacionado con tu interés: Educación").

**Secuencia normal:**

1. Usuario accede a sección "Recomendaciones".
2. Sistema recupera intereses, historial y coords.
3. Ejecuta algoritmo ponderado (intereses, proximidad, recencia, rating) y genera lista con score.
4. Sistema muestra resultados y razones de recomendación para transparencia.

**Secuencias alternativas — Actor:**

- A1: Usuario mejora su perfil/intereses → las recomendaciones se adaptan en tiempo real o tras re-cálculo.

**Secuencias alternativas — Sistema:**

- S1: Datos insuficientes → fallback a actividades populares o sugerir completar perfil.
- S2: Servicio de scoring fuera de servicio → mostrar mensaje y fallback.

**Atributos:** scores, trazabilidad de la razón de recomendación, latencia aceptable, logs para ajuste del modelo, algoritmo configurable.

---

## UC-19 — Exportar Historial de Participación (PDF)

**Código:** UC-19

**Requerimientos relacionados:** RF-23, RF-13

**Descripción:** Generar un PDF con el historial certificado de participaciones del voluntario (instancias donde asistió, certificados, badges). El PDF puede incluir logo y formato oficial para descarga o envío por email.

**Pre-condiciones:** Voluntario autenticado; existencia de historial verificado (asistencias marcadas por centros).

**Post-condiciones:** PDF generado y ofrecido para descarga o enviado por email; registro del evento de exportación en logs.

**Secuencia normal:**

1. Voluntario solicita exportar historial (puede filtrar por rango de fechas).
2. Sistema compila datos validados: lista de instancias asistidas, centros, fechas y badges asociados.
3. Sistema genera PDF (plantilla configurable) y lo pone a disposición para descarga o lo envía por email.
4. Registra el evento de generación en logs.

**Secuencias alternativas — Actor:**

- A1: Solicita filtrado por fechas o tipos de actividad.

**Secuencias alternativas — Sistema:**

- S1: Proceso pesado → encolar job y notificar al usuario cuando esté listo.
- S2: Error en generación → registrar error y permitir reintentar.

**Atributos:** plantilla del PDF, formato (A4/Letter), inclusión opcional de firmas/estampillas digitales si se requiere certificación, logo del centro o plantilla personalizable.

---

## UC-25 — Desinscribirse de Instancia

**Código:** UC-25

**Requerimientos relacionados:** RF-25, RF-05, RF-14

**Descripción:** Permitir que un voluntario cancele su inscripción en una instancia de actividad antes de que comience, liberando el cupo para otros voluntarios.

**Pre-condiciones:** Voluntario autenticado; inscrito en la instancia; instancia no ha comenzado aún.

**Post-condiciones:** Inscripción cancelada; cupo liberado; notificación enviada al centro; voluntario removido de la lista de inscriptos.

**Secuencia normal:**

1. Voluntario accede a sus inscripciones activas.
2. Selecciona la instancia de la cual desea desinscribirse.
3. Confirma la cancelación de la inscripción.
4. Sistema valida que la instancia no haya comenzado.
5. Sistema actualiza el estado de la inscripción a "cancelada".
6. Sistema decrementa el contador de inscriptos de la instancia.
7. Sistema notifica al centro sobre la desinscripción.
8. Si hay lista de espera, se notifica al siguiente voluntario en espera.

**Secuencias alternativas — Actor:**

- A1: Voluntario cancela la operación → no se realiza la desinscripción.

**Secuencias alternativas — Sistema:**

- S1: La instancia ya comenzó → rechaza la desinscripción y muestra mensaje explicativo.
- S2: La inscripción ya está cancelada → muestra estado actual.
- S3: Error al actualizar la base de datos → muestra error y permite reintento.

**Atributos/Validaciones:** validar que la instancia no haya comenzado, actualizar contadores, notificaciones automáticas, liberación de cupo.

---

_Fin del documento._
