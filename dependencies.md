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

### express (^5.1.0)

- **Descripción**: Framework web minimalista para Node.js
- **Documentación**: https://expressjs.com/
- **Uso en el proyecto**: Servidor web principal

### joi (^18.0.1)

- **Descripción**: Validador de esquemas de datos
- **Documentación**: https://joi.dev/
- **Uso en el proyecto**: Validación de payloads de requests

### jsonwebtoken (^9.0.2)

- **Descripción**: Implementación de JSON Web Tokens
- **Documentación**: https://www.npmjs.com/package/jsonwebtoken
- **Uso en el proyecto**: Autenticación y autorización

### morgan (^1.10.1)

- **Descripción**: Middleware de logging para HTTP requests
- **Documentación**: https://www.npmjs.com/package/morgan
- **Uso en el proyecto**: Logging de requests HTTP

### swagger-ui-express (^5.0.1)

- **Descripción**: Middleware para servir documentación Swagger UI
- **Documentación**: https://www.npmjs.com/package/swagger-ui-express
- **Uso en el proyecto**: Documentación interactiva de la API
- **Archivos relacionados**: `swagger.json`

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

- **Fecha**: 19/09/2025 01:23:23
- **Versión del proyecto**: 1.0.0

---

**Nota**: Este archivo se actualiza automáticamente cada vez que se agregan nuevas dependencias al proyecto.
