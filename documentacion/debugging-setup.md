# Configuración de Debugging para la Aplicación

## Variables de Entorno Necesarias

Crea un archivo `.env` en la carpeta `Backend/` con las siguientes variables:

```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de MongoDB
MONGODB_URI=mongodb://localhost:27017/ort_movile
# Para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ort_movile

# Configuración JWT
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
JWT_EXPIRES_IN=24h

# Configuración de debugging
DEBUG=app:*
DEBUG_PORT=9229
```

## Opciones de Debugging Disponibles

### 1. Debugging con VS Code (Recomendado)

1. **Abrir el panel de Debugging**: `Ctrl+Shift+D`
2. **Seleccionar una configuración**:

   - **Debug Backend - Node.js**: Para debugging directo con Node.js
   - **Debug Backend - Nodemon**: Para debugging con auto-reload
   - **Debug Backend - Attach**: Para conectar a un proceso ya ejecutándose

3. **Colocar breakpoints**: Haz clic en el margen izquierdo de cualquier línea
4. **Iniciar debugging**: Presiona `F5` o haz clic en el botón play

### 2. Debugging desde Terminal

#### Opción A: Debugging con Node.js

```bash
cd Backend
npm run debug
```

#### Opción B: Debugging con Nodemon (auto-reload)

```bash
cd Backend
npm run debug:dev
```

#### Opción C: Debugging con breakpoint inicial

```bash
cd Backend
npm run debug:break
```

### 3. Debugging con Chrome DevTools

1. Ejecuta uno de los comandos de debugging
2. Abre Chrome y ve a: `chrome://inspect`
3. Haz clic en "Open dedicated DevTools for Node"
4. Usa las herramientas de debugging de Chrome

## Cómo Usar el Debugging

### Colocar Breakpoints

- **Breakpoints normales**: Clic en el margen izquierdo
- **Breakpoints condicionales**: Clic derecho → "Add Conditional Breakpoint"
- **Logpoints**: Clic derecho → "Add Logpoint" (para logging sin parar)

### Navegación

- **F5**: Continuar
- **F10**: Step Over (siguiente línea)
- **F11**: Step Into (entrar en función)
- **Shift+F11**: Step Out (salir de función)
- **Ctrl+Shift+F5**: Reiniciar debugging

### Inspección de Variables

- **Variables Locales**: Panel izquierdo automático
- **Watch**: Agregar expresiones para monitorear
- **Call Stack**: Ver la pila de llamadas
- **Console**: Evaluar expresiones en tiempo real

## Debugging de APIs REST

### Usando Postman/Insomnia

1. Inicia el debugging
2. Coloca breakpoints en los controladores
3. Envía requests desde Postman
4. El debugger se detendrá en los breakpoints

### Usando las pruebas REST incluidas

1. Instala la extensión "REST Client" en VS Code
2. Abre los archivos `.REST` en la carpeta `PRUEBAS_REST/`
3. Inicia el debugging
4. Haz clic en "Send Request" en los archivos REST

## Troubleshooting

### Puerto 9229 ocupado

```bash
# En Windows
netstat -ano | findstr :9229
taskkill /PID <PID> /F

# En Linux/Mac
lsof -ti:9229 | xargs kill -9
```

### Nodemon no detecta cambios

Verifica que el archivo `nodemon.json` tenga la configuración correcta o agrega:

```json
{
  "watch": ["src", "index.js"],
  "ext": "js,json"
}
```

### Variables de entorno no cargan

Asegúrate de que el archivo `.env` esté en la carpeta `Backend/` y que `dotenv` esté configurado correctamente en `index.js`.
