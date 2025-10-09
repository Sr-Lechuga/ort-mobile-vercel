# ORT Mobile - Backend API

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![License](https://img.shields.io/badge/license-ISC-yellow.svg)

**Plataforma de gestión de voluntariado para conectar voluntarios con centros de actividades solidarias**

[🌐 Demo en Vivo](https://ort-mobile-vercel.vercel.app/) | [📖 Documentación](./documentacion/) | [🐛 Reportar Bug](https://github.com/tu-repo/issues)

</div>

---

## 🌟 Sobre el Proyecto

ORT Mobile Backend es una API RESTful diseñada para facilitar la conexión entre voluntarios y centros organizadores de actividades solidarias. La plataforma permite la gestión completa de actividades, inscripciones, asistencias y perfiles tanto de voluntarios como de organizadores.

### ✨ Características Principales

- 🔐 **Autenticación JWT** - Sistema seguro de autenticación con tokens
- 👥 **Gestión de Usuarios** - Registro y administración de voluntarios y organizadores
- 📅 **Actividades** - Creación, edición y gestión de actividades con múltiples instancias
- 📝 **Inscripciones** - Sistema completo de inscripción y confirmación de asistencia
- 🔍 **Búsqueda Avanzada** - Filtrado por categorías, fechas y ubicación
- 📊 **API Documentada** - Documentación interactiva con Swagger
- 🚀 **Rate Limiting** - Protección contra abuso de endpoints
- 💾 **Sistema de Caché** - Soporte para caché in-memory y Redis
- 🌐 **CORS Habilitado** - Integración segura con aplicaciones frontend

---

## 🚀 Deploy en Producción

### 🌐 Aplicación Desplegada

La API está actualmente desplegada y disponible en:

### **🔗 [https://ort-mobile-vercel.vercel.app/](https://ort-mobile-vercel.vercel.app/)**

#### Endpoints Principales:

- **API Base**: `https://ort-mobile-vercel.vercel.app/`
- **Documentación Swagger**: `https://ort-mobile-vercel.vercel.app/swagger`
- **Health Check**: `https://ort-mobile-vercel.vercel.app/pong`

#### 📝 Nota sobre el Deploy

- La aplicación está desplegada en **Vercel** con integración continua desde el repositorio
- Utiliza **MongoDB Atlas** como base de datos en la nube
- Soporta **Redis** mediante Upstash para caché distribuido
- Configuración automática mediante variables de entorno en Vercel

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Contribuir](#-contribuir)
- [Tecnologías](#-tecnologías)
- [Licencia](#-licencia)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 16.0.0
- **npm** >= 7.0.0
- **MongoDB Atlas** - Cuenta y cluster configurado
- **Git** - Para clonar el repositorio

---

## 📦 Instalación

### Opción 1: Instalación Rápida (Windows)

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/ORT_Movile.git
   cd ORT_Movile
   ```

2. **Ejecutar el script de instalación**

   ```bash
   install-deps.bat
   ```

   Este script instalará automáticamente todas las dependencias necesarias.

### Opción 2: Instalación Manual

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/ORT_Movile.git
   cd ORT_Movile
   ```

2. **Navegar al directorio del Backend**

   ```bash
   cd Backend
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

---

## ⚙️ Configuración

### 1. Crear archivo `.env`

En el directorio `Backend/`, crea un archivo `.env` con las siguientes variables:

```env
# Ver la sección "Variables de Entorno" más abajo para detalles completos
PORT=3000
ATLAS_URI=tu_conexion_mongodb_atlas
JWT_SECRET=tu_secreto_jwt_super_seguro
RATE_LIMIT_WINDOW_ATTEMPTS=30
CACHE_TYPE=in-memory
CACHE_DEBUG=false
```

### 2. Configurar MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster
3. Configura las credenciales de acceso
4. Obtén la URI de conexión
5. Añade tu IP a la lista blanca
6. Pega la URI en la variable `ATLAS_URI` de tu archivo `.env`

---

## 🔐 Variables de Entorno

Configura las siguientes variables en tu archivo `.env`:

### Variables Obligatorias

| Variable                     | Descripción                                                 | Ejemplo                                                       |
| ---------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| `PORT`                       | Puerto en el que correrá el servidor                        | `3000`                                                        |
| `ATLAS_URI`                  | URI de conexión a MongoDB Atlas                             | `mongodb+srv://usuario:password@cluster.mongodb.net/database` |
| `JWT_SECRET`                 | Clave secreta para firmar tokens JWT (mínimo 32 caracteres) | `tu_clave_super_secreta_y_larga_12345`                        |
| `RATE_LIMIT_WINDOW_ATTEMPTS` | Número máximo de requests por minuto por IP                 | `30`                                                          |

### Variables Opcionales

| Variable                   | Descripción                                                  | Valores                  | Default     |
| -------------------------- | ------------------------------------------------------------ | ------------------------ | ----------- |
| `CACHE_TYPE`               | Tipo de sistema de caché a utilizar                          | `in-memory` o `redis`    | `in-memory` |
| `CACHE_DEBUG`              | Activar logs de debug del caché                              | `true` o `false`         | `false`     |
| `UPSTASH_REDIS_REST_URL`   | URL de tu instancia Redis (solo si `CACHE_TYPE=redis`)       | `https://xxx.upstash.io` | -           |
| `UPSTASH_REDIS_REST_TOKEN` | Token de autenticación de Redis (solo si `CACHE_TYPE=redis`) | `AxxxxxxxxxxxXXX`        | -           |

### 📝 Notas Importantes

- **Seguridad**: Nunca compartas tu archivo `.env` ni lo subas al repositorio
- **JWT_SECRET**: Usa una cadena larga y aleatoria (recomendado 32+ caracteres)
- **ATLAS_URI**: Asegúrate de reemplazar `<password>` con tu contraseña real
- **Redis**: Solo necesario si quieres usar caché distribuido (opcional)

### Ejemplo Completo

```env
# Servidor
PORT=3000

# Base de Datos
ATLAS_URI=mongodb+srv://usuario:MiPassword123@cluster0.xxxxx.mongodb.net/ort_mobile?retryWrites=true&w=majority

# Autenticación
JWT_SECRET=mi_secreto_jwt_super_seguro_y_largo_con_caracteres_aleatorios_123456789

# Rate Limiting
RATE_LIMIT_WINDOW_ATTEMPTS=30

# Sistema de Caché (Opcional)
CACHE_TYPE=in-memory
CACHE_DEBUG=false

# Redis (Solo si CACHE_TYPE=redis)
# UPSTASH_REDIS_REST_URL=https://tu-instancia.upstash.io
# UPSTASH_REDIS_REST_TOKEN=tu_token_de_redis
```

---

## 🎯 Uso

### Modo Desarrollo

Inicia el servidor con hot-reload automático:

```bash
cd Backend
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

### Modo Producción

Inicia el servidor en modo producción:

```bash
cd Backend
npm start
```

### Verificar que funciona

1. Abre tu navegador en `http://localhost:3000/ping`
2. Deberías ver: `{"message": "pong"}`

### Documentación Interactiva

Accede a la documentación Swagger en:

- **Local**: `http://localhost:3000/swagger`
- **Producción**: `https://ort-mobile-vercel.vercel.app/swagger`

---

## 📁 Estructura del Proyecto

```
ORT_Movile/
├── Backend/
│   ├── index.js                          # Punto de entrada de la aplicación
│   ├── package.json                      # Dependencias y scripts
│   ├── swagger.json                      # Documentación OpenAPI
│   ├── PRUEBAS_REST/                     # Archivos de prueba REST Client
│   └── src/
│       ├── 1_routes/                     # Definición de rutas
│       │   ├── auth.route.js
│       │   ├── activity.route.js
│       │   ├── organizer.route.js
│       │   ├── volunteer.route.js
│       │   └── public.route.js
│       ├── 2_middlewares/                # Middlewares de Express
│       │   ├── errorHandler.middleware.js
│       │   ├── payloadValidator.middleware.js
│       │   ├── verifySesion.middleware.js
│       │   ├── verifyAccessLevel.middleware.js
│       │   └── request_schemas/          # Esquemas Joi para validación
│       ├── 3_controllers/                # Controladores de lógica de negocio
│       │   ├── auth.controller.js
│       │   ├── activity.controller.js
│       │   ├── organizer.controller.js
│       │   ├── volunteer.controller.js
│       │   └── public.controller.js
│       ├── 4_services/                   # Servicios de negocio
│       │   ├── activity.service.js
│       │   ├── activityInstances.service.js
│       │   ├── inscription.service.js
│       │   ├── organizer.service.js
│       │   ├── volunteer.service.js
│       │   ├── cache/                    # Sistema de caché
│       │   └── helpers/                  # Funciones auxiliares
│       ├── 5_repositories/               # Capa de acceso a datos
│       │   ├── activity.repository.js
│       │   ├── activityInstance.repository.js
│       │   ├── inscription.repository.js
│       │   ├── organizer.repository.js
│       │   └── volunteer.repository.js
│       ├── models/                       # Modelos de Mongoose
│       │   ├── activity.model.js
│       │   ├── activityInstance.model.js
│       │   ├── inscription.model.js
│       │   ├── organizer.model.js
│       │   └── volunteer.model.js
│       ├── config/                       # Configuraciones
│       │   ├── mongodb.js
│       │   └── rateLimiter.js
│       └── utils/                        # Utilidades generales
│           ├── constants.js
│           └── datesHandler.js
├── documentacion/                        # Documentación del proyecto
│   ├── analisis-funcional/
│   ├── arquitectura/
│   ├── dependencies.md
│   ├── REGLAS_REPOSITORIO.md
│   └── resumenes/                        # Resúmenes diarios de desarrollo
├── install-deps.bat                      # Script de instalación (Windows)
├── vercel.json                           # Configuración de Vercel
└── README.md                             # Este archivo
```

### 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas** con separación de responsabilidades:

1. **Routes (1_routes)**: Definición de endpoints y enrutamiento
2. **Middlewares (2_middlewares)**: Validación, autenticación y manejo de errores
3. **Controllers (3_controllers)**: Coordinación entre servicios y respuestas HTTP
4. **Services (4_services)**: Lógica de negocio y operaciones complejas
5. **Repositories (5_repositories)**: Acceso y manipulación de datos
6. **Models**: Esquemas de MongoDB con Mongoose

---

## 🌐 API Endpoints

### Autenticación

| Método | Endpoint                   | Descripción           | Auth |
| ------ | -------------------------- | --------------------- | ---- |
| POST   | `/auth/login`              | Iniciar sesión        | No   |
| POST   | `/auth/register/volunteer` | Registrar voluntario  | No   |
| POST   | `/auth/register/organizer` | Registrar organizador | No   |

### Actividades

| Método | Endpoint             | Descripción                  | Auth        |
| ------ | -------------------- | ---------------------------- | ----------- |
| GET    | `/v1/activities`     | Listar todas las actividades | Sí          |
| GET    | `/v1/activities/:id` | Obtener una actividad        | Sí          |
| POST   | `/v1/activities`     | Crear nueva actividad        | Organizador |
| PUT    | `/v1/activities/:id` | Actualizar actividad         | Organizador |
| DELETE | `/v1/activities/:id` | Eliminar actividad           | Organizador |

### Voluntarios

| Método | Endpoint                                    | Descripción             | Auth       |
| ------ | ------------------------------------------- | ----------------------- | ---------- |
| GET    | `/v1/volunteers/me`                         | Obtener perfil propio   | Voluntario |
| PUT    | `/v1/volunteers/me`                         | Actualizar perfil       | Voluntario |
| POST   | `/v1/volunteers/activities/:id/inscription` | Inscribirse a actividad | Voluntario |
| DELETE | `/v1/volunteers/activities/:id/inscription` | Desinscribirse          | Voluntario |

### Organizadores

| Método | Endpoint            | Descripción           | Auth        |
| ------ | ------------------- | --------------------- | ----------- |
| GET    | `/v1/organizers/me` | Obtener perfil propio | Organizador |
| PUT    | `/v1/organizers/me` | Actualizar perfil     | Organizador |

### Público

| Método | Endpoint    | Descripción           | Auth |
| ------ | ----------- | --------------------- | ---- |
| GET    | `/pong`     | Health check          | No   |
| GET    | `/api-docs` | Documentación Swagger | No   |

Para documentación completa de todos los endpoints, visita `/api-docs` en el servidor.

---

## 🧪 Testing

### Archivos REST Client

El proyecto incluye archivos `.REST` para probar los endpoints fácilmente:

```bash
Backend/PRUEBAS_REST/
├── activities.REST           # Pruebas de actividades
├── activityInstances.REST    # Pruebas de instancias
├── organizers.REST           # Pruebas de organizadores
└── volunteers.REST           # Pruebas de voluntarios
```

### Usar con VS Code

1. Instala la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
2. Abre cualquier archivo `.REST`
3. Haz clic en "Send Request" sobre cualquier petición

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

### 1. Fork del Proyecto

Haz clic en el botón "Fork" en la esquina superior derecha.

### 2. Clonar tu Fork

```bash
git clone https://github.com/tu-usuario/ORT_Movile.git
cd ORT_Movile
```

### 3. Crear una Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

### 4. Hacer tus Cambios

Asegúrate de seguir las **reglas del repositorio**:

#### 📝 Convenciones de Código

- **Nomenclatura**:

  - `camelCase` para variables y funciones
  - `PascalCase` para clases y constructores
  - `UPPER_CASE` para constantes

- **Comentarios**:
  - TODOS los comentarios deben estar en **español**
  - TODA la documentación debe estar en **español**
  - Los nombres de variables y funciones pueden estar en inglés

#### ✅ Ejemplo

```javascript
// Función para validar el email del usuario
function validateEmail(email) {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verificar formato del email
  return EMAIL_REGEX.test(email);
}
```

### 5. Commit de los Cambios

```bash
git add .
git commit -m "feat: descripción clara de la funcionalidad"
```

### 6. Push a tu Fork

```bash
git push origin feature/nueva-funcionalidad
```

### 7. Abrir un Pull Request

Ve a GitHub y abre un Pull Request describiendo tus cambios.

### 📖 Documentación de Cambios

Al agregar nuevas dependencias:

1. Actualiza `documentacion/dependencies.md`
2. Actualiza `install-deps.bat` si es necesario
3. Documenta los cambios en `documentacion/resumenes/YYYY-MM-DD_resumen.md`

Para más información, consulta [REGLAS_REPOSITORIO.md](./documentacion/REGLAS_REPOSITORIO.md)

---

## 🛠️ Tecnologías

### Backend Framework

- **[Express.js](https://expressjs.com/)** - Framework web minimalista y flexible

### Base de Datos

- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB

### Autenticación y Seguridad

- **[JWT](https://jwt.io/)** - Autenticación basada en tokens
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Hashing de contraseñas
- **[express-rate-limit](https://www.npmjs.com/package/express-rate-limit)** - Rate limiting

### Validación y Middleware

- **[Joi](https://joi.dev/)** - Validación de esquemas
- **[CORS](https://www.npmjs.com/package/cors)** - Habilitación de CORS

### Caché

- **[node-cache](https://www.npmjs.com/package/node-cache)** - Caché in-memory
- **[@upstash/redis](https://upstash.com/)** - Redis como servicio

### Documentación

- **[Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)** - Documentación interactiva

### Desarrollo

- **[dotenv](https://www.npmjs.com/package/dotenv)** - Variables de entorno
- **[nodemon](https://nodemon.io/)** - Hot-reload en desarrollo
- **[morgan](https://www.npmjs.com/package/morgan)** - Logger HTTP

### Deploy

- **[Vercel](https://vercel.com/)** - Plataforma de deployment

---

## 📊 Estado del Proyecto

### ✅ Funcionalidades Implementadas

- ✅ Sistema de autenticación JWT
- ✅ Registro de voluntarios y organizadores
- ✅ Creación y gestión de actividades
- ✅ Sistema de inscripciones
- ✅ Confirmación de asistencia
- ✅ Búsqueda y filtrado de actividades
- ✅ Desinscripción de actividades
- ✅ Documentación con Swagger
- ✅ Rate limiting
- ✅ Sistema de caché

### ⌛ Próximas Funcionalidades

- ⌛ Sistema de badges
- ⌛ Perfiles públicos
- ⌛ Sistema de comentarios y ratings
- ⌛ Notificaciones
- ⌛ Historial de participación

---

## 📞 Contacto y Soporte

- 📧 **Email**: jonattanlima@gmail.com o nicolasgcardani@gmail.com
- 🐛 **Issues**: [Reportar un problema](https://github.com/Sr-Lechuga/ORT_Movile/issues)
- 📖 **Documentación**: [Ver documentación completa](./documentacion/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 🙏 Agradecimientos

- ORT Uruguay por el proyecto educativo
- Martin Luz por guiarnos en este viaje

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella ⭐**

Hecho con ❤️ para conectar voluntarios con causas solidarias

[⬆ Volver arriba](#ort-mobile---backend-api)

</div>
