# 🌱 Sistema de Seeds para ORT Mobile

Este directorio contiene scripts para popular la base de datos con datos de ejemplo.

## 📁 Archivos Disponibles

- **all.seed.js** - Seed completo que ejecuta todos los demás
- **badges.seed.js** - Badges del sistema
- **organizers.seed.js** - Centros organizadores
- **volunteers.seed.js** - Voluntarios
- **activities.seed.js** - Actividades (parte de all.seed.js)
- **inscriptions.seed.js** - Inscripciones (parte de all.seed.js)

## 🚀 Uso

### Seed completo (recomendado)

Popular toda la base de datos en el orden correcto:

```bash
npm run seed
```

Este comando:

1. ✅ Crea organizadores
2. ✅ Crea voluntarios
3. ✅ Crea badges
4. ✅ Crea actividades
5. ✅ Crea instancias de actividad
6. ✅ Crea inscripciones

### Seeds individuales

```bash
# Solo badges
npm run seed:badges

# Solo organizadores
npm run seed:organizers

# Solo voluntarios
npm run seed:volunteers
```

## ⚙️ Configuración

Asegúrate de tener configurado tu archivo `.env`:

```env
MONGODB_URI=mongodb+srv://tu-connection-string
```

## 📝 Notas Importantes

### Orden de Ejecución

Algunos seeds dependen de otros:

- ✅ `badges` - Independiente
- ✅ `organizers` - Independiente
- ✅ `volunteers` - Independiente
- ⚠️ `activities` - Requiere organizadores
- ⚠️ `activityInstances` - Requiere actividades
- ⚠️ `inscriptions` - Requiere voluntarios y instancias de actividad

**Por eso es recomendado usar `npm run seed` que maneja el orden automáticamente.**

### Idempotencia

Los seeds están diseñados para ser **idempotentes**:

- ✅ Se pueden ejecutar múltiples veces sin duplicar datos
- ✅ Verifica si los datos ya existen antes de crearlos
- ✅ No causará errores si se ejecuta repetidamente

### Passwords

⚠️ **IMPORTANTE**: Los passwords en los seeds son **placeholders**.
Los passwords reales deben hashearse con bcrypt antes de insertarse.

Ejemplo de cómo hashear un password:

```javascript
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash("password123", 6);
```

## 📊 Datos de Ejemplo Creados

### Organizadores (2)

- Centro Cultural Barrio Sur
- Centro Raices Verdes

### Voluntarios (3)

- Maria Rodriguez
- Carlos Pereira
- Sofia Cabrera

### Badges (8)

- 4 badges de participación (5, 10, 20, 50)
- 3 badges de horas (10, 50, 100)
- 1 badge de comentarios (inactivo)

### Actividades (3)

- Taller de Arte Urbano Comunitario
- Cine Debate: Identidad Afrodescendiente
- Mercado Solidario Barrio Sur

### Instancias de Actividad (5)

- Cada actividad tiene entre 1-2 instancias con fechas futuras
- Diferentes duraciones y cupos disponibles

### Inscripciones (4)

- Varias inscripciones de ejemplo con diferente estado (accepted, assisted)

## 🔧 Desarrollo

Para crear un nuevo seed:

1. Crea el archivo en `src/utils/seeds/`
2. Sigue el patrón de los seeds existentes
3. Agrega el script al `package.json`
4. Documenta en este README

Ejemplo de estructura:

```javascript
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("../../config/mongodb");
const Model = require("../../5_repositories/adapters/mongoose/models/model.model");

const data = [
  /* datos */
];

const seedData = async () => {
  // lógica de seeding
};

const run = async () => {
  try {
    await connectDB();
    await seedData();
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    // manejo de errores
  }
};

if (require.main === module) {
  run();
}

module.exports = { seedData };
```

## 🐛 Troubleshooting

### Error de conexión a MongoDB

Verifica tu `.env`:

```bash
# .env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/dbname
```

### Duplicación de datos

Los seeds son idempotentes, pero si necesitas limpiar:

```bash
# Eliminar datos manualmente desde MongoDB Compass o CLI
```

### Errores de dependencias

Si un seed falla por falta de datos previos:

```bash
# Ejecuta el seed completo
npm run seed
```
