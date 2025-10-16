# Guía de Trabajo con Múltiples Repositorios

## Configuración Actual

Tu proyecto está configurado con dos repositorios remotos:

- **`origin`**: `https://github.com/Sparx27/ORT_Movile.git` (repositorio de Sparx27 - trabajo colaborativo)
- **`upstream`**: `https://github.com/Sr-Lechuga/ort-mobile-vercel.git` (tu repositorio para Vercel - deployment)

Esta configuración te permite:

- Trabajar colaborativamente con Sparx27 usando `origin` (convención estándar de Git)
- Deployar a Vercel desde tu repositorio `upstream` cuando lo necesites

---

## Flujo de Trabajo Diario

### 1. Trabajar con el Repositorio de Sparx27

#### Obtener los últimos cambios

```bash
# Traer cambios del repositorio de Sparx27
git fetch origin

# Ver las diferencias antes de integrar
git diff origin/master

# Integrar los cambios en tu rama local
git merge origin/master
```

#### Hacer commits normales

```bash
# Agregar cambios
git add .

# Hacer commit
git commit -m "Tu mensaje de commit"

# Enviar cambios al repositorio de Sparx27 (por defecto con git push)
git push origin master
# o simplemente
git push
```

### 2. Deployar a Vercel (Usar tu Repositorio)

Cuando quieras deployar a Vercel, simplemente envía los cambios a tu repositorio:

```bash
# Asegurarte de tener todos los cambios actualizados
git fetch origin
git merge origin/master

# Enviar a tu repositorio (esto dispara el deploy en Vercel)
git push upstream master
```

---

## Workflows Comunes

### Workflow 1: Desarrollo Normal con Sparx27

```bash
# 1. Actualizar tu copia local con cambios de Sparx27
git pull origin master
# o simplemente
git pull

# 2. Hacer tus cambios
# ... editar archivos ...

# 3. Commit y push a origin (Sparx27)
git add .
git commit -m "Descripción de cambios"
git push origin master
# o simplemente
git push

# 4. (Opcional) También actualizar tu repo de deploy para mantenerlo sincronizado
git push upstream master
```

### Workflow 2: Deploy Rápido a Vercel

```bash
# 1. Asegurarte de tener los últimos cambios de Sparx27
git pull origin master

# 2. Push a tu repositorio de Vercel (dispara deploy automático)
git push upstream master
```

### Workflow 3: Sincronizar Ambos Repositorios

```bash
# Mantener tu repositorio de deploy sincronizado con el de Sparx27
git pull origin master
git push upstream master
```

---

## Comandos Útiles

### Ver Configuración de Remotos

```bash
git remote -v
```

### Ver Estado de las Ramas

```bash
# Ver qué rama estás siguiendo
git branch -vv

# Ver todas las ramas locales y remotas
git branch -a
```

### Cambiar el Repositorio por Defecto para Push

```bash
# Si quieres que el push por defecto sea a Sparx27 (ya es el predeterminado)
git branch --set-upstream-to=origin/master master

# Si quieres que el push por defecto sea a tu repo de Vercel
git branch --set-upstream-to=upstream/master master
```

### Verificar Diferencias Entre Repositorios

```bash
# Ver qué commits tiene origin (Sparx27) que no tienes localmente
git log HEAD..origin/master

# Ver qué commits tienes localmente que origin no tiene
git log origin/master..HEAD

# Comparar tu repo de Vercel con el local
git log HEAD..upstream/master
```

---

## Escenarios Específicos

### Escenario 1: Sparx27 hizo cambios y quieres integrarlos

```bash
# 1. Traer cambios de Sparx27
git fetch origin

# 2. Ver qué cambió
git log HEAD..origin/master

# 3. Integrar cambios
git merge origin/master

# 4. Si hay conflictos, resolverlos manualmente

# 5. (Opcional) Actualizar tu repo de Vercel
git push upstream master
```

### Escenario 2: Quieres probar algo solo en Vercel sin afectar el repo de Sparx27

```bash
# 1. Crear una rama experimental
git checkout -b experimental-feature

# 2. Hacer tus cambios
# ... editar archivos ...

# 3. Commit
git add .
git commit -m "Feature experimental para testing"

# 4. Push solo a tu repositorio de Vercel
git push upstream experimental-feature

# 5. En Vercel, crear un deployment de la rama experimental
```

### Escenario 3: Ambos hicieron cambios al mismo tiempo

```bash
# 1. Commit tus cambios locales
git add .
git commit -m "Mis cambios"

# 2. Intentar traer cambios de origin (Sparx27)
git pull origin master

# 3. Si hay conflictos:
#    - Git marcará los archivos conflictivos
#    - Abre cada archivo y resuelve los conflictos manualmente
#    - Los conflictos se marcan así:
#      <<<<<<< HEAD
#      tus cambios
#      =======
#      cambios de origin
#      >>>>>>> origin/master

# 4. Después de resolver conflictos
git add .
git commit -m "Merge de cambios de Sparx27"

# 5. Push a ambos repositorios
git push origin master
git push upstream master
```

---

## Estrategias Recomendadas

### Opción A: Trabajo Colaborativo Intenso (CONFIGURACIÓN ACTUAL)

**Recomendada si trabajas mucho con Sparx27**

- Hacer push a `origin` (Sparx27) por defecto
- Sincronizar con `upstream` (Vercel) periódicamente (ej: al final del día)
- Deploy a Vercel solo cuando tengas una versión estable

```bash
# Configuración (ya es la predeterminada)
git branch --set-upstream-to=origin/master master

# Trabajo diario
git push  # va a origin (Sparx27) por defecto

# Deploy a Vercel
git push upstream master
```

### Opción B: Deploy Frecuente

**Recomendada si deployeas a Vercel constantemente**

- Mantener ambos repos sincronizados todo el tiempo
- Push a ambos simultáneamente

```bash
# Crear un alias para push a ambos
git config alias.push-all '!git push origin master && git push upstream master'

# Usar el alias
git push-all
```

### Opción C: Desarrollo Independiente

**Recomendada si quieres experimentar antes de compartir**

- Trabajar en tu repo de Vercel (`upstream`) hasta estar listo
- Sincronizar con `origin` (Sparx27) cuando tengas features completas

```bash
# Trabajo diario en tu repo de Vercel
git push upstream master

# Cuando estés listo para compartir con Sparx27
git push origin master
```

---

## Configuración de Vercel

### Conectar Vercel con tu Repositorio

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "Add New Project"
3. Selecciona tu repositorio: `Sr-Lechuga/ort-mobile-vercel`
4. Configura el proyecto:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (dejar vacío)
   - **Output Directory**: (dejar vacío)
5. Agrega las variables de entorno necesarias
6. Haz clic en "Deploy"

### Variables de Entorno en Vercel

Configura estas variables en: **Project Settings → Environment Variables**

```
MONGODB_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_secreto_jwt
PORT=3000
CACHE_TYPE=redis
UPSTASH_REDIS_REST_URL=tu_url_de_upstash
UPSTASH_REDIS_REST_TOKEN=tu_token_de_upstash
```

### Deploy Automático

Una vez configurado, cada `git push upstream master` disparará automáticamente un deploy en Vercel.

---

## Resolución de Problemas

### Problema: "Updates were rejected because the remote contains work..."

**Causa**: El repositorio remoto tiene commits que no tienes localmente.

**Solución**:

```bash
# Traer cambios remotos
git pull origin master  # o simplemente: git pull

# Resolver conflictos si los hay

# Volver a intentar push
git push
```

### Problema: Olvidé de qué repositorio estoy trackeando

**Solución**:

```bash
# Ver configuración actual
git branch -vv

# Ver todos los remotos
git remote -v
```

### Problema: Quiero deshacer el último push

**Solución**:

```bash
# ⚠️ CUIDADO: Solo si no has compartido el commit con otros

# Deshacer último commit localmente
git reset --hard HEAD~1

# Force push (usar con precaución)
git push origin master --force
# o
git push upstream master --force
```

### Problema: Los dos repositorios están muy desincronizados

**Solución**:

```bash
# 1. Asegurarte de que origin (Sparx27) es la "verdad"
git fetch origin

# 2. Resetear tu repo local a origin
git reset --hard origin/master

# 3. Forzar actualización en upstream (Vercel)
git push upstream master --force
```

---

## Buenas Prácticas

### ✅ DO (Hacer)

- ✅ Sincronizar frecuentemente con `origin` (Sparx27) para evitar conflictos grandes
- ✅ Hacer commits pequeños y descriptivos
- ✅ Probar localmente antes de hacer push
- ✅ Comunicarte con Sparx27 sobre cambios importantes
- ✅ Mantener ambos repositorios sincronizados regularmente

### ❌ DON'T (No hacer)

- ❌ Hacer `git push --force` sin estar seguro
- ❌ Trabajar semanas sin sincronizar con origin (Sparx27)
- ❌ Modificar el historial de commits compartidos
- ❌ Ignorar conflictos de merge sin resolverlos correctamente
- ❌ Push directo a Vercel sin probar localmente

---

## Resumen Rápido

```bash
# Trabajo normal con Sparx27
git pull origin master
# o simplemente: git pull
# hacer cambios
git push origin master
# o simplemente: git push

# Deploy a Vercel
git push upstream master

# Mantener sincronizados
git pull origin master && git push upstream master
```

---

## Recursos Adicionales

- [Documentación de Git - Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

**Última actualización**: 9 de Octubre de 2025
