# taskly

Aplicación web para gestionar tus tareas diarias. Crea, edita y elimina tareas de forma sencilla.

## Funcionalidades

- Crear tareas nuevas
- Marcar tareas como completadas
- Eliminar tareas
- Diseño responsive

## Tecnologías

- **Frontend:** Next.js 16 + React 19 + Tailwind CSS
- **Backend:** Next.js API Routes
- **Base de datos:** SQLite con Prisma ORM

## Cómo instalar

```bash
# Clonar el repositorio
git clone https://github.com/LuisOrlando-code/taskly.git

# Entrar a la carpeta del proyecto
cd taskly/gestor-tareas

# Instalar dependencias
npm install

# Crear la base de datos
npx prisma migrate dev

# Iniciar el servidor de desarrollo
npm run dev
```

Abrir http://localhost:3000 en el navegador.

## Estructura del proyecto

```
gestor-tareas/
├── app/
│   ├── api/tasks/route.ts   ← API para crear, leer, editar y borrar tareas
│   ├── lib/prisma.ts        ← Conexión con la base de datos
│   ├── page.tsx             ← Página principal
│   └── layout.tsx           ← Layout de la app
├── prisma/
│   ├── schema.prisma        ← Modelos de la base de datos
│   └── migrations/          ← Migraciones de la base de datos
└── package.json
```

## Autor

Luis Orlando - [GitHub](https://github.com/LuisOrlando-code)
