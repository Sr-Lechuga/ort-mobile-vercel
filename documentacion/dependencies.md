# Dependencias del Proyecto ORT Mobile

Este documento contiene información sobre todas las dependencias utilizadas en el proyecto Backend.

## Instalación

Para instalar todas las dependencias, ejecuta el siguiente comando en la carpeta `Backend`:

```bash
npm install
```

O utiliza el script ejecutable:

```bash
./install-deps.bat
```

## Dependencias de Producción

### bcrypt (^6.0.0)

- **Descripción**: Biblioteca para hashing de contraseñas
- **Documentación**: https://www.npmjs.com/package/bcrypt
- **Uso en el proyecto**: Encriptación de contraseñas de usuarios

### cors (^2.8.5)

- **Descripción**: Middleware de Express para habilitar CORS (Cross-Origin Resource Sharing)
- **Documentación**: https://www.npmjs.com/package/cors
- **Uso en el proyecto**: Permite peticiones desde diferentes orígenes (frontend en diferentes dominios/puertos)

### express (^5.1.0)

- **Descripción**: Framework web minimalista para Node.js
- **Documentación**: https://expressjs.com/
- **Uso en el proyecto**: Servidor web principal

### express-rate-limit (^8.1.0)

- **Descripción**: Middleware de rate limiting para Express
- **Documentación**: https://www.npmjs.com/package/express-rate-limit
- **Uso en el proyecto**: Protección contra ataques de fuerza bruta y control de tasa de peticiones por IP

### joi (^18.0.1)

- **Descripción**: Validador de esquemas de datos
- **Documentación**: https://joi.dev/
- **Uso en el proyecto**: Validación de payloads de requests

### jsonwebtoken (^9.0.2)

- **Descripción**: Implementación de JSON Web Tokens
- **Documentación**: https://www.npmjs.com/package/jsonwebtoken
- **Uso en el proyecto**: Autenticación y autorización

### mongoose (^8.0.0)

- **Descripción**: Biblioteca de modelado de objetos para MongoDB
- **Documentación**: https://mongoosejs.com/
- **Uso en el proyecto**: ODM para interactuar con MongoDB, modelos de datos y validaciones

### morgan (^1.10.1)

- **Descripción**: Middleware de logging para HTTP requests
- **Documentación**: https://www.npmjs.com/package/morgan
- **Uso en el proyecto**: Logging de requests HTTP

### swagger-ui-express (^5.0.1)

- **Descripción**: Middleware para servir documentación Swagger UI
- **Documentación**: https://www.npmjs.com/package/swagger-ui-express
- **Uso en el proyecto**: Documentación interactiva de la API
- **Archivos relacionados**: `swagger.json`

### node-cache (^5.1.2)

- **Descripción**: Sistema de caché en memoria simple y rápido para Node.js
- **Documentación**: https://www.npmjs.com/package/node-cache
- **Uso en el proyecto**: Adaptador de caché en memoria para desarrollo y aplicaciones de baja escala
- **Archivos relacionados**: `src/4_services/cache/adapters/inMemory.adapter.js`

### @upstash/redis (^1.35.4)

- **Descripción**: Cliente de Redis serverless compatible con REST API de Upstash
- **Documentación**: https://github.com/upstash/upstash-redis
- **Uso en el proyecto**: Adaptador de caché distribuido para producción usando Redis serverless
- **Archivos relacionados**: `src/4_services/cache/adapters/redis.adapter.js`
- **Variables de entorno requeridas**: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

## Dependencias de Desarrollo

### dotenv (^17.2.2)

- **Descripción**: Carga variables de entorno desde archivo .env
- **Documentación**: https://www.npmjs.com/package/dotenv
- **Uso en el proyecto**: Configuración de variables de entorno

### nodemon (^3.1.10)

- **Descripción**: Monitoreo de archivos para reinicio automático del servidor
- **Documentación**: https://www.npmjs.com/package/nodemon
- **Uso en el proyecto**: Desarrollo con reinicio automático

## Última actualización

- **Fecha**: 01/10/2025
- **Versión del proyecto**: 1.0.0

---

**Nota**: Este archivo se actualiza automáticamente cada vez que se agregan nuevas dependencias al proyecto.
