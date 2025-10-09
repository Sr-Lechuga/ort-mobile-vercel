# Colección de Postman - ORT Mobile API

Esta carpeta contiene la colección de Postman completa para probar la API de ORT Mobile - Sistema de Voluntariado.

## 📁 Archivos Incluidos

- **ORT_Mobile_API.postman_collection.json**: Colección principal con todos los endpoints de la API
- **ORT_Mobile_Environments.postman_environment.json**: Entorno para desarrollo local (Puerto 4242 - Jona)
- **ORT_Mobile_Environments_Nico.postman_environment.json**: Entorno para desarrollo local (Puerto 3000 - Nico)
- **ORT_Mobile_Environments_Production.postman_environment.json**: Entorno para servidor de producción (Vercel)

## 🚀 Cómo Importar en Postman

### Importar la Colección

1. Abre Postman
2. Click en **"Import"** (botón superior izquierdo)
3. Arrastra el archivo `ORT_Mobile_API.postman_collection.json` o haz click en **"Choose Files"**
4. Click en **"Import"**

### Importar los Entornos

1. En Postman, ve a **"Environments"** (icono de engranaje en la esquina superior derecha)
2. Click en **"Import"**
3. Selecciona los archivos de entorno (`.postman_environment.json`)
4. Click en **"Import"**

### Seleccionar un Entorno

1. En la esquina superior derecha de Postman, haz click en el dropdown "No Environment"
2. Selecciona el entorno que desees usar:
   - **ORT Mobile - Desarrollo Local (Jona)**: Para servidor local en puerto 4242
   - **ORT Mobile - Desarrollo Local (Nico)**: Para servidor local en puerto 3000
   - **ORT Mobile - Producción (Vercel)**: Para servidor de producción

## 📋 Variables de Entorno

Las siguientes variables se configuran automáticamente al ejecutar las peticiones:

| Variable         | Descripción                   | Se establece automáticamente         |
| ---------------- | ----------------------------- | ------------------------------------ |
| `baseUrl`        | URL base del servidor         | ✅ (según entorno seleccionado)      |
| `authToken`      | Token de autenticación activo | ✅ (al hacer login)                  |
| `volunteerToken` | Token del voluntario          | ✅ (al hacer login como voluntario)  |
| `organizerToken` | Token del organizador         | ✅ (al hacer login como organizador) |
| `activityId`     | ID de actividad creada        | ✅ (al crear actividad)              |
| `instanceId`     | ID de instancia creada        | ✅ (al crear instancia)              |
| `inscriptionId`  | ID de inscripción creada      | ✅ (al inscribirse)                  |

## 🔐 Flujo de Autenticación

### Para Voluntarios:

1. **Registrar un voluntario**: `POST /auth/volunteers/register`
2. **Iniciar sesión**: `POST /auth/volunteers/login`
   - El token se guarda automáticamente en `volunteerToken` y `authToken`
3. Usar endpoints que requieren autenticación de voluntario

### Para Organizadores:

1. **Registrar un organizador**: `POST /auth/organizers/register`
2. **Iniciar sesión**: `POST /auth/organizers/login`
   - El token se guarda automáticamente en `organizerToken` y `authToken`
3. Usar endpoints que requieren autenticación de organizador

## 📝 Flujo de Trabajo Completo

### 1. Verificar que el servidor está activo

```
GET /ping
```

### 2. Registrar e iniciar sesión como organizador

```
POST /auth/organizers/register
POST /auth/organizers/login  (guarda el token automáticamente)
```

### 3. Crear una actividad

```
POST /v1/activities  (guarda el activityId automáticamente)
```

### 4. Crear una instancia de la actividad

```
POST /v1/activities/{activityId}/instances  (guarda el instanceId automáticamente)
```

### 5. Cambiar a sesión de voluntario

```
POST /auth/volunteers/register
POST /auth/volunteers/login  (guarda el token de voluntario)
```

### 6. Inscribirse a una instancia

```
POST /v1/activities/{activityId}/instances/{instanceId}/inscriptions  (guarda el inscriptionId)
```

### 7. Volver a sesión de organizador y marcar asistencia

```
Cambiar manualmente authToken por organizerToken en el entorno
PATCH /v1/activities/{activityId}/instances/{instanceId}/inscriptions/{inscriptionId}/attendance
```

## 🎯 Carpetas de la Colección

### 1. **Público**

- Ping: Verificar estado del servidor
- Swagger: Acceder a la documentación

### 2. **Autenticación**

- **Voluntarios**: Login y Registro
- **Organizadores**: Login y Registro

### 3. **Actividades**

- Listar todas las actividades (con filtros opcionales)
- Crear nueva actividad (requiere token de organizador)
- Actualizar actividad (requiere ser propietario)

### 4. **Instancias de Actividades**

- Crear instancia de actividad (requiere ser propietario)
- Actualizar instancia de actividad (requiere ser propietario)

### 5. **Inscripciones**

- Inscribirse a una instancia (requiere token de voluntario)
- Marcar asistencia (requiere token del organizador propietario)
- Cancelar inscripción (requiere token del voluntario propietario)

## 🔄 Scripts Automáticos

La colección incluye scripts que se ejecutan automáticamente:

### Al hacer Login (Voluntario u Organizador):

```javascript
// Guarda el token recibido en las variables de entorno
if (pm.response.code === 200) {
  var jsonData = pm.response.json();
  pm.environment.set("volunteerToken", jsonData.token); // o organizerToken
  pm.environment.set("authToken", jsonData.token);
}
```

### Al Crear Actividad:

```javascript
// Guarda el ID de la actividad creada
if (pm.response.code === 201) {
  var jsonData = pm.response.json();
  pm.environment.set("activityId", jsonData.insertedActivity._id);
}
```

### Al Crear Instancia:

```javascript
// Guarda el ID de la instancia creada
if (pm.response.code === 201) {
  var jsonData = pm.response.json();
  pm.environment.set("instanceId", jsonData.insertedActivityInstance._id);
}
```

### Al Inscribirse:

```javascript
// Guarda el ID de la inscripción
if (pm.response.code === 201) {
  var jsonData = pm.response.json();
  pm.environment.set("inscriptionId", jsonData.inscription._id);
}
```

## 💡 Consejos y Notas

### Cambiar entre tokens de Voluntario y Organizador

Algunos endpoints requieren autenticación específica (voluntario u organizador). La colección guarda ambos tokens:

- Para usar el token de organizador: Asegúrate de que `authToken` tenga el valor de `organizerToken`
- Para usar el token de voluntario: Asegúrate de que `authToken` tenga el valor de `volunteerToken`

Los requests de inscripción ya tienen configurado el token correcto.

### Filtros en GET /v1/activities

Los filtros están deshabilitados por defecto. Para usarlos:

1. Abre el request "Listar Actividades"
2. Ve a la pestaña "Params"
3. Marca el checkbox del filtro que deseas activar
4. Modifica el valor si es necesario

Filtros disponibles:

- `categories`: social, ambiental, educativo, cultural, salud, emergencia
- `status`: inactiva, en curso
- `location`: texto libre para buscar ubicación

### Fechas en las Instancias

Las fechas deben estar en formato ISO 8601:

```
"date": "2025-10-15T10:00:00.000Z"
```

### Coordenadas en Actividades

Las coordenadas deben seguir el formato GeoJSON (longitud, latitud):

```json
"locationCoordinates": {
  "type": "Point",
  "coordinates": [-56.1532, -34.9099]  // [longitud, latitud]
}
```

## 🐛 Solución de Problemas

### "Token requerido" o 401 Unauthorized

- Verifica que hayas iniciado sesión (Login)
- Verifica que el token se haya guardado correctamente en las variables de entorno
- Verifica que estés usando el tipo de token correcto (voluntario/organizador)

### "No tienes permisos" o 403 Forbidden

- Verifica que seas el propietario del recurso
- Para crear/actualizar actividades e instancias: necesitas token de organizador
- Para inscripciones: necesitas token de voluntario

### Variables no se establecen automáticamente

- Verifica que el request haya completado exitosamente (200 o 201)
- Abre la consola de Postman (View → Show Postman Console) para ver los logs
- Verifica que los scripts "Tests" estén habilitados en el request

## 📚 Documentación Adicional

Para más información sobre la API, consulta:

- **Swagger UI**: `{baseUrl}/swagger`
- **Archivo Swagger**: `Backend/swagger.json`
- **Documentación del proyecto**: `documentacion/`

## 📞 Soporte

Si encuentras algún problema con la colección o la API, contacta al equipo de desarrollo de ORT Mobile.

---

**Versión de la API**: 1.0.0  
**Última actualización**: Octubre 2025
