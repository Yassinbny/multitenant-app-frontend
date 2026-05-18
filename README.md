## Multitenant-app Frontend

Aplicacion frontend desarrollada con React y TypeScript para gestionar partes de accidente en un entorno multi-tenant. Incluye autenticacion por roles, gestion de tenants y usuarios, creacion de partes mediante formulario en dos pasos y un editor visual interactivo con Konva para representar escenas de accidente y exportarlas como JSON.

## Stack Tecnologico

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Tailwind CSS
- Konva
- React Konva

## Requisitos

- Node.js 22.12+
- pnpm
- Backend de la prueba ejecutandose en `http://localhost:4000`

## Variables De Entorno

Crear un archivo `.env` en la raiz del frontend:

```env
VITE_API_URL=http://localhost:4000
```

## Instalacion

```bash
pnpm install
```

## Ejecucion

Modo desarrollo:

```bash
pnpm dev
```

Compilar para produccion:

```bash
pnpm build
```

Previsualizar build:

```bash
pnpm preview
```

## Estructura Del Proyecto

La aplicacion esta organizada por funcionalidades.

```txt
src/
  api/
    baseApi.ts
    auth.api.ts
    tenants.api.ts
    users.api.ts
    submissions.api.ts

  app/
    App.tsx
    router.tsx
    queryClient.ts

  components/
    layout/
    ui/

  features/
    auth/
      auth.store.ts
      auth.types.ts
      login/

    tenants/
      tenant.types.ts
      listTenants/
      createTenant/
      createTenantAdmin/

    users/
      user.types.ts
      listUsers/
      createUser/

    submissions/
      submission.types.ts
      listSubmissions/
      createSubmission/
      submissionDetail/

    scene/
      scene.types.ts
      sceneEditor/

  hooks/
  routes/
  styles/
  utils/
```

## Autenticacion Y Roles

La autenticacion se realiza mediante JWT.

Tras iniciar sesion, el token y el usuario autenticado se guardan en Zustand y `localStorage`.

Roles soportados:

- `SUPER_ADMIN`
- `ADMIN`
- `USER`

Permisos principales:

- `SUPER_ADMIN`: gestiona tenants y crea administradores para cada tenant.
- `ADMIN`: gestiona usuarios de su tenant y puede crear/consultar partes.
- `USER`: puede crear/consultar partes de accidente de su tenant.

Las rutas privadas se protegen con componentes de routing:

- `ProtectedRoute`: exige que el usuario este autenticado.
- `RoleRoute`: exige que el usuario tenga un rol permitido.

## Rutas Principales

```txt
/login
/dashboard
/tenants
/users
/submissions
/submissions/new
/submissions/:id
/submissions/:id/scene
```

### `/login`

Pantalla de inicio de sesion.

Utiliza:

- React Hook Form para manejar el formulario.
- Zod para validar los campos.
- TanStack Query `useMutation` para ejecutar el login.
- Zustand para guardar la sesion.

### `/tenants`

Disponible para `SUPER_ADMIN`.

Permite:

- Listar tenants.
- Crear tenants.
- Crear administradores dentro de un tenant.

### `/users`

Disponible para `ADMIN`.

Permite:

- Listar usuarios del tenant autenticado.
- Crear usuarios normales dentro del tenant.

### `/submissions`

Disponible para `ADMIN` y `USER`.

Permite:

- Listar partes de accidente del tenant autenticado.
- Acceder al detalle de un parte.
- Acceder al editor visual de escena.

### `/submissions/new`

Formulario en dos pasos para crear un parte de accidente.

Paso 1:

- Nombre.
- Apellidos.
- Lugar.

Paso 2:

- Hora del accidente.
- Matricula.
- Descripcion de danos.

Los datos se envian al backend mediante API REST y quedan asociados al usuario y tenant autenticados.

### `/submissions/:id`

Detalle de un parte de accidente.

Muestra:

- Datos personales.
- Datos del accidente.
- Fecha de creacion.
- Enlace al editor visual de escena.

### `/submissions/:id/scene`

Editor visual interactivo del accidente.

Permite:

- Anadir elementos visuales.
- Mover elementos mediante drag and drop.
- Redimensionar elementos.
- Rotar elementos.
- Visualizar el modelo JSON de la escena.
- Editar el JSON manualmente y aplicarlo a la escena.
- Copiar el JSON al portapapeles.
- Guardar la escena asociada al parte.

## Gestion De Datos Remotos

La aplicacion usa TanStack Query para gestionar datos del servidor:

- Queries para listar tenants, usuarios, partes y escenas.
- Mutations para crear tenants, admins, usuarios, partes y actualizar escenas.
- Invalidacion de queries tras operaciones de escritura.

Ejemplo:

```txt
crear usuario -> invalidateQueries(["users"]) -> refresca listado
crear parte -> invalidateQueries(["submissions"]) -> refresca listado
guardar escena -> invalidateQueries(["submission-scene", id])
```

## Estado Global

El estado global local se gestiona con Zustand.

Se usa para:

- Token JWT.
- Usuario autenticado.
- Estado de autenticacion.
- Logout.

Los datos de servidor no se guardan en Zustand, sino en TanStack Query.

## Modelo De Escena

La escena visual se representa como JSON.

Modelo base:

```ts
export type SceneElementType =
  | "vehicle"
  | "obstacle"
  | "road"
  | "reference"
  | "impactPoint";

export type SceneElement = {
  id: string;
  type: SceneElementType;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  label: string;
  color: string;
  notes?: string;
};
```

La escena completa se guarda con esta forma:

```json
{
  "elements": [
    {
      "id": "vehicle-1",
      "type": "vehicle",
      "x": 120,
      "y": 120,
      "rotation": 0,
      "width": 90,
      "height": 45,
      "label": "Vehiculo A",
      "color": "#22d3ee",
      "notes": "Vehiculo situado en el carril derecho"
    }
  ]
}
```

## Elementos Visuales

El editor permite representar una escena usando elementos basicos:

- `vehicle`: vehiculo.
- `obstacle`: obstaculo.
- `road`: carretera o zona de circulacion.
- `reference`: referencia del entorno.
- `impactPoint`: punto de impacto.

Cada elemento se puede mover y transformar visualmente. Los cambios se sincronizan con el modelo JSON.

## Uso De Konva

La pantalla de escena usa `react-konva`.

Componentes principales:

- `Stage`: superficie principal del editor.
- `Layer`: capa de dibujo.
- `Group`: agrupa figura y texto.
- `Rect`: vehiculos, carreteras, obstaculos y referencias.
- `Circle`: puntos de impacto.
- `Transformer`: permite redimensionar y rotar elementos.
- `Line`: genera la cuadricula visual del canvas.
- `Text`: etiqueta interna de cada elemento.

El objetivo es que cada interaccion grafica tenga una representacion equivalente en datos estructurados.

## Integracion Entre Parte Y Escena

Cada parte de accidente puede tener una escena visual asociada.

La ruta:

```txt
/submissions/:id/scene
```

carga la escena guardada desde el backend y permite modificarla.

Al guardar, se actualiza el campo `scene` del parte correspondiente.

Esto mantiene conectado:

```txt
datos del parte -> formulario multi-tenant
representacion visual -> editor Konva
persistencia -> JSON asociado al parte
```

## Aislamiento Multi-Tenant En Frontend

El frontend no decide el `tenantId`.

El flujo es:

1. El usuario inicia sesion.
2. El backend devuelve JWT y datos basicos del usuario.
3. El frontend envia el token en las peticiones protegidas.
4. El backend extrae el `tenantId` desde el token.
5. El backend filtra usuarios, partes y escenas por tenant.

Por tanto, aunque el frontend muestra u oculta rutas segun rol, el aislamiento real se garantiza en el backend.

## Cliente API

Todas las llamadas HTTP usan `baseApi`.

Responsabilidades:

- Construir la URL usando `VITE_API_URL`.
- Serializar body como JSON.
- Adjuntar header `Authorization: Bearer <token>` cuando corresponde.
- Lanzar error si la respuesta HTTP no es correcta.

## Validaciones

Los formularios utilizan Zod y React Hook Form.

Validaciones principales:

- Email valido.
- Password requerida y con longitud minima.
- Campos obligatorios en creacion de partes.
- JSON de escena con estructura `{ elements: [...] }`.

## Flujo De Prueba Recomendado

1. Ejecutar backend.
2. Ejecutar frontend.
3. Iniciar sesion como `SUPER_ADMIN`.
4. Crear un tenant.
5. Crear un admin para ese tenant.
6. Iniciar sesion como `ADMIN`.
7. Crear un usuario normal.
8. Crear un parte de accidente.
9. Abrir el detalle del parte.
10. Abrir el editor de escena.
11. Anadir vehiculos, obstaculos, referencias o puntos de impacto.
12. Mover, redimensionar o rotar elementos.
13. Guardar la escena.
14. Recargar la pagina y comprobar que la escena se mantiene.
15. Copiar o editar el JSON de la escena.

## Scripts

```bash
pnpm dev
```

Ejecuta la aplicacion en desarrollo.

```bash
pnpm build
```

Compila la aplicacion.

```bash
pnpm preview
```

Sirve localmente la version compilada.

## Notas De Implementacion

- Se usa Zustand solo para estado global local de autenticacion.
- Se usa TanStack Query para estado remoto y cache de datos de API.
- La UI esta dividida por funcionalidades para mantener el codigo escalable.
- El editor Konva mantiene una relacion directa entre interaccion visual y JSON.
- La escena se puede modificar visualmente o editando directamente su JSON.
