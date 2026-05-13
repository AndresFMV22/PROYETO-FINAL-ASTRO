# 🌧️ LiquidSky Ecommerce

**LiquidSky Ecommerce** es una plataforma web moderna de catalogo y gestion de productos, diseñada para ofrecer una experiencia de compra visualmente impactante y un panel de administracion completo y seguro. Construida con tecnologias de vanguardia como **Astro 5**, **Supabase** y **Tailwind CSS**, esta aplicacion combina un diseño oscuro con efectos glassmorphism y una animacion de lluvia atmosferica que la hacen verdaderamente unica.

Ya seas un visitante navegando por los productos o un administrador gestionando el inventario, LiquidSky te envuelve en una interfaz elegante, fluida y moderna que refleja la calidad de los productos que exhibe.

---

## ✨ Vision del Proyecto

LiquidSky nace de la idea de que un catalogo de productos no tiene por que ser aburrido. Queriamos crear una experiencia que cautivara al usuario desde el primer momento, combinando un diseño visual envolvente con la funcionalidad robusta que cualquier negocio necesita. El resultado es una plataforma que no solo muestra productos, sino que los presenta en un escenario digital que realza su valor.

Cada detalle, desde las particulas de lluvia cayendo en el fondo hasta las tarjetas de vidrio esmerilado que contienen los productos, ha sido cuidadosamente pensado para transmitir una sensacion de premium, modernidad y sofisticacion.

---

## 🚀 Tecnologias de Construccion

| Tecnologia | Version | Proposito |
|---|---|---|
| **Astro** | 5.x | Framework web con renderizado del lado del servidor (SSR) que garantiza velocidad y SEO optimo |
| **TypeScript** | 5.7 | Tipado estricto para un codigo robusto, escalable y libre de errores |
| **Tailwind CSS** | 3.4 | Framework de estilos utilitario que permite un diseño completamente responsivo y personalizado |
| **Supabase** | — | Plataforma Backend-as-a-Service que integra base de datos PostgreSQL, autenticacion y almacenamiento de archivos |
| **@supabase/ssr** | 0.5 | Manejo de sesiones con cookies para autenticacion segura del lado del servidor |
| **Lucide React** | 0.469 | Biblioteca de iconos open-source con diseno limpio y consistente |
| **Cloudflare Pages** | — | Plataforma de despliegue con adaptador oficial de Astro para rendimiento global |
| **picsum.photos** | — | Servicio de imagenes placeholder de alta calidad |

---

## 📁 Arquitectura del Proyecto

La estructura del proyecto sigue las mejores practicas de Astro, organizando el codigo de manera clara y mantenible:

```
nuevo-ecommerce/
│
├── .env                        # Variables de entorno sensibles (ignoradas por git)
├── .gitignore                  # Archivos y carpetas excluidas del control de versiones
├── astro.config.mjs            # Configuracion principal de Astro (SSR, adaptador, plugins)
├── package.json                # Dependencias y scripts del proyecto
├── tailwind.config.mjs         # Configuracion personalizada de Tailwind (colores, animaciones)
├── tsconfig.json               # Configuracion de TypeScript en modo estricto
├── wrangler.toml               # Configuracion para despliegue en Cloudflare Pages
│
├── supabase/                   # Archivos de configuracion de base de datos
│   ├── schema.sql              # Esquema completo: tabla products, politicas RLS y bucket Storage
│   └── seed.sql                # Datos de ejemplo con 20 productos en 4 categorias
│
└── src/                        # Codigo fuente de la aplicacion
    ├── middleware.ts            # Middleware de proteccion de rutas administrativas
    │
    ├── lib/
    │   └── supabase.ts         # Cliente de Supabase configurado para SSR con cookies
    │
    ├── styles/
    │   └── global.css          # Estilos globales: glassmorphism, botones, inputs, animaciones
    │
    ├── layouts/
    │   ├── Layout.astro        # Layout principal con header, footer y fondo animado
    │   └── AdminLayout.astro   # Layout del panel administrativo con navegacion lateral
    │
    ├── components/
    │   ├── ProductCard.astro   # Tarjeta de producto con efecto glass y hover animado
    │   ├── RainBackground.astro # Lienzo canvas con animacion de lluvia y salpicaduras
    │   └── ui/
    │       └── Skeleton.astro  # Componente de carga esqueletico con shimmer
    │
    └── pages/                  # Rutas y vistas de la aplicacion
        ├── index.astro         # 🏠 Pagina principal: catalogo con paginacion, filtros y busqueda
        ├── login.astro         # 🔐 Pagina de inicio de sesion para administradores
        │
        ├── product/
        │   └── [id].astro      # 📦 Pagina de detalle individual de producto
        │
        └── admin/              # 🛡️ Panel de administracion (protegido por middleware)
            ├── index.astro     # Dashboard con estadisticas y resumen
            ├── logout.astro    # Cierre de sesion
            └── products/
                ├── index.astro           # Gestion de productos: listado, editar y eliminar
                ├── new.astro             # Formulario para crear nuevos productos
                └── edit/[id].astro       # Formulario para editar productos existentes
```

---

## 🎯 Funcionalidades Completas

### 🌐 Para el Usuario (Experiencia Publica)

La vitrina digital de LiquidSky ofrece una experiencia de navegacion fluida y placentera:

- **Catalogo Interactivo**: Los productos se despliegan en un elegante grid responsivo con 8 items por pagina, cada uno presentado en tarjetas con efecto glass que se iluminan al pasar el cursor.
- **Navegacion por Categorias**: Filtra el catalogo por cuatro categorias principales — Electronica, Ropa, Hogar y Deportes — para encontrar exactamente lo que buscas.
- **Busqueda en Tiempo Real**: El campo de busqueda realiza consultas case-insensitive directamente a la base de datos, mostrando resultados al instante.
- **Detalle de Producto**: Cada producto tiene su propia pagina con informacion completa: imagen de alta calidad, precio, descripcion detallada, categoria y un boton de "Agregar al Carrito".
- **Experiencia Visual Inmersiva**: Un fondo animado de lluvia con particulas y salpicaduras crea una atmosfera unica, acompanado de una interfaz oscura con acentos en degradados purpura y rosa.

### 🔧 Para el Administrador (Panel de Gestion)

El panel de administracion pone el control total del inventario en tus manos:

- **Autenticacion Segura**: Inicio de sesion con email y contraseña gestionado por Supabase Auth, con sesiones persistentes mediante cookies seguras.
- **Dashboard Inteligente**: Panel de control con tarjetas estadisticas que muestran el total de productos registrados, listo para expandirse con metricas de ventas y usuarios.
- **Gestion Completa de Productos (CRUD)**:
  - 📝 **Crear**: Formulario completo con subida de imagenes a Supabase Storage.
  - 📖 **Listar**: Tabla ordenada con todos los productos, sus precios, categorias y miniaturas.
  - ✏️ **Editar**: Formulario precargado con los datos existentes para actualizar cualquier producto.
  - 🗑️ **Eliminar**: Eliminacion con confirmacion para evitar accidentes.
- **Subida de Imagenes**: Las imagenes se almacenan de forma segura en Supabase Storage y se sirven con URLs publicas optimizadas.
- **Proteccion de Rutas**: El middleware拦截a automaticamente cualquier intento de acceso no autorizado a las rutas `/admin/*`, redirigiendo al login.

---

## 🗄️ Estructura de la Base de Datos

La base de datos PostgreSQL en Supabase esta diseñada con un esquema limpio y politicas de seguridad robustas.

### Tabla: `products`

La tabla principal que almacena toda la informacion del catalogo:

| Columna | Tipo | Restricciones | Descripcion |
|---|---|---|---|
| `id` | `uuid` | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Identificador unico universal autogenerado |
| `title` | `text` | `NOT NULL` | Nombre comercial del producto |
| `description` | `text` | nullable | Descripcion detallada y atributos |
| `price` | `numeric(10, 2)` | `NOT NULL` | Precio en formato decimal con dos digitos |
| `image_url` | `text` | nullable | URL publica de la imagen del producto |
| `category` | `text` | `NOT NULL`, `DEFAULT 'General'` | Categoria de clasificacion |
| `created_at` | `timestamptz` | `NOT NULL`, `DEFAULT now()` | Marca de tiempo de creacion en UTC |

### Politicas de Seguridad (Row Level Security)

Supabase RLS garantiza que cada operacion este protegida:

| Operacion | Acceso Publico | Acceso Autenticado |
|---|---|---|
| `SELECT` (leer) | ✅ Todos los visitantes pueden ver los productos | ✅ Tambien pueden verlos |
| `INSERT` (crear) | ❌ Bloqueado | ✅ Solo administradores autenticados |
| `UPDATE` (actualizar) | ❌ Bloqueado | ✅ Solo administradores autenticados |
| `DELETE` (eliminar) | ❌ Bloqueado | ✅ Solo administradores autenticados |

### Storage: Bucket `products`

Bucket publico configurado para almacenar y servir las imagenes de los productos:
- `SELECT`: Acceso publico de lectura para mostrar imagenes en el catalogo
- `INSERT`, `UPDATE`, `DELETE`: Exclusivo para usuarios autenticados

### Datos de Ejemplo

El archivo `supabase/seed.sql` incluye **20 productos realistas** distribuidos equitativamente en 4 categorias:

- **Electronica**: MacBook Pro M4 Pro, Sony WH-1000XM6, Samsung Galaxy S25 Ultra, iPad Air M3, Apple Watch Ultra 3
- **Ropa**: Camiseta Algodon Premium, Chaqueta Cuero Vintage, Jeans Premium, Zapatillas Urbanas Blancas, Vestido Floral Mid
- **Hogar**: Sofa Modular Escandinavo, Lampara de Pie Arco, Set de Sabanas 400 hilos, Maceta Ceramica Artesanal, Mesa de Centro Roble
- **Deportes**: Bicicleta Electrica Urbana, Esterilla Yoga Premium, Pesa Rusa 16kg, Cinta de Correr Plegable, Set de Mancuernas Ajustables

---

## 🎨 Diseño y Experiencia Visual

LiquidSky no es solo funcional, es una experiencia estetica completa:

- **Tema Oscuro Premium**: Fondos en degradados oscuros (`#0a0a1a` → `#1a1a3e`) que reducen la fatiga visual y resaltan los productos.
- **Efecto Glassmorphism**: Tarjetas, inputs y paneles con fondos semitransparentes y blur que crean una sensacion de profundidad y modernidad.
- **Animacion de Lluvia**: Un canvas de JavaScript renderiza gotas de lluvia en tiempo real con fisica de salpicaduras, creando una atmosfera envolvente.
- **Paleta de Colores**: Degradados purpura (#6366f1) a rosa (#8b5cf6) como acentos principales, complementados con blancos suaves y negros profundos.
- **Animaciones Suaves**: Transiciones en hover, shimmer en skeletons, fade-in de elementos y flotacion sutil en componentes clave.
- **Scrollbar Personalizada**: Scrollbar estilizada que mantiene la coherencia visual del tema oscuro.

---

## 🔧 Guia de Instalacion y Configuracion

Sigue estos pasos para tener LiquidSky corriendo en tu maquina local en minutos.

### Requisitos del Sistema

- **Node.js** version 18 o superior
- **npm** (incluido con Node.js)
- Una cuenta gratuita en [Supabase](https://supabase.com)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/AndresFMV22/PROYETO-FINAL-ASTRO.git
cd PROYETO-FINAL-ASTRO
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Este comando instalara todas las dependencias necesarias incluyendo Astro, Supabase, Tailwind CSS y demas paquetes.

### Paso 3: Configurar las Variables de Entorno

Crea un archivo `.env` en la raiz del proyecto con la siguiente estructura:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

> ⚠️ **Importante**: El archivo `.env` contiene informacion sensible y ya esta incluido en `.gitignore` para evitar que se suba al repositorio. Nunca compartas tus claves de Supabase.

### Paso 4: Configurar Supabase

1. **Crear un proyecto** en [Supabase](https://supabase.com) (el plan gratuito es mas que suficiente).
2. **Ejecutar el esquema**: Ve a la seccion **SQL Editor**, pega y ejecuta el contenido de `supabase/schema.sql`. Esto creara la tabla `products` con sus politicas RLS.
3. **Poblar la base de datos** (opcional): Ejecuta `supabase/seed.sql` para insertar 20 productos de ejemplo.
4. **Configurar Storage**: Ve a **Storage**, crea un nuevo bucket llamado `products` y configuralo como publico.
5. **Habilitar autenticacion**: Ve a **Authentication > Providers** y asegurate de que el proveedor **Email** este habilitado. Luego crea un usuario manualmente en **Authentication > Users**.

### Paso 5: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Veras algo como:

```
  🚀  astro  v5.x.x  started in 200ms
  ┃  Local    http://localhost:4321
  ┃  Network  http://192.168.x.x:4321
```

### Paso 6: Explorar la Aplicacion

- **Catalogo Publico**: Abre `http://localhost:4321` para ver la vitrina de productos con la lluvia animada de fondo.
- **Detalle de Producto**: Haz clic en cualquier producto para ver su informacion completa.
- **Panel Admin**: Navega a `http://localhost:4321/login` e inicia sesion con el usuario que creaste en Supabase.

### Comandos Disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente |
| `npm run build` | Ejecuta type-check y compila el proyecto para produccion |
| `npm run preview` | Inicia un servidor local para previsualizar el build de produccion |

---

## 🌍 Despliegue a Produccion

LiquidSky esta preconfigurado para desplegarse en **Cloudflare Pages** gracias al adaptador oficial `@astrojs/cloudflare`. El archivo `wrangler.toml` en la raiz contiene la configuracion necesaria.

### Despliegue con Wrangler

```bash
npm run build
npx wrangler pages deploy ./dist
```

Asegurate de configurar las variables de entorno (`PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`) en el panel de Cloudflare Pages para el entorno de produccion.

---

## 🛡️ Seguridad

La aplicacion implementa multiples capas de seguridad:

- **Autenticacion SSR**: Las sesiones se manejan del lado del servidor con cookies httponly, evitando exposicion de tokens.
- **Row Level Security**: Supabase RLS garantiza que incluso con la anon key expuesta, solo usuarios autenticados puedan modificar datos.
- **Middleware de Proteccion**: Cada solicitud a rutas administrativas es interceptada y verificada antes de servir el contenido.
- **Variables de Entorno**: Las credenciales sensibles nunca se hardcodean en el codigo fuente.

---

## 👨‍💻 Creditos y Reconocimientos

**Desarrolladores del Proyecto:**

<div align="center">

### Santiago Jaramillo & Andres Martinez

**Semestre 5 — Plataformas de Programacion Empresarial**

**Proyecto Final — 2026**

</div>

Este proyecto fue desarrollado como trabajo final de la asignatura Plataformas de Programacion Empresarial, demostrando la integracion de tecnologias web modernas para la construccion de aplicaciones empresariales completas, desde el frontend visual hasta el backend con base de datos y autenticacion.

---

## 📄 Licencia

© 2026 LiquidSky Ecommerce. Todos los derechos reservados.

El codigo, diseno y conceptos presentados en este proyecto son propiedad intelectual de sus desarrolladores. Queda prohibida su reproduccion total o parcial sin autorizacion explicita.
