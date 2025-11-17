# API REST - Resumen de Endpoints

Este documento contiene un resumen de todos los endpoints disponibles en la API de ORT Mobile, incluyendo los parámetros esperados y las respuestas.

## Base URL

- **Producción**: `https://ort-mobile-vercel.vercel.app`
- **Desarrollo (Nico)**: `http://localhost:3000`
- **Desarrollo (Jona)**: `http://localhost:4242`

## Autenticación

La mayoría de los endpoints requieren autenticación mediante JWT Bearer Token. El token se obtiene al hacer login y debe enviarse en el header:

```
Authorization: Bearer <token>
```

---

## 1. Endpoints Públicos

### 1.1. Verificar estado del servidor

- **Método**: `GET`
- **Ruta**: `/ping`
- **Autenticación**: No requerida
- **Descripción**: Verifica que el servidor esté funcionando
- **Respuesta**:
  ```json
  "pong"
  ```

### 1.2. Documentación Swagger

- **Método**: `GET`
- **Ruta**: `/swagger`
- **Autenticación**: No requerida
- **Descripción**: Interfaz web para explorar la documentación completa de la API

---

## 2. Autenticación

### 2.1. Login Voluntario

- **Método**: `POST`
- **Ruta**: `/auth/volunteers/login`
- **Autenticación**: No requerida
- **Body**:
  ```json
  {
    "username": "string (3-30 caracteres)",
    "password": "string (6-30 caracteres)"
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Inicio de sesión correcta",
    "token": "jwt_token_aqui"
  }
  ```

### 2.2. Registro Voluntario

- **Método**: `POST`
- **Ruta**: `/auth/volunteers/register`
- **Autenticación**: No requerida
- **Body**:
  ```json
  {
    "username": "string (3-30 caracteres) - REQUERIDO",
    "email": "string (formato email, max 70) - REQUERIDO",
    "password": "string (6-30 caracteres) - REQUERIDO",
    "name": "string (3-30 caracteres) - REQUERIDO",
    "lastname": "string (3-30 caracteres) - REQUERIDO",
    "age": "number (18-110) - REQUERIDO",
    "genre": "string ('hombre' | 'mujer' | 'no especificado') - OPCIONAL"
  }
  ```
- **Respuesta exitosa (201)**:
  ```json
  {
    "message": "Usuario registrado correctamente. Puede iniciar sesión"
  }
  ```

### 2.3. Login Organizador

- **Método**: `POST`
- **Ruta**: `/auth/organizers/login`
- **Autenticación**: No requerida
- **Body**:
  ```json
  {
    "username": "string (max 30 caracteres)",
    "password": "string (max 30 caracteres)"
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Inicio de sesión correcta",
    "token": "jwt_token_aqui"
  }
  ```

### 2.4. Registro Organizador

- **Método**: `POST`
- **Ruta**: `/auth/organizers/register`
- **Autenticación**: No requerida
- **Body**:
  ```json
  {
    "username": "string (3-30 caracteres) - REQUERIDO",
    "email": "string (formato email, max 70) - REQUERIDO",
    "password": "string (6-30 caracteres) - REQUERIDO",
    "name": "string (3-30 caracteres) - REQUERIDO",
    "location": {
      "country": "string (max 25) - REQUERIDO",
      "city": "string (max 25) - REQUERIDO",
      "address": "string (max 255) - REQUERIDO",
      "lat": "number - OPCIONAL",
      "lng": "number - OPCIONAL"
    },
    "contactEmail": "string (formato email, max 70) - OPCIONAL",
    "telephone": "string (max 25) - OPCIONAL",
    "social": {
      "instagram": "string (max 25) - OPCIONAL",
      "facebook": "string (max 25) - OPCIONAL",
      "linkedIn": "string (max 25) - OPCIONAL",
      "personal": "string (max 120) - OPCIONAL"
    }
  }
  ```
- **Respuesta exitosa (201)**:
  ```json
  {
    "message": "Usuario registrado correctamente. Puede iniciar sesión"
  }
  ```

---

## 3. Actividades

### 3.1. Listar Actividades

- **Método**: `GET`
- **Ruta**: `/v1/activities`
- **Autenticación**: No requerida
- **Query Parameters** (todos opcionales):
  - `categories`: `array` - Filtrar por categorías. Valores: `"social"`, `"ambiental"`, `"educativo"`, `"cultural"`, `"salud"`, `"emergencia"`
  - `status`: `string` - Filtrar por estado. Valores: `"inactiva"`, `"en curso"`
  - `location`: `string` - Filtrar por ubicación
  - `minDate`: `string` - Fecha mínima (ISO 8601, ej: `"2025-11-01T00:00:00Z"`)
  - `maxDate`: `string` - Fecha máxima (ISO 8601)
  - `page`: `number` - Número de página (default: 1, mínimo: 1)
  - `limit`: `number` - Elementos por página (default: 10, mínimo: 1, máximo: 100)
  - `userLatitude`: `number` - Latitud del usuario para búsqueda geográfica (-90 a 90)
  - `userLongitude`: `number` - Longitud del usuario para búsqueda geográfica (-180 a 180)
  - `maxDistance`: `number` - Distancia máxima en km (1-100, requiere userLatitude y userLongitude)
- **Ejemplo de query**: `/v1/activities?categories=social&status=en%20curso&page=1&limit=10`
- **Respuesta exitosa (200)**:
  ```json
  {
    "activities": [
      {
        "_id": "activity_id",
        "owner": "organizer_id",
        "title": "Título de la actividad",
        "categories": ["social", "educativo"],
        "description": "Descripción...",
        "date": "2025-11-15T10:00:00Z",
        "status": "en curso",
        "instances": ["instance_id_1", "instance_id_2"],
        "location": {
          "country": "Uruguay",
          "city": "Montevideo",
          "address": "Calle Ejemplo 123"
        },
        "locationCoordinates": {
          "type": "Point",
          "coordinates": [-56.191389, -34.906944]
        },
        "createdAt": "2025-11-01T00:00:00Z",
        "updatedAt": "2025-11-01T00:00:00Z"
      }
    ]
  }
  ```

### 3.2. Crear Actividad

- **Método**: `POST`
- **Ruta**: `/v1/activities`
- **Autenticación**: Requerida (Organizador)
- **Body**:
  ```json
  {
    "title": "string - REQUERIDO",
    "categories": ["string"] - REQUERIDO (1-3 categorías válidas),
    "description": "string - OPCIONAL",
    "date": "string (ISO 8601) - OPCIONAL",
    "status": "string ('inactiva' | 'en curso') - OPCIONAL (default: 'en curso')",
    "location": {
      "country": "string (max 25) - REQUERIDO",
      "city": "string (max 25) - REQUERIDO",
      "address": "string (max 255) - REQUERIDO"
    },
    "locationCoordinates": {
      "type": "Point - REQUERIDO",
      "coordinates": [longitud, latitud] - REQUERIDO (array de 2 números)
    }
  }
  ```
- **Categorías válidas**: `"social"`, `"ambiental"`, `"educativo"`, `"cultural"`, `"salud"`, `"emergencia"`
- **Respuesta exitosa (201)**:
  ```json
  {
    "insertedActivity": {
      /* objeto de actividad */
    }
  }
  ```

### 3.3. Actualizar Actividad

- **Método**: `PATCH`
- **Ruta**: `/v1/activities/:activityId`
- **Autenticación**: Requerida (Organizador, debe ser propietario)
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
- **Body**: (mismo formato que crear actividad, todos los campos requeridos)
  ```json
  {
    "title": "string - REQUERIDO",
    "categories": ["string"] - REQUERIDO,
    "description": "string - OPCIONAL",
    "status": "string - OPCIONAL",
    "location": { /* objeto location - REQUERIDO */ },
    "locationCoordinates": { /* objeto coordinates - REQUERIDO */ }
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "insertedActivity": {
      /* objeto de actividad actualizado */
    }
  }
  ```

### 3.4. Desactivar Actividad

- **Método**: `DELETE`
- **Ruta**: `/v1/activities/:activityId`
- **Autenticación**: Requerida (Organizador, debe ser propietario)
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Actividad desactivada correctamente",
    "deletedActivity": {
      /* objeto de actividad */
    }
  }
  ```

### 3.5. Obtener Comentarios de Actividad

- **Método**: `GET`
- **Ruta**: `/v1/activities/:activityId/comments`
- **Autenticación**: No requerida
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Comentarios obtenidos correctamente",
    "activityId": "activity_id",
    "totalComments": 5,
    "averageRating": 4.2,
    "comments": [
      {
        "_id": "comment_id",
        "volunteer": "volunteer_id",
        "activity": "activity_id",
        "instance": "instance_id",
        "inscription": "inscription_id",
        "anonymous": false,
        "comment": "Texto del comentario",
        "rating": 5,
        "createdAt": "2025-11-01T00:00:00Z",
        "updatedAt": "2025-11-01T00:00:00Z"
      }
    ]
  }
  ```

---

## 4. Instancias de Actividades

### 4.1. Crear Instancia de Actividad

- **Método**: `POST`
- **Ruta**: `/v1/activities/:activityId/instances`
- **Autenticación**: Requerida (Organizador, debe ser propietario de la actividad)
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
- **Body**:
  ```json
  {
    "date": "string (ISO 8601, debe ser actual o futura) - REQUERIDO",
    "duration": "number (1-1440 minutos) - REQUERIDO",
    "inscriptionsOpen": "boolean - OPCIONAL (default: true)",
    "slots": "number (mínimo 1) | null - OPCIONAL (null = sin límite)"
  }
  ```
- **Respuesta exitosa (201)**:
  ```json
  {
    "insertedActivityInstance": {
      "_id": "instance_id",
      "owner": "organizer_id",
      "activity": "activity_id",
      "date": "2025-11-15T10:00:00Z",
      "duration": 120,
      "inscriptionsOpen": true,
      "slots": 20,
      "inscriptions": [],
      "createdAt": "2025-11-01T00:00:00Z",
      "updatedAt": "2025-11-01T00:00:00Z"
    }
  }
  ```

### 4.2. Actualizar Instancia de Actividad

- **Método**: `PATCH`
- **Ruta**: `/v1/activities/:activityId/instances/:instanceId`
- **Autenticación**: Requerida (Organizador, debe ser propietario)
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
  - `instanceId`: `string` - ID de la instancia
- **Body**: (todos los campos opcionales)
  ```json
  {
    "date": "string (ISO 8601, debe ser actual o futura) - OPCIONAL",
    "duration": "number (1-1440) - OPCIONAL",
    "inscriptionsOpen": "boolean - OPCIONAL",
    "slots": "number | null - OPCIONAL"
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "insertedActivityInstance": {
      /* objeto de instancia actualizado */
    }
  }
  ```

---

## 5. Inscripciones

### 5.1. Inscribirse a Instancia

- **Método**: `POST`
- **Ruta**: `/v1/activities/:activityId/instances/:instanceId/inscriptions`
- **Autenticación**: Requerida (Voluntario)
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
  - `instanceId`: `string` - ID de la instancia
- **Body**: No requiere body
- **Respuesta exitosa (201)**:
  ```json
  {
    "message": "Inscripción realizada exitosamente",
    "inscription": {
      "_id": "inscription_id",
      "volunteer": "volunteer_id",
      "instance": "instance_id",
      "accepted": true,
      "date": "2025-11-01T00:00:00Z",
      "assisted": false,
      "createdAt": "2025-11-01T00:00:00Z",
      "updatedAt": "2025-11-01T00:00:00Z"
    }
  }
  ```

### 5.2. Cancelar Inscripción

- **Método**: `DELETE`
- **Ruta**: `/v1/volunteers/inscriptions/:inscriptionId`
- **Autenticación**: Requerida (Voluntario, debe ser el propietario de la inscripción)
- **Path Parameters**:
  - `inscriptionId`: `string` - ID de la inscripción
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Inscripción cancelada exitosamente"
  }
  ```

### 5.3. Marcar Asistencia

- **Método**: `PATCH`
- **Ruta**: `/v1/activities/:activityId/instances/:instanceId/inscriptions/:inscriptionId/attendance`
- **Autenticación**: Requerida (Organizador, debe ser propietario de la actividad)
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
  - `instanceId`: `string` - ID de la instancia
  - `inscriptionId`: `string` - ID de la inscripción
- **Body**:
  ```json
  {
    "assisted": "boolean - REQUERIDO"
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Asistencia actualizada exitosamente"
  }
  ```

---

## 6. Comentarios

### 6.1. Crear Comentario sobre Instancia de Actividad

- **Método**: `POST`
- **Ruta**: `/v1/activities/:activityId/instances/:instanceId/comments`
- **Autenticación**: Requerida (Voluntario, debe haber asistido a la instancia)
- **Path Parameters**:
  - `activityId`: `string` - ID de la actividad
  - `instanceId`: `string` - ID de la instancia
- **Body**:
  ```json
  {
    "comment": "string (1-1000 caracteres) - REQUERIDO",
    "rating": "number (1-5) - REQUERIDO",
    "anonymous": "boolean - OPCIONAL (default: false)"
  }
  ```
- **Respuesta exitosa (201)**:
  ```json
  {
    "message": "Comentario registrado con éxito",
    "comment": {
      "_id": "comment_id",
      "volunteer": "volunteer_id",
      "activity": "activity_id",
      "instance": "instance_id",
      "inscription": "inscription_id",
      "anonymous": false,
      "comment": "Texto del comentario",
      "rating": 5,
      "createdAt": "2025-11-01T00:00:00Z",
      "updatedAt": "2025-11-01T00:00:00Z"
    }
  }
  ```

### 6.2. Crear Comentario sobre Organizador

- **Método**: `POST`
- **Ruta**: `/v1/organizers/:organizerId/comments`
- **Autenticación**: Requerida (Voluntario, debe haber participado en actividades del organizador)
- **Path Parameters**:
  - `organizerId`: `string` - ID del organizador
- **Body**:
  ```json
  {
    "comment": "string (1-1000 caracteres) - REQUERIDO",
    "rating": "number (1-5) - REQUERIDO",
    "anonymous": "boolean - OPCIONAL (default: false)"
  }
  ```
- **Respuesta exitosa (201)**:
  ```json
  {
    "message": "Comentario registrado con éxito",
    "comment": {
      /* objeto de comentario */
    }
  }
  ```

### 6.3. Obtener Comentarios de Organizador

- **Método**: `GET`
- **Ruta**: `/v1/organizers/:organizerId/comments`
- **Autenticación**: No requerida
- **Path Parameters**:
  - `organizerId`: `string` - ID del organizador
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Comentarios obtenidos correctamente",
    "organizerId": "organizer_id",
    "totalComments": 10,
    "averageRating": 4.5,
    "comments": [
      /* array de comentarios */
    ]
  }
  ```

---

## 7. Organizadores

### 7.1. Obtener Perfil Público de Organizador

- **Método**: `GET`
- **Ruta**: `/v1/organizers/:organizerId/public-profile`
- **Autenticación**: No requerida
- **Path Parameters**:
  - `organizerId`: `string` - ID del organizador
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Perfil público del organizador obtenido con éxito",
    "organizer": {
      "organizerId": "organizer_id",
      "name": "Nombre del centro",
      "username": "username",
      "contact": {
        "email": "contact@example.com",
        "telephone": "+598 1234 5678",
        "social": {
          "instagram": "@centro",
          "facebook": "centro",
          "linkedIn": "centro",
          "personal": "https://centro.com"
        }
      },
      "location": {
        "country": "Uruguay",
        "city": "Montevideo",
        "address": "Calle Ejemplo 123",
        "lat": -34.906944,
        "lng": -56.191389
      },
      "focusAreas": ["social", "educativo"],
      "activeActivities": [
        {
          "activityId": "activity_id",
          "title": "Título",
          "categories": ["social"],
          "date": "2025-11-15T10:00:00Z",
          "location": {
            /* objeto location */
          }
        }
      ],
      "updatedAt": "2025-11-01T00:00:00Z"
    }
  }
  ```

---

## 8. Voluntarios

### 8.1. Obtener Perfil Público de Voluntario

- **Método**: `GET`
- **Ruta**: `/v1/volunteers/:volunteerId/public-profile`
- **Autenticación**: No requerida
- **Path Parameters**:
  - `volunteerId`: `string` - ID del voluntario
- **Respuesta exitosa (200)**:
  ```json
  {
    "message": "Perfil público del voluntario obtenido con éxito",
    "volunteer": {
      "volunteerId": "volunteer_id",
      "username": "username",
      "badges": [
        {
          "badgeId": "badge_id",
          "title": "Título del badge",
          "description": "Descripción",
          "imageUrl": "https://...",
          "obtainedAt": "2025-11-01T00:00:00Z",
          "type": "tipo",
          "level": 1
        }
      ],
      "activities": [
        {
          "instanceId": "instance_id",
          "activityId": "activity_id",
          "title": "Título",
          "categories": ["social"],
          "date": "2025-11-15T10:00:00Z",
          "location": {
            /* objeto location */
          }
        }
      ],
      "registrationDate": "2025-10-01T00:00:00Z",
      "totalActivities": 5
    }
  }
  ```

---

## Códigos de Estado HTTP

- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Error en los datos enviados
- **401**: Unauthorized - Token de autenticación requerido o inválido
- **403**: Forbidden - No tienes permisos para realizar esta acción
- **404**: Not Found - Recurso no encontrado

## Formato de Errores

Todas las respuestas de error siguen este formato:

```json
{
  "message": "Descripción del error"
}
```

## Notas Importantes

1. **Coordenadas**: El formato de coordenadas es `[longitud, latitud]` (en ese orden), no `[latitud, longitud]`.

2. **Fechas**: Todas las fechas deben estar en formato ISO 8601 (ej: `"2025-11-15T10:00:00Z"`).

3. **Categorías de Actividades**: Los valores válidos son: `"social"`, `"ambiental"`, `"educativo"`, `"cultural"`, `"salud"`, `"emergencia"`.

4. **Estados de Actividades**: Los valores válidos son: `"inactiva"`, `"en curso"`.

5. **Autenticación**: El token JWT debe enviarse en el header `Authorization` con el formato: `Bearer <token>`.

6. **Búsqueda Geográfica**: Para usar la búsqueda geográfica en el listado de actividades, se deben enviar ambos parámetros `userLatitude` y `userLongitude` juntos. Opcionalmente se puede especificar `maxDistance` (en km, 1-100).

7. **Paginación**: El listado de actividades soporta paginación mediante los parámetros `page` (número de página, empieza en 1) y `limit` (elementos por página, máximo 100).

---

## Documentación Completa

Para más detalles, consulta la documentación interactiva de Swagger en: `/swagger`
