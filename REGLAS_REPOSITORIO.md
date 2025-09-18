# Reglas del Repositorio ORT Mobile Backend

## Reglas de Documentación

### 1. Idioma de Documentación

- **TODOS** los comentarios en el código deben estar en **español**
- **TODA** la documentación debe estar en **español**
- Los nombres de variables y funciones pueden estar en inglés, pero los comentarios explicativos deben ser en español

### 2. Sistema de Resúmenes Diarios

- Cada interacción con el asistente de IA se guarda en un archivo diario
- Ubicación: `resumenes/YYYY-MM-DD_resumen.md`
- Formato: Markdown con estructura clara
- Contenido: Todas las tareas, cambios de código y decisiones tomadas

### 3. Documentación de Dependencias

- Archivo principal: `dependencies.md`
- Se actualiza automáticamente cuando se agregan nuevas dependencias
- Incluye:
  - Descripción de cada dependencia
  - Enlaces a documentación oficial
  - Uso específico en el proyecto
  - Archivos relacionados

### 4. Script de Instalación

- Archivo: `install-deps.bat`
- Script ejecutable para Windows
- Instala todas las dependencias automáticamente
- Se actualiza cuando se agregan nuevas dependencias

## Estructura de Archivos

```
ORT_Movile/
├── dependencies.md              # Documentación de dependencias
├── install-deps.bat            # Script de instalación
├── REGLAS_REPOSITORIO.md       # Este archivo
├── resumenes/                  # Resúmenes diarios
│   ├── README.md
│   └── YYYY-MM-DD_resumen.md
└── Backend/                    # Código del proyecto
    └── ...
```

## Proceso de Actualización

### Cuando se agrega una nueva dependencia:

1. Se actualiza `dependencies.md` con la información de la nueva dependencia
2. Se actualiza `install-deps.bat` si es necesario
3. Se documenta el cambio en el resumen diario

### Al final de cada día:

1. Se crea/actualiza el resumen diario
2. Se documentan todas las interacciones del día
3. Se registran los cambios realizados

## Ejemplos de Comentarios en Español

```javascript
// Función para validar el token JWT
function validateJWT(token) {
  // Verificar que el token no esté vacío
  if (!token) {
    return false;
  }

  // Decodificar y verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // El token es inválido o ha expirado
    return false;
  }
}
```

## Cumplimiento

- Estas reglas son **obligatorias** para todo el desarrollo en este repositorio
- El asistente de IA debe seguir estas reglas automáticamente
- Cualquier excepción debe ser documentada en el resumen diario

---

**Última actualización**: 19 de Diciembre de 2024
