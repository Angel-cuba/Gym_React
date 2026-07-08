# GymLab — Instrucciones para Claude

## Regla crítica: nunca usar worktrees

**NUNCA** spawnar agentes con `isolation: "worktree"` en este proyecto.  
Todos los cambios deben ir directamente a `/Users/developer/ToFix/Gym_React/`.

Cuando uses herramientas de archivo (Read, Write, Edit), usa siempre rutas absolutas que empiecen por:
```
/Users/developer/ToFix/Gym_React/
```

## Variables de entorno requeridas

### Frontend (archivo `.env` en la raíz):
```
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_...
REACT_APP_RAPID_API_KEY=...  (opcional, para videos de YouTube)
```

### Netlify Functions (configurar en dashboard de Netlify):
```
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://...@ep-xxx.aws.neon.tech/neondb?sslmode=require
```

## Stack

- React 18 + TypeScript 4.7 (Create React App — no Vite)
- Clerk Auth (`@clerk/clerk-react` + `@clerk/backend`)
- Neon Postgres (`@neondatabase/serverless`)
- Drizzle ORM (schema en `netlify/functions/db/schema.ts`)
- Netlify Functions (API serverless en `netlify/functions/`)
- Framer Motion (animaciones)
- MUI v5 (componentes base)
- i18next (internacionalización, parcialmente implementado)

## Arquitectura de contextos

```
ClerkProvider         → @clerk/clerk-react
  AuthProvider        → src/context/AuthContext.tsx (thin adapter sobre Clerk)
    FavoritesProvider → src/context/FavoritesContext.tsx
      AppContent      → <Navbar> + <AnimatedRoutes> + <Footer> + <LoginModal>
```

- `AuthContext` expone: `user` (AppUser), `signIn`, `signUp`, `signOut`, `openLoginModal`
- `FavoritesContext` wrappea `useFavoriteExercises` — se carga una sola vez
- `openLoginModal()` — accesible desde cualquier componente, sin prop drilling
- Los hooks de datos (`useSavedRoutines`, `useFavoriteExercises`) usan `src/lib/api.ts` para llamar a las Netlify Functions

## Rutas

| Ruta | Componente | Protegida |
|------|-----------|-----------|
| `/` | `Home` | No |
| `/exercise/:id` | `ExerciseDetail` | No |
| `/my-routines` | `MyRoutines` | Sí (muestra login prompt si no hay sesión) |

## Base de datos (Neon Postgres)

Schema definido en `netlify/functions/db/schema.ts` (Drizzle ORM).

### `saved_routines`
```sql
id            uuid PK (defaultRandom)
user_id       text (Clerk user ID)
program_id    text
program_name  text
level         text
color         text
selected_weeks smallint (1|2|3)
notes         text nullable
created_at    timestamptz
```

### `favorite_exercises`
```sql
id            uuid PK (defaultRandom)
user_id       text (Clerk user ID)
exercise_id   text
exercise_name text
body_part     text
gif_url       text
created_at    timestamptz
```

Seguridad: application-level auth en cada Netlify Function (JWT → user_id en todos los WHERE).

## API (Netlify Functions)

| Endpoint | Métodos | Archivo |
|----------|---------|---------|
| `/api/routines` | GET, POST, PUT, DELETE | `netlify/functions/routines.ts` |
| `/api/favorites` | GET, POST, DELETE | `netlify/functions/favorites.ts` |

## Estilos

Todos los estilos están en `src/App.css` (un solo archivo).  
No se usa CSS Modules ni styled-components.

## Commits

No incluir `Co-Authored-By: Claude` ni ninguna referencia a herramientas de IA.
