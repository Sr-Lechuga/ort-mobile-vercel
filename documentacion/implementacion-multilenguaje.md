# Implementación de Sistema Multiidioma - Estrategia Híbrida

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura de la Solución](#arquitectura-de-la-solución)
3. [Cambios en el Backend](#cambios-en-el-backend)
4. [Cambios en el Frontend](#cambios-en-el-frontend)
5. [Estructura de Códigos de Mensaje](#estructura-de-códigos-de-mensaje)
6. [Ejemplos de Implementación](#ejemplos-de-implementación)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Migración y Roadmap](#migración-y-roadmap)

---

## 📌 Resumen Ejecutivo

### Objetivo

Implementar soporte multiidioma (Español e Inglés) en la API ORT_Mobile utilizando una estrategia híbrida donde:

- **Backend**: Devuelve códigos de mensaje estandarizados en lugar de texto hardcodeado
- **Frontend**: Traduce estos códigos según el idioma del dispositivo

### Ventajas de la Estrategia Híbrida

✅ Desacoplamiento entre backend y idioma  
✅ Mayor flexibilidad en el frontend  
✅ Escalable a nuevos idiomas sin tocar el backend  
✅ Mejor rendimiento (traducciones en cliente)  
✅ Implementación gradual sin breaking changes

---

## 🏗️ Arquitectura de la Solución

```
┌─────────────────────────────────────────────────────────────┐
│                    REACT NATIVE (Frontend)                  │
│                                                              │
│  ┌────────────────┐       ┌──────────────────┐            │
│  │  Translation   │       │  Language        │            │
│  │  Service       │◄──────│  Detector        │            │
│  │                │       │                  │            │
│  └────────┬───────┘       └──────────────────┘            │
│           │                                                 │
│           │ translate("LOGIN_SUCCESS")                       │
│           ↓                                                 │
│  ┌────────────────┐                                         │
│  │  "Login        │                                         │
│  │   successful"  │                                         │
│  └────────────────┘                                         │
└───────────────────┬─────────────────────────────────────────┘
                    │ HTTP Request
                    │ { messageCode: "LOGIN_SUCCESS" }
                    ↓
┌─────────────────────────────────────────────────────────────┐
│                      EXPRESS API (Backend)                   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐│
│  │  Controllers / Services                                ││
│  │                                                        ││
│  │  return {                                             ││
│  │    messageCode: "LOGIN_SUCCESS",                      ││
│  │    token: jwtToken                                    ││
│  │  }                                                    ││
│  └────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Cambios en el Backend

### 1. Crear Archivo de Constantes de Códigos de Mensaje

**Ubicación**: `Backend/src/utils/messageCodes.js`

```javascript
/**
 * Códigos de mensaje estandarizados para sistema multiidioma
 * Estos códigos son traducidos en el frontend según el idioma del dispositivo
 */

const MESSAGE_CODES = {
  // Autenticación
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILED: "SIGNUP_FAILED",
  CREDENTIALS_INVALID: "CREDENTIALS_INVALID",
  TOKEN_INVALID: "TOKEN_INVALID",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",

  // Registro Específico
  VOLUNTEER_REGISTERED: "VOLUNTEER_REGISTERED",
  ORGANIZER_REGISTERED: "ORGANIZER_REGISTERED",

  // Actividades
  ACTIVITY_CREATED: "ACTIVITY_CREATED",
  ACTIVITY_UPDATED: "ACTIVITY_UPDATED",
  ACTIVITY_NOT_FOUND: "ACTIVITY_NOT_FOUND",
  ACTIVITY_DELETED: "ACTIVITY_DELETED",

  // Instancias
  INSTANCE_CREATED: "INSTANCE_CREATED",
  INSTANCE_UPDATED: "INSTANCE_UPDATED",
  INSTANCE_NOT_FOUND: "INSTANCE_NOT_FOUND",
  INSTANCE_NOT_ACCEPTING: "INSTANCE_NOT_ACCEPTING",

  // Inscripciones
  INSCRIPTION_SUCCESS: "INSCRIPTION_SUCCESS",
(buen momento para preguntar si quiere seguir con el contenido)  INSCRIPTION_ALREADY_EXISTS: "INSCRIPTION_ALREADY_EXISTS",
  INSCRIPTION_NOT_FOUND: "INSCRIPTION_NOT_FOUND",
  INSCRIPTION_OWNERSHIP_ERROR: "INSCRIPTION_OWNERSHIP_ERROR",
  ATTENDANCE_UPDATED: "ATTENDANCE_UPDATED",

  // Validación
  VALIDATION_ERROR: "VALIDATION_ERROR",
  MISSING_DATA: "MISSING_DATA",
  DUPLICATE_ERROR: "DUPLICATE_ERROR",

  // Permisos
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  OWNERSHIP_REQUIRED: "OWNERSHIP_REQUIRED",

  // Errores Generales
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
};

// Códigos de error personalizados con mensajes descriptivos
const ERROR_CODES = {
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  INSTANCE_FULL: "INSTANCE_FULL",
  INVALID_DATE_RANGE: "INVALID_DATE_RANGE",
  INVALID_STATUS: "INVALID_STATUS",
};

module.exports = {
  MESSAGE_CODES,
  ERROR_CODES,
};
```

### 2. Actualizar Error Handler Middleware

**Archivo**: `Backend/src/2_middlewares/errorHandler.middleware.js`

```javascript
const { logError, parseMongooseSchemaErrorMessages, parseMongoDBErrorMessages } = require("./helpers/errorHandler.helper");
const { MESSAGE_CODES, ERROR_CODES } = require("../../utils/messageCodes");

const errorHandler = (err, req, res, next) => {
  logError(err);

  // Error de validación de Joi Schema
  if (err.name === "JoiValidationError") {
    return res.status(400).json({
      messageCode: MESSAGE_CODES.VALIDATION_ERROR,
      details: err.details?.[0]?.message ?? null,
    });
  }

  // Error de validación de Mongoose Schema
  if (err.name === "ValidationError") {
    const messages = parseMongooseSchemaErrorMessages(err);
    return res.status(400).json({
      messageCode: MESSAGE_CODES.VALIDATION_ERROR,
      details: messages[0] || null,
    });
  }

  // Error de base de datos MongoDB [ej. campos duplicados]
  if (err.name === "MongoServerError") {
    const message = parseMongoDBErrorMessages(err);
    return res.status(409).json({
      messageCode: MESSAGE_CODES.DUPLICATE_ERROR,
      details: message || null,
    });
  }

  // Error personalizado para cuando no se encuentre un recurso
  if (err.message.startsWith("ERROR 001")) {
    const details = err.message.split(", ")[1];
    return res.status(404).json({
      messageCode: ERROR_CODES.RESOURCE_NOT_FOUND,
      dirname: __dirname,
      details: details || null,
    });
  }

  // Error personalizado para cuando la Instancia no acepta Inscripciones
  if (err.message.startsWith("ERROR 010")) {
    const details = err.message.split(", ")[1];
    return res.status(409).json({
      messageCode: ERROR_CODES.INSTANCE_FULL,
      details: details || null,
    });
  }

  // Error personalizado para ownership
  if (err.message.startsWith("ERROR 011")) {
    const details = err.message.split(", ")[1];
    return res.status(409).json({
      messageCode: MESSAGE_CODES.INSCRIPTION_OWNERSHIP_ERROR,
      details: details || null,
    });
  }

  // Error genérico no controlado
  res.status(500).json({
    messageCode: MESSAGE_CODES.INTERNAL_ERROR,
  });
};

module.exports = errorHandler;
```

### 3. Actualizar Controllers para Usar Códigos

**Ejemplo**: `Backend/src/3_controllers/auth.controller.js`

```javascript
const { organizerLogin, organizerSignUp } = require("../4_services/business/organizer.service");
const { volunteerLogin, volunteerSignUp } = require("../4_services/business/volunteer.service");
const { MESSAGE_CODES } = require("../../utils/messageCodes");

// VOLUNTEERS
const postVolunteerLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const sesionToken = await volunteerLogin(username, password);

    if (!sesionToken) {
      return res.status(400).json({
        messageCode: MESSAGE_CODES.CREDENTIALS_INVALID,
      });
    }

    res.status(200).json({
      messageCode: MESSAGE_CODES.LOGIN_SUCCESS,
      token: sesionToken,
    });
  } catch (err) {
    err.placeOfError = "Inicio de sesión de Volunteer";
    next(err);
  }
};

const postVolunteerSignUp = async (req, res, next) => {
  const { username, email, password, name, lastname, age, genre } = req.body;
  try {
    const newVolunteer = {
      username,
      email,
      password,
      name,
      lastname,
      age,
      genre,
      registrationDate: Date.now(),
    };
    await volunteerSignUp(newVolunteer);

    res.status(201).json({
      messageCode: MESSAGE_CODES.VOLUNTEER_REGISTERED,
    });
  } catch (err) {
    err.placeOfError = "Registro [SignUp] de Volunteer";
    next(err);
  }
};

// ORGANIZERS
const postOrganizerLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const sesionToken = await organizerLogin(username, password);

    if (!sesionToken) {
      return res.status(400).json({
        messageCode: MESSAGE_CODES.CREDENTIALS_INVALID,
      });
    }

    res.status(200).json({
      messageCode: MESSAGE_CODES.LOGIN_SUCCESS,
      token: sesionToken,
    });
  } catch (err) {
    err.placeOfError = "Inicio de sesión de Organizer";
    next(err);
  }
};

const postOrganizerSignUp = async (req, res, next) => {
  const { username, email, contactEmail, password, name, telephone, social, location } = req.body;
  try {
    const newOrganizer = {
      username,
      email,
      contactEmail,
      password,
      name,
      telephone,
      social,
      location,
    };
    await organizerSignUp(newOrganizer);

    res.status(201).json({
      messageCode: MESSAGE_CODES.ORGANIZER_REGISTERED,
    });
  } catch (err) {
    err.placeOfError = "Registro [SignUp] de Organizer";
    next(err);
  }
};

module.exports = {
  postVolunteerLogin,
  postVolunteerSignUp,
  postOrganizerLogin,
  postOrganizerSignUp,
};
```

**Ejemplo**: `Backend/src/3_controllers/activity.controller.js`

```javascript
const { activitiesSelect, activityInsert, activitySelectById } = require("../4_services/business/activity.service");
const { activityInstanceInsert, activityInstanceAddInscription, activityInstanceUpdate, activityInstanceSelectById } = require("../4_services/business/activityInstances.service");
const { updateInscriptionAttendance } = require("../4_services/business/inscription.service");
const { checkOwnership } = require("./helpers/ownership.helper");
const { MESSAGE_CODES } = require("../../utils/messageCodes");

const getActivities = async (req, res, next) => {
  try {
    const activities = await activitiesSelect(req.query);
    res.status(200).json({ activities });
  } catch (err) {
    err.placeOfError = "Error en obtener actividades";
    next(err);
  }
};

const postActivity = async (req, res, next) => {
  try {
    const { id } = req.session;
    const newActivity = { owner: id, ...req.body };
    const insertedActivity = await activityInsert(newActivity);
    res.status(201).json({
      messageCode: MESSAGE_CODES.ACTIVITY_CREATED,
      insertedActivity,
    });
  } catch (err) {
    err.placeOfError = "Error en insertar actividad";
    next(err);
  }
};

const postInstanceInscription = async (req, res, next) => {
  try {
    const volunteerId = req.session.id;
    const { activityId, instanceId } = req.params;

    if (!volunteerId || !activityId || !instanceId) {
      return res.status(400).json({
        messageCode: MESSAGE_CODES.MISSING_DATA,
      });
    }

    const newInscription = await activityInstanceAddInscription(instanceId, volunteerId);
    res.status(200).json({
      messageCode: MESSAGE_CODES.INSCRIPTION_SUCCESS,
      inscription: newInscription,
    });
  } catch (err) {
    err.placeOfError = "Error en inscripcion de voluntario en instancia";
    next(err);
  }
};

const patchInscriptionAttendance = async (req, res, next) => {
  try {
    const { activityId, instanceId, inscriptionId } = req.params;
    const { assisted } = req.body;

    let isOwner = await checkOwnership(res, activitySelectById, activityId, "Actividad", req.session.id);
    if (!isOwner) {
      return res.status(401).json({
        messageCode: MESSAGE_CODES.UNAUTHORIZED,
      });
    }

    const newData = await updateInscriptionAttendance(inscriptionId, instanceId, assisted);
    res.status(200).json({
      messageCode: MESSAGE_CODES.ATTENDANCE_UPDATED,
      newData,
    });
  } catch (err) {
    err.placeOfError = "Error en actualizar asistencia de inscripción";
    next(err);
  }
};

module.exports = {
  getActivities,
  postActivity,
  patchActivity,
  postActivityInstance,
  patchActivityInstance,
  postInstanceInscription,
  patchInscriptionAttendance,
};
```

### 4. Actualizar Constantes con Valores Neutros

**Archivo**: `Backend/src/utils/constants.js`

```javascript
//-------------------------------------------------- Cache Constants ------------------------------------------------------------
const DEFAULT_TTL = 60 * 60 * 24; // 24 hours

//-------------------------------------------------- User Types ------------------------------------------------------------
const USER_VOLUNTEER = "volunteer";
const USER_ORGANIZER = "organizer";

// Valores neutros que serán traducidos en el frontend
const VOLUNTEER_GENRE = ["male", "female", "unspecified"];
const ACTIVITY_CATEGORIES = ["social", "environmental", "educational", "cultural", "health", "emergency"];
const ACTIVITY_STATUS = ["inactive", "ongoing"];

module.exports = {
  DEFAULT_TTL,
  USER_VOLUNTEER,
  USER_ORGANIZER,
  ACTIVITY_CATEGORIES,
  VOLUNTEER_GENRE,
  ACTIVITY_STATUS,
};
```

---

## 📱 Cambios en el Frontend (React Native)

### 1. Estructura de Archivos

```
frontend/
├── src/
│   ├── i18n/
│   │   ├── index.js           # Configuración i18n
│   │   ├── translations/
│   │   │   ├── es.js          # Traducciones español
│   │   │   ├── en.js          # Traducciones inglés
│   │   │   └── constants.js   # Traducciones de constantes
│   │   └── languageDetector.js
│   └── ...
```

### 2. Configuración de i18n

**Archivo**: `frontend/src/i18n/index.js`

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";
import esTranslations from "./translations/es";
import enTranslations from "./translations/en";

// Detecta el idioma del dispositivo
const deviceLanguage = getLocales()[0]?.languageCode || "es";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    es: { translation: esTranslations },
    en: { translation: enTranslations },
  },
  lng: deviceLanguage,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

### 3. Traducciones en Español

**Archivo**: `frontend/src/i18n/translations/es.js`

```javascript
export default {
  // Autenticación
  LOGIN_SUCCESS: "Inicio de sesión correcta",
  LOGIN_FAILED: "Error al iniciar sesión",
  SIGNUP_SUCCESS: "Registro exitoso",
  SIGNUP_FAILED: "Error al registrarse",
  CREDENTIALS_INVALID: "Credenciales incorrectas",
  TOKEN_INVALID: "Token inválido",
  TOKEN_EXPIRED: "Token expirado",

  // Registro Específico
  VOLUNTEER_REGISTERED: "Voluntario registrado correctamente. Puede iniciar sesión",
  ORGANIZER_REGISTERED: "Organizador registrado correctamente. Puede iniciar sesión",

  // Actividades
  ACTIVITY_CREATED: "Actividad creada exitosamente",
  ACTIVITY_UPDATED: "Actividad actualizada exitosamente",
  ACTIVITY_NOT_FOUND: "Actividad no encontrada",
  ACTIVITY_DELETED: "Actividad eliminada exitosamente",

  // Instancias
  INSTANCE_CREATED: "Instancia creada exitosamente",
  INSTANCE_UPDATED: "Instancia actualizada exitosamente",
  INSTANCE_NOT_FOUND: "Instancia no encontrada",
  INSTANCE_NOT_ACCEPTING: "Esta instancia no acepta inscripciones",

  // Inscripciones
  INSCRIPTION_SUCCESS: "Inscripción realizada correctamente",
  INSCRIPTION_ALREADY_EXISTS: "Ya estás inscrito en esta instancia",
  INSCRIPTION_NOT_FOUND: "Inscripción no encontrada",
  INSCRIPTION_OWNERSHIP_ERROR: "No puedes eliminar esta inscripción",
  ATTENDANCE_UPDATED: "Asistencia actualizada correctamente",

  // Validación
  VALIDATION_ERROR: "Datos incorrectos",
  MISSING_DATA: "Faltan datos",
  DUPLICATE_ERROR: "El dato ya existe",

  // Permisos
  UNAUTHORIZED: "No tienes permisos para realizar esta acción",
  FORBIDDEN: "Acceso prohibido",
  OWNERSHIP_REQUIRED: "No eres el propietario de este recurso",

  // Errores Generales
  INTERNAL_ERROR: "Algo no salió correctamente. Por favor intente nuevamente",
  SERVICE_UNAVAILABLE: "Servicio temporalmente no disponible",

  // Errores específicos
  RESOURCE_NOT_FOUND: "Recurso no encontrado",
  INSTANCE_FULL: "La instancia está llena",
  INVALID_DATE_RANGE: "Rango de fechas inválido",
  INVALID_STATUS: "Estado inválido",
};
```

### 4. Traducciones en Inglés

**Archivo**: `frontend/src/i18n/translations/en.js`

```javascript
export default {
  // Authentication
  LOGIN_SUCCESS: "Login successful",
  LOGIN_FAILED: "Login failed",
  SIGNUP_SUCCESS: "Sign up successful",
  SIGNUP_FAILED: "Sign up failed",
  CREDENTIALS_INVALID: "Invalid credentials",
  TOKEN_INVALID: "Invalid token",
  TOKEN_EXPIRED: "Token expired",

  // Specific Registration
  VOLUNTEER_REGISTERED: "Volunteer registered successfully. You can now log in",
  ORGANIZER_REGISTERED: "Organizer registered successfully. You can now log in",

  // Activities
  ACTIVITY_CREATED: "Activity created successfully",
  ACTIVITY_UPDATED: "Activity updated successfully",
  ACTIVITY_NOT_FOUND: "Activity not found",
  ACTIVITY_DELETED: "Activity deleted successfully",

  // Instances
  INSTANCE_CREATED: "Instance created successfully",
  INSTANCE_UPDATED: "Instance updated successfully",
  INSTANCE_NOT_FOUND: "Instance not found",
  INSTANCE_NOT_ACCEPTING: "This instance is not accepting inscriptions",

  // Inscriptions
  INSCRIPTION_SUCCESS: "Inscription completed successfully",
  INSCRIPTION_ALREADY_EXISTS: "You are already inscribed in this instance",
  INSCRIPTION_NOT_FOUND: "Inscription not found",
  INSCRIPTION_OWNERSHIP_ERROR: "You cannot delete this inscription",
  ATTENDANCE_UPDATED: "Attendance updated successfully",

  // Validation
  VALIDATION_ERROR: "Invalid data",
  MISSING_DATA: "Missing data",
  DUPLICATE_ERROR: "Data already exists",

  // Permissions
  UNAUTHORIZED: "You don't have permission to perform this action",
  FORBIDDEN: "Access forbidden",
  OWNERSHIP_REQUIRED: "You are not the owner of this resource",

  // General Errors
  INTERNAL_ERROR: "Something went wrong. Please try again",
  SERVICE_UNAVAILABLE: "Service temporarily unavailable",

  // Specific Errors
  RESOURCE_NOT_FOUND: "Resource not found",
  INSTANCE_FULL: "Instance is full",
  INVALID_DATE_RANGE: "Invalid date range",
  INVALID_STATUS: "Invalid status",
};
```

### 5. Traducciones de Constantes

**Archivo**: `frontend/src/i18n/translations/constants.js`

```javascript
export const activityCategories = {
  es: {
    social: "Social",
    environmental: "Ambiental",
    educational: "Educativo",
    cultural: "Cultural",
    health: "Salud",
    emergency: "Emergencia",
  },
  en: {
    social: "Social",
    environmental: "Environmental",
    educational: "Educational",
    cultural: "Cultural",
    health: "Health",
    emergency: "Emergency",
  },
};

export const volunteerGenres = {
  es: {
    male: "Hombre",
    female: "Mujer",
    unspecified: "No especificado",
  },
  en: {
    male: "Male",
    female: "Female",
    unspecified: "Unspecified",
  },
};

export const activityStatus = {
  es: {
    inactive: "Inactiva",
    ongoing: "En curso",
  },
  en: {
    inactive: "Inactive",
    ongoing: "Ongoing",
  },
};
```

### 6. Hook Personalizado para Traducir Respuestas del API

**Archivo**: `frontend/src/hooks/useApiMessage.js`

```javascript
import { useTranslation } from "react-i18next";

export const useApiMessage = () => {
  const { t } = useTranslation();

  const translateApiMessage = (response) => {
    if (response?.messageCode) {
      return t(response.messageCode);
    }
    return response?.message || "Error desconocido";
  };

  return { translateApiMessage };
};
```

### 7. Uso en Componentes

**Ejemplo**: Manejo de login

```javascript
import React, { useState } from 'react';
import { useApiMessage } from '../hooks/useApiMessage';
import api from '../services/api';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { translateApiMessage } = useApiMessage();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/voluntario/iniciar_sesion', {
        username,
        password,
      });

      // Traducir mensaje del backend
      const message = translateApiMessage(response.data);
      Alert.alert('Éxito', message);

      // Guardar token y navegar
      // ...
    } catch (error) {
      const message = translateApiMessage(error.response?.data);
      Alert.alert('Error', message);
    }
  };

  return (
    // ... UI del login
  );
};
```

### 8. Middleware de Traducción para Peticiones HTTP

**Archivo**: `frontend/src/services/api.js`

```javascript
import axios from "axios";
import { translateApiMessage } from "../hooks/useApiMessage";

const api = axios.create({
  baseURL: "https://tu-api.com",
});

// Interceptor para traducir mensajes automáticamente
api.interceptors.response.use(
  (response) => {
    // Traducir código de mensaje si existe
    if (response.data?.messageCode) {
      response.data.translatedMessage = translateApiMessage(response.data);
    }
    return response;
  },
  (error) => {
    // Traducir errores
    if (error.response?.data?.messageCode) {
      error.response.data.translatedMessage = translateApiMessage(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 📊 Estructura de Códigos de Mensaje

### Convención de Nomenclatura

Los códigos siguen el patrón: `CATEGORIA_ACCION_RESULTADO`

**Ejemplos**:

- `LOGIN_SUCCESS` - Login exitoso
- `ACTIVITY_CREATED` - Actividad creada
- `CREDENTIALS_INVALID` - Credenciales inválidas
- `INSTANCE_NOT_ACCEPTING` - Instancia no acepta inscripciones

### Categorías Principales

| Categoría   | Descripción   | Ejemplos                                        |
| ----------- | ------------- | ----------------------------------------------- |
| AUTH        | Autenticación | LOGIN_SUCCESS, CREDENTIALS_INVALID              |
| ACTIVITY    | Actividades   | ACTIVITY_CREATED, ACTIVITY_NOT_FOUND            |
| INSTANCE    | Instancias    | INSTANCE_CREATED, INSTANCE_FULL                 |
| INSCRIPTION | Inscripciones | INSCRIPTION_SUCCESS, INSCRIPTION_ALREADY_EXISTS |
| VALIDATION  | Validación    | VALIDATION_ERROR, MISSING_DATA                  |
| PERMISSION  | Permisos      | UNAUTHORIZED, FORBIDDEN                         |
| ERROR       | Errores       | INTERNAL_ERROR, SERVICE_UNAVAILABLE             |

---

## 💡 Ejemplos de Implementación

### Ejemplo 1: Registro de Voluntario

**Backend**:

```javascript
// Controller
res.status(201).json({
  messageCode: MESSAGE_CODES.VOLUNTEER_REGISTERED,
});
```

**Frontend - Español**:

```javascript
"VOLUNTEER_REGISTERED": "Voluntario registrado correctamente. Puede iniciar sesión"
```

**Frontend - Inglés**:

```javascript
"VOLUNTEER_REGISTERED": "Volunteer registered successfully. You can now log in"
```

### Ejemplo 2: Error de Inscripción

**Backend**:

```javascript
// Error handler
res.status(409).json({
  messageCode: ERROR_CODES.INSTANCE_FULL,
  details: "La instancia tiene 50 voluntarios inscritos",
});
```

**Frontend - Español**:

```javascript
"INSTANCE_FULL": "La instancia está llena"
```

**Frontend - Inglés**:

```javascript
"INSTANCE_FULL": "Instance is full"
```

### Ejemplo 3: Traducción de Constantes

**Backend**:

```javascript
activity = {
  categories: ["social", "environmental"],
  status: "ongoing",
};
```

**Frontend**:

```javascript
import { activityCategories, activityStatus } from "../i18n/translations/constants";

const translateCategory = (category, lang) => activityCategories[lang][category];

const translateStatus = (status, lang) => activityStatus[lang][status];

// Uso
console.log(translateCategory("social", "es")); // "Social"
console.log(translateCategory("social", "en")); // "Social"
console.log(translateStatus("ongoing", "es")); // "En curso"
console.log(translateStatus("ongoing", "en")); // "Ongoing"
```

---

## ✅ Mejores Prácticas

### Backend

1. **Consistencia**: Usar siempre códigos de mensaje, nunca texto hardcodeado
2. **Documentación**: Documentar todos los códigos nuevos en `messageCodes.js`
3. **Versionado**: Mantener compatibilidad hacia atrás durante la migración
4. **Detalles Opcionales**: Incluir campo `details` para información adicional
5. **Logging**: Mantener logs en español/interno para debugging

### Frontend

1. **Detección Automática**: Detectar idioma del dispositivo automáticamente
2. **Fallback**: Siempre tener fallback a español
3. **Caché**: Cachear traducciones para mejor rendimiento
4. **Validación**: Validar que existen traducciones para todos los códigos
5. **Testing**: Probar aplicación en ambos idiomas

### Colaboración

1. **Comunicación**: Documentar códigos nuevos cuando se agregan
2. **Estándares**: Seguir convención de nomenclatura consistente
3. **Testing**: Probar en ambos idiomas antes de deployar
4. **Documentación**: Mantener diccionario de códigos actualizado

---

## 🗺️ Migración y Roadmap

### Fase 1: Preparación (Semana 1)

- [ ] Crear archivo `messageCodes.js` con todos los códigos
- [ ] Documentar estructura de códigos
- [ ] Preparar sistema de traducciones en frontend

### Fase 2: Implementación Backend (Semana 2-3)

- [ ] Actualizar `errorHandler.middleware.js`
- [ ] Actualizar controllers principales:
  - [ ] `auth.controller.js`
  - [ ] `activity.controller.js`
  - [ ] `volunteer.controller.js`
  - [ ] `organizer.controller.js`
- [ ] Actualizar constantes en `constants.js`
- [ ] Testing de endpoints

### Fase 3: Implementación Frontend (Semana 4-5)

- [ ] Configurar i18n en React Native
- [ ] Crear archivos de traducción (es/en)
- [ ] Implementar hook `useApiMessage`
- [ ] Actualizar componentes principales
- [ ] Testing de traducciones

### Fase 4: Validación y Testing (Semana 6)

- [ ] Testing completo en ambos idiomas
- [ ] Validar todos los flujos de usuario
- [ ] Testing de cambios de idioma en runtime
- [ ] Documentación de usuario

### Fase 5: Deploy (Semana 7)

- [ ] Deploy a staging
- [ ] Validación con usuarios beta
- [ ] Deploy a producción
- [ ] Monitoreo post-deploy

---

## 📝 Notas Adicionales

### Dependencias Frontend Recomendadas

```json
{
  "dependencies": {
    "i18next": "^23.0.0",
    "react-i18next": "^13.0.0",
    "react-native-localize": "^3.0.0"
  }
}
```

### Cambio de Idioma en Runtime

Para permitir que el usuario cambie el idioma dentro de la app:

```javascript
import i18n from "../i18n";

const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  // Opcional: Guardar preferencia en AsyncStorage
};
```

### Manejo de Detalles Adicionales

El backend puede enviar información adicional en el campo `details`:

```javascript
res.status(400).json({
  messageCode: MESSAGE_CODES.VALIDATION_ERROR,
  details: "El campo 'email' debe ser un email válido",
});
```

El frontend puede mostrar estos detalles:

```javascript
const { translateApiMessage } = useApiMessage();
const message = translateApiMessage(response.data);
const details = response.data.details;

Alert.alert(message, details);
```

---

## 🔗 Referencias

- [i18next Documentation](https://www.i18next.com/)
- [React Native Localize](https://github.com/zoontek/react-native-localize)
- [Best Practices for Internationalization](https://www.i18next.com/principles/best-practices)

---

**Última actualización**: {{ fecha actual }}  
**Versión**: 1.0  
**Autor**: Equipo de Desarrollo ORT_Mobile
