# Laboratorio 3 – Cliente React para Blueprints (React + Redux + Canvas)
Escuela Colombiana de Ingeniería – Arquitecturas de Software

## Descripción

Cliente web desarrollado en React + Vite que consume las APIs REST del backend de Blueprints implementado en los laboratorios anteriores. La aplicación incluye manejo de estado global con Redux Toolkit, visualización de planos en canvas HTML5, autenticación JWT y administración de usuarios.

## Funcionalidades Implementadas

### Core Features
La aplicación implementa consumo completo de APIs REST utilizando Axios con configuración dual que permite intercambiar entre servicios mock y reales. El manejo de estado global se realiza mediante Redux Toolkit para blueprints y usuarios, mientras que la visualización de planos se ejecuta en canvas HTML5 con renderizado de puntos y segmentos consecutivos. Incluye cálculo automático y visualización de suma total de puntos de cada plano, todo construido sobre una arquitectura por componentes con React funcional y hooks.

### Sistema de Autenticación
El sistema incorpora login tradicional con validación rigurosa de credenciales y autenticación JWT con tokens seguros de larga duración. Las rutas están protegidas mediante React Router con verificación de roles, utilizando hash SHA256 para contraseñas y gestión completa de sesiones con localStorage para persistencia entre navegaciones.

### Administración de Usuarios
Panel administrativo completo para gestión integral de usuarios que incluye creación de nuevos usuarios con validación exhaustiva de datos, visualización detallada de usuarios registrados con información de roles, y sistema robusto de permisos diferenciados entre Administradores y Usuarios estándar.

### Seguridad
Implementación de seguridad robusta con contraseñas hasheadas usando SHA256 sin almacenamiento en texto plano, identificadores genéricos en código fuente para prevenir exposición de datos sensibles, interceptores Axios para manejo automático de tokens JWT, y configuración segura mediante variables de entorno.

## Requisitos

Node.js 18 o superior, npm 8 o superior, y backend de Blueprints ejecutándose correctamente desde los laboratorios anteriores.

## Configuración e Instalación

### Clonar e instalar dependencias
```bash
git clone https://github.com/ARSW-PANDILLA-2025/Lab_P3_BluePrints_React_UI.git
cd Lab_P3_BluePrints_React_UI
npm install
```

## Ejecución del Proyecto

### Desarrollo Local
```bash
npm run dev
```
La aplicación estará disponible en: http://localhost:5173

### Producción con Docker
```bash
# Construir imagen
docker build -t blueprints-app .

# Ejecutar contenedor
docker run -d -p 5173:4173 --name blueprints-app blueprints-app
```

### Usuarios de Prueba

El sistema incluye usuarios preconfigurados para testing:

**Usuarios Estándar:**
cristian/cristian, angel/angel, santiago/santiago, angie/angie, felipe/felipe

**Administrador:**
root/root

## Arquitectura y Estructura del Proyecto

```
src/
├── components/
│   ├── BlueprintCanvas.jsx      # Visualización de planos en canvas
│   ├── BlueprintForm.jsx        # Formulario creación de planos
│   ├── BlueprintList.jsx        # Lista de planos por autor
│   ├── ProtectedRoute.jsx       # Rutas protegidas por autenticación
│   └── UserAdmin.jsx            # Panel administrativo de usuarios
├── contexts/
│   └── AuthContext.jsx          # Contexto de autenticación global
├── data/
│   └── mockUsers.js             # Datos de usuarios mock con hashes seguros
├── features/
│   └── blueprints/
│       └── blueprintsSlice.js   # Slice Redux para manejo de estado
├── pages/
│   ├── BlueprintDetailPage.jsx  # Página detalle de plano individual
│   ├── BlueprintsPage.jsx       # Página principal de blueprints
│   ├── LoginPage.jsx            # Página de autenticación
│   ├── NotFound.jsx             # Página 404
│   └── UsersPage.jsx            # Página administración usuarios
├── services/
│   ├── apiClient.js             # Cliente Axios con interceptores
│   ├── apimock.js               # Servicios mock para desarrollo
│   ├── blueprintsService.js     # Servicios específicos de blueprints
│   └── serviceClient.js         # Cliente base para servicios
├── store/
│   └── index.js                 # Configuración Redux Toolkit
└── utils/
    └── passwordUtils.js         # Utilidades hash SHA256
```

## Funcionalidades Implementadas Detalladamente

### Canvas de Visualización
La aplicación incluye un componente BlueprintCanvas que renderiza planos en canvas HTML5 con dimensiones 520x360, dibuja puntos como círculos conectados por líneas consecutivas, muestra el nombre del plano actual junto con la suma total de puntos, y se actualiza automáticamente cuando se selecciona un nuevo plano.

### Gestión de Estado con Redux Toolkit
Sistema de estado global implementado con slice de blueprints para manejo integral de planos y autores, estados diferenciados de carga, error y datos, acciones asíncronas optimizadas para consumo de APIs, y persistencia robusta del estado de autenticación entre sesiones.

### Servicios de API Dual
Arquitectura de servicios que permite intercambio transparente entre Mock Service con datos de prueba en memoria para desarrollo offline y Real API Service para consumo del backend REST con Axios. El cambio se configura mediante la variable de entorno VITE_USE_MOCK e incluye interceptores Axios para manejo automático de tokens JWT.

### Sistema de Autenticación
Implementación completa de seguridad que incluye login con validación de credenciales hasheadas SHA256, tokens JWT con expiración automática y renovación, rutas protegidas por roles diferenciados entre Usuario y Administrador, Context API para estado global de autenticación accesible desde cualquier componente, y logout automático por expiración de token.

- Agregar pruebas con Vitest + Testing Library para validar:
  - Render del canvas.
  - Envío de formularios.
  ### Administración de Usuarios
Panel administrativo completo con listado detallado de usuarios registrados incluyendo información completa de perfiles, creación de nuevos usuarios con validación exhaustiva de datos y formatos, verificación granular de roles y permisos por usuario individual, e interfaz administrativa exclusivamente accesible para usuarios con privilegios de administrador.

## Tecnologías Utilizadas

### Frontend Core
React 18 como biblioteca principal para construcción de interfaces de usuario, Vite como build tool y servidor de desarrollo de alta velocidad, Redux Toolkit para manejo predecible del estado global de la aplicación, y React Router para navegación fluida y gestión de rutas en SPA.

### Comunicación y APIs
Axios como cliente HTTP robusto con interceptores personalizados para manejo de APIs, JWT para autenticación segura basada en tokens con expiración automática, y servicios Mock integrados para datos de prueba durante desarrollo offline sin dependencias del backend.

### Desarrollo y Testing
Vitest como framework de testing optimizado para velocidad y compatibilidad, Testing Library para utilidades especializadas en testing de componentes React, ESLint para linting automático y mantenimiento de calidad de código, y Prettier para formateo consistente y automático del código fuente.

### Seguridad y Utils
SHA256 para hash criptográfico seguro de contraseñas sin almacenamiento en texto plano, Canvas API para renderizado eficiente de gráficos 2D y visualizaciones, y CSS Modules para estilos locales encapsulados por componente evitando conflictos globales.

## Implementación de Requerimientos del Laboratorio

### Canvas de Visualización
Componente BlueprintCanvas implementado con dimensiones estándar de 520x360 píxeles, renderizado optimizado de puntos como círculos conectados por líneas consecutivas, actualización automática y eficiente al seleccionar diferentes planos, y cálculo dinámico con visualización en tiempo real de la suma total de puntos.

### Consulta por Autor
Input dedicado para ingreso de nombre de autor con validación en tiempo real, tabla estructurada con columnas específicas para Nombre del plano, Número de puntos y Botón Open para acciones, e integración completa con Redux para manejo centralizado del estado de consultas y resultados.

### Visualización de Planos
Selección de plano específico mediante botón Open con feedback visual inmediato, actualización automática del campo de texto con nombre del plano actual seleccionado, obtención inteligente de puntos desde backend o mock según configuración establecida, y dibujo secuencial y consecutivo de segmentos en canvas con renderizado optimizado.

### Servicios Duales
Interfaz común y estandarizada para apimock y apiclient garantizando compatibilidad total, métodos completamente implementados incluyendo getAll, getByAuthor, getByAuthorAndName y create con validaciones, configuración flexible mediante variable de entorno VITE_USE_MOCK, e intercambio completamente transparente entre servicios sin requerir cambios de código en componentes.

### Estado Global con React
Integración completa y optimizada con Redux Toolkit para manejo centralizado del estado, estado del plano actual accesible desde cualquier componente de la aplicación sin prop drilling, arquitectura que evita completamente la manipulación directa del DOM manteniendo el paradigma React, y flujo unidireccional de datos garantizando predictibilidad y debuggeabilidad del estado.

## Scripts de Desarrollo

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción  
npm run preview      # Preview del build
npm run lint         # Verificación ESLint
npm run format       # Formateo con Prettier
npm test             # Ejecución de tests
```

## Despliegue

### Docker
```bash
# Desarrollo
docker build -t blueprints-app .
docker run -p 5173:4173 blueprints-app

# Con docker-compose (incluye backend)
docker-compose up -d
```

### Producción
```bash
npm run build
# Desplegar contenido de dist/ en servidor web
```

## Seguridad Implementada

Contraseñas hasheadas utilizando SHA256 eliminando completamente el almacenamiento en texto plano, tokens JWT con expiración automática y renovación inteligente para sesiones seguras, variables de entorno para configuración de datos sensibles sin exposición en código fuente, rutas protegidas mediante verificación de autenticación y validación de roles granular, interceptores Axios para manejo automático y transparente de tokens en todas las peticiones, e identificadores genéricos en código fuente para prevenir exposición accidental de información sensible.

## Testing

### Configuración de Tests
Framework Vitest con configuración optimizada para velocidad y compatibilidad, utilidades de Testing Library especializadas para testing integral de componentes React, configuración automática mediante archivos de setup para environment consistency, y reportes de cobertura detallados incluidos con métricas de calidad.

### Tests Implementados
Pruebas unitarias exhaustivas de componentes principales con casos edge incluidos, tests específicos de Redux slices y reducers verificando state mutations, pruebas de integración completas de servicios mock y reales, y tests dedicados de utilidades críticas incluyendo hash de contraseñas y validaciones de formularios.

### Ejecución de Tests
```bash
npm test              # Ejecutar todos los tests
npm run test:watch    # Modo watch para desarrollo
npm run test:coverage # Reporte de cobertura
```

## Entregables

### Repositorio
Código fuente completo con arquitectura sólida implementada siguiendo mejores prácticas, configuración Docker lista para despliegue en múltiples entornos, suite completa de tests unitarios y de integración con alta cobertura, y documentación técnica actualizada con ejemplos prácticos y guías de uso.

### Funcionalidades Demostradas
Canvas de visualización funcionando correctamente con renderizado en tiempo real, sistema robusto de autenticación implementado con JWT y validaciones, administración completa de usuarios con interfaz intuitiva y funcional, intercambio fluido entre servicios mock y reales sin interrupciones, Redux Toolkit operativo para manejo centralizado del estado global, y rutas protegidas por roles con verificación granular de permisos.

### Evidencias de Implementación
Visualización completamente funcional de planos en canvas con puntos precisos y líneas conectoras, login operativo con validación rigurosa de credenciales SHA256 y feedback de usuario, panel administrativo completamente accesible exclusivamente para administradores con todas las funcionalidades activas, configuración dual de servicios perfectamente operativa mediante variables de entorno, y estado global completamente sincronizado y accesible en toda la aplicación sin inconsistencias.

## Buenas Prácticas Aplicadas

### Arquitectura
Separación clara de responsabilidades implementada por capas lógicas bien definidas, componentes completamente reutilizables y modulares con alta cohesión y bajo acoplamiento, hooks personalizados desarrollados para encapsular lógica compartida entre componentes, y Context API utilizado estratégicamente para estado global de autenticación accesible desde toda la aplicación.

### Código
ESLint y Prettier configurados para mantener consistencia automática en el código fuente, convenciones de nombres claras y descriptivas siguiendo estándares de la industria, documentación inline integrada en componentes críticos para facilitar mantenimiento, y manejo robusto de errores con catch blocks y fallbacks apropiados en toda la aplicación.

### Seguridad
Eliminación completa de exposición de credenciales en código fuente mediante variables de entorno, tokens JWT implementados con expiración automática y renovación inteligente, validación granular de permisos ejecutada por ruta con verificación de roles, y hash seguro de contraseñas utilizando SHA256 sin almacenamiento en texto plano en ninguna parte del sistema.

Este laboratorio implementa completamente los requerimientos establecidos, proporcionando una aplicación React moderna, segura y bien estructurada para la gestión y visualización de blueprints.

---

### Notas rápidas y recomendaciones

- Para el canvas en tests con jsdom: agregar un mock de `HTMLCanvasElement.prototype.getContext` en `tests/setup.js`.
- Para usar `@testing-library/jest-dom` con Vitest: en `tests/setup.js` importar `import '@testing-library/jest-dom'` y asegurarse de que Vitest provea el global `expect` (configurar `vitest.config.js` con la opción `test: { globals: true, setupFiles: './tests/setup.js' }`).
- Para la conmutación de servicios en Vite, usar `import.meta.env.VITE_USE_MOCK` para leer la variable en tiempo de ejecución.

## Recomendaciones y actividades sugeridas para el exito del laboratorio

1. **Redux avanzado**
   - [ ] Agrega estados `loading/error` por _thunk_ y muéstralos en la UI.
   - [ ] Implementa _memo selectors_ para derivar el top-5 de blueprints por cantidad de puntos.
2. **Rutas protegidas**
   - [ ] Crea un componente `<PrivateRoute>` y protege la creación/edición.
3. **CRUD completo**
   - [ ] Implementa `PUT /api/blueprints/{author}/{name}` y `DELETE ...` en el slice y en la UI.
   - [ ] Optimistic updates (revertir si falla).
4. **Dibujo interactivo**
   - [ ] Reemplaza el `svg` por un lienzo donde el usuario haga _click_ para agregar puntos.
   - [ ] Botón “Guardar” que envíe el blueprint.
5. **Errores y _Retry_**
   - [ ] Si `GET` falla, muestra un banner y un botón **Reintentar** que dispare el thunk.
6. **Testing**
   - [ ] Pruebas de `blueprintsSlice` (reducers puros).
   - [ ] Pruebas de componentes con Testing Library (render, interacción).
7. **CI/Lint/Format**
   - [ ] Activa **GitHub Actions** (workflow incluido) → lint + test + build.
8. **Docker (opcional)**
   - [ ] Crea `Dockerfile` (+ `compose`) para front + backend.

## Criterios de evaluación

El proyecto se evalúa considerando múltiples aspectos del desarrollo. La funcionalidad y cobertura de casos representa el 30% de la evaluación, incluyendo el correcto funcionamiento de todas las características implementadas. La calidad de código y arquitectura constituye el 25%, evaluando la implementación de Redux, la estructura de componentes y los servicios. El manejo de estado, errores y experiencia de usuario representa el 15%, considerando la gestión efectiva del estado de la aplicación y la respuesta ante errores. Las pruebas automatizadas contribuyen con el 15%, verificando la cobertura y calidad de los tests. La seguridad representa el 10%, incluyendo la implementación de JWT, interceptores y rutas protegidas. Finalmente, la integración continua, linting y formateo contribuye con el 5% restante.

## Scripts de desarrollo

El proyecto incluye varios scripts esenciales para el desarrollo y mantenimiento. El comando `npm run dev` inicia el servidor de desarrollo Vite con recarga automática. Para generar la versión de producción se utiliza `npm run build`, mientras que `npm run preview` permite previsualizar el build generado. La calidad del código se mantiene con `npm run lint` ejecutando ESLint y `npm run format` aplicando las reglas de Prettier. Las pruebas se ejecutan mediante `npm test` utilizando Vitest como framework de testing.

---

### Extensiones propuestas del reto

El proyecto puede expandirse con diversas mejoras técnicas. Redux Toolkit Query proporcionaría capacidades avanzadas de caché para las peticiones HTTP, optimizando el rendimiento de la aplicación. La implementación de MSW (Mock Service Worker) permitiría crear mocks más sofisticados sin necesidad de un backend real. Adicionalmente, la incorporación de un modo oscuro junto con un diseño completamente responsive mejoraría significativamente la experiencia de usuario en diferentes dispositivos y preferencias de visualización.

> Este proyecto es un punto de partida para que tus estudiantes evolucionen el cliente clásico de Blueprints a una SPA moderna con prácticas de la industria.
