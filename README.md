# LiquidSky Ecommerce

Plataforma de catalogo de productos construida con **Astro 5**, **Supabase** y **Tailwind CSS**. Permite navegar productos por categorias, buscarlos por nombre, y administrarlos desde un panel protegido con autenticacion.

---

## Tecnologias Utilizadas

| Tecnologia | Proposito |
|---|---|
| **Astro 5** | Framework web con SSR |
| **TypeScript** | Lenguaje tipado |
| **Tailwind CSS 3.4** | Estilos y diseño UI |
| **Supabase** | Base de datos PostgreSQL, autenticacion y almacenamiento de imagenes |
| **@astrojs/cloudflare** | Adaptador para deploy en Cloudflare Pages |
| **Lucide React** | Iconos |
| **picsum.photos** | Imagenes placeholder |

---

## Estructura del Proyecto

```
nuevo-ecommerce/
  .env                  # Variables de entorno (SUPABASE)
  .gitignore
  astro.config.mjs
  package.json
  tailwind.config.mjs
  tsconfig.json
  wrangler.toml         # Configuracion Cloudflare
  supabase/
    schema.sql          # Esquema de la base de datos
    seed.sql            # Datos de ejemplo (20 productos)
  src/
    middleware.ts       # Proteccion de rutas admin
    lib/
      supabase.ts      # Cliente de Supabase SSR
    layouts/
      Layout.astro
      AdminLayout.astro
    components/
      ProductCard.astro
      RainBackground.astro
      ui/
        Skeleton.astro
    pages/
      index.astro               # Catalogo publico
      login.astro               # Inicio de sesion admin
      product/[id].astro        # Detalle de producto
      admin/
        index.astro             # Dashboard
        logout.astro            # Cerrar sesion
        products/
          index.astro           # Listado de productos (CRUD)
          new.astro             # Crear producto
          edit/[id].astro       # Editar producto
    styles/
      global.css                # Estilos globales (glassmorphism)
```

---

## Funcionalidades

### Usuario (Publico)
- **Catalogo de productos** con grid paginado (8 por pagina)
- **Filtro por categoria**: Electronica, Ropa, Hogar, Deportes
- **Busqueda por nombre** (case-insensitive)
- **Detalle de producto** con imagen, precio, descripcion y categoria
- **Fondo animado** de lluvia con particulas (glassmorphism dark)

### Administrador
- **Login** con email y contraseña via Supabase Auth
- **Dashboard** con estadisticas (total de productos)
- **CRUD completo** de productos (crear, editar, eliminar)
- **Subida de imagenes** a Supabase Storage
- **Proteccion de rutas** middleware redirige a `/login` si no hay sesion

---

## Base de Datos

### Tabla: `products`

| Columna | Tipo | Descripcion |
|---|---|---|
| `id` | `uuid` | Identificador unico (autogenerado) |
| `title` | `text` | Nombre del producto |
| `description` | `text` | Descripcion |
| `price` | `numeric(10,2)` | Precio |
| `image_url` | `text` | URL de la imagen |
| `category` | `text` | Categoria |
| `created_at` | `timestamptz` | Fecha de creacion |

### Seguridad (RLS)
- `SELECT`: cualquier persona puede ver productos
- `INSERT`, `UPDATE`, `DELETE`: solo usuarios autenticados

---

## Variables de Entorno

Crear un archivo `.env` en la raiz del proyecto con:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

---

## Como Correr el Proyecto Localmente

### Requisitos
- Node.js 18 o superior
- npm

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/AndresFMV22/PROYETO-FINAL-ASTRO.git
cd PROYETO-FINAL-ASTRO
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raiz del proyecto y agregar:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

> Nota: Necesitas tener un proyecto en Supabase. Puedes crear uno gratis en [supabase.com](https://supabase.com)

4. **Configurar Supabase**

   - Crear un proyecto en Supabase
   - Ir a la seccion **SQL Editor**
   - Ejecutar el contenido de `supabase/schema.sql` para crear la tabla y las politicas RLS
   - (Opcional) Ejecutar `supabase/seed.sql` para insertar 20 productos de ejemplo
   - Ir a **Storage**, crear un bucket llamado `products` y hacerlo publico
   - Ir a **Authentication > Providers** y habilitar email/password

5. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

6. **Abrir en el navegador**

```
http://localhost:4321
```

7. **Acceder al panel admin**

   - Ir a `http://localhost:4321/login`
   - Iniciar sesion con un usuario creado en Supabase Auth

### Comandos disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para produccion |
| `npm run preview` | Vista previa de build |

---

## Despliegue

El proyecto esta configurado para desplegarse en **Cloudflare Pages** usando el adaptador `@astrojs/cloudflare`. El archivo `wrangler.toml` contiene la configuracion necesaria.

---

## Creditos

**Desarrolladores:**
- Santiago Jaramillo
- Andres Martinez

**Semestre 5 - Plataformas de Programacion Empresarial**

**Proyecto Final**

---

© 2026 LiquidSky Ecommerce. Todos los derechos reservados.
