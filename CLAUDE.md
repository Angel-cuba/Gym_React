# GymLab — Instrucciones para Claude

## Regla crítica: nunca usar worktrees

**NUNCA** spawnar agentes con `isolation: "worktree"` en este proyecto.  
Todos los cambios deben ir directamente a `/Users/developer/ToFix/Gym_React/`.

Cuando uses herramientas de archivo (Read, Write, Edit), usa siempre rutas absolutas que empiecen por:
```
/Users/developer/ToFix/Gym_React/
```

## Variables de entorno requeridas

Crea un archivo `.env` en la raíz con estas variables antes de iniciar el proyecto:

```
REACT_APP_SUPABASE_URL=https://ttebvjaindmwcdhnpbhc.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<tu-anon-key>
```

El cliente Supabase (`src/lib/supabase.ts`) las lee con `process.env.REACT_APP_*`.  
La anon key es pública por diseño — Supabase RLS restringe los datos por usuario.

## Stack

- React 18 + TypeScript 4.7 (Create React App — no Vite)
- Supabase Auth + PostgreSQL  
  - Project: `ttebvjaindmwcdhnpbhc` (eu-west-1)
  - Client singleton: `src/lib/supabase.ts`
- Framer Motion (animaciones)
- MUI v5 (componentes base)
- i18next (internacionalización, parcialmente implementado)

## Arquitectura de contextos

```
AuthProvider          → src/context/AuthContext.tsx
  FavoritesProvider   → src/context/FavoritesContext.tsx
    AppContent        → renders <LoginModal> + <Routes>
```

- `AuthContext` expone: `user`, `signIn`, `signUp`, `signOut`, `openLoginModal`
- `FavoritesContext` wrappea `useFavoriteExercises` — se carga una sola vez
- `openLoginModal()` — accesible desde cualquier componente, sin prop drilling

## Rutas

| Ruta | Componente | Protegida |
|------|-----------|-----------|
| `/` | `Home` | No |
| `/exercise/:id` | `ExerciseDetail` | No |
| `/my-routines` | `MyRoutines` | Sí (muestra login prompt si no hay sesión) |

## Base de datos Supabase

### `saved_routines`
```sql
id            uuid PK
user_id       uuid FK → auth.users
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
id            uuid PK
user_id       uuid FK → auth.users
exercise_id   text
exercise_name text
body_part     text
gif_url       text
created_at    timestamptz
```

Ambas tablas tienen RLS — cada usuario solo ve sus propios datos.

## Estilos

Todos los estilos están en `src/App.css` (un solo archivo).  
No se usa CSS Modules ni styled-components.

## Commits

No incluir `Co-Authored-By: Claude` ni ninguna referencia a herramientas de IA.
