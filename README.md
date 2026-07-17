# MusicLand

E-commerce full stack de instrumentos musicales y equipo de audio. Monorepo con dos proyectos independientes:

- **`backend/`** — API REST con Node.js, Express, Mongoose (MongoDB) y autenticación JWT.
- **`frontend/`** — SPA con React + Vite.

## Estructura del proyecto

```
MusicLand/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/          # User, Product, Order
│   │   ├── middleware/auth.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── seed/            # datos de ejemplo + script de siembra
│   │   └── utils/
│   ├── server.js
│   ├── render.yaml          # blueprint de despliegue en Render
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/              # cliente axios + funciones por recurso
    │   ├── context/          # AuthContext, CartContext
    │   ├── components/       # Header, Footer, Carousel, ProductCard, icons, etc.
    │   └── pages/
    ├── vercel.json           # config de despliegue en Vercel
    └── .env.example
```

## Funcionalidades

- Catálogo de 49 productos distribuidos en 8 categorías (Guitarras, Bajos, Baterías y Percusión,
  Teclados y Pianos, Instrumentos de Viento, Micrófonos y Audio, Equipos DJ y Producción, Accesorios)
  y más de 20 marcas.
- Registro/login con JWT y contraseñas cifradas con bcrypt. Roles `user` y `admin`.
- Carrito de compras persistido por usuario en MongoDB (con cantidad ajustable y eliminación con confirmación).
- Checkout simulado (dirección de envío + método de pago no funcional) que genera un pedido con número
  de orden, fecha y resumen.
- Perfil de usuario editable (nombre, foto, contraseña).
- Panel de administración (`/admin/productos`, solo rol `admin`) con CRUD completo de productos.
- Íconos y logo en SVG inline (sin dependencias externas de íconos).

## Requisitos previos

- Node.js 18 o superior y npm.
- Una base de datos en [MongoDB Atlas](https://www.mongodb.com/atlas) (o cualquier MongoDB accesible por URI).

## 1. Configurar el backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `backend/.env`:

```
PORT=5000
MONGODB_URI=<tu cadena de conexión de MongoDB Atlas>
JWT_SECRET=<una cadena aleatoria larga y secreta>
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Siembra la base de datos con el catálogo de productos y dos usuarios de prueba:

```bash
npm run seed
```

Esto crea:
- **Admin:** `admin@musicland.com` / `Admin123!`
- **Usuario:** `usuario@musicland.com` / `Usuario123!`

Levanta la API:

```bash
npm run dev
```

La API queda disponible en `http://localhost:5000/api` (revisa `http://localhost:5000/api/health`).

## 2. Configurar el frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edita `frontend/.env` si tu API corre en otra URL:

```
VITE_API_URL=http://localhost:5000/api
```

Levanta el sitio:

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

## Modelo de datos (resumen)

- **User**: nombre, correo, contraseña (hash bcrypt), foto de perfil, rol (`user`/`admin`), direcciones,
  métodos de pago y carrito — todo embebido por usuario.
- **Product**: nombre, precio, stock, descripción, categoría, marca, imagen.
- **Order**: número de pedido, usuario, productos comprados (snapshot de precio/nombre), total,
  dirección de envío, método de pago y fecha/hora.

## Endpoints principales

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | `/api/auth/register`, `/api/auth/login` | Público |
| GET | `/api/products`, `/api/products/featured`, `/api/products/:id` | Público |
| POST/PUT/DELETE | `/api/products` / `/api/products/:id` | Solo admin |
| GET/PUT | `/api/users/me` | Usuario autenticado |
| GET/POST/PUT/DELETE | `/api/cart` | Usuario autenticado |
| POST/GET | `/api/orders` | Usuario autenticado |

## Despliegue

### Backend en Render

1. Sube este repositorio a GitHub.
2. En Render, crea un **Web Service** apuntando a la carpeta `backend` (o usa el `backend/render.yaml`
   incluido con "New +" → "Blueprint").
3. Configura las variables de entorno en el dashboard de Render: `MONGODB_URI`, `JWT_SECRET`,
   `JWT_EXPIRES_IN`, `CLIENT_URL` (debe ser la URL pública de tu frontend en Vercel).
4. Build command: `npm install` · Start command: `npm start`.

### Frontend en Vercel

1. Importa el repositorio en Vercel y selecciona la carpeta `frontend` como raíz del proyecto.
2. Framework preset: **Vite**.
3. Configura la variable de entorno `VITE_API_URL` apuntando a la URL pública de tu backend en Render
   (por ejemplo `https://musicland-backend.onrender.com/api`).
4. El archivo `frontend/vercel.json` ya incluye el rewrite necesario para que las rutas de React Router
   funcionen correctamente en producción.

### MongoDB Atlas

1. Crea un cluster (el tier gratuito M0 es suficiente).
2. Crea un usuario de base de datos y agrega `0.0.0.0/0` (o las IPs de Render) a la lista de acceso de red.
3. Copia el connection string y úsalo como `MONGODB_URI` tanto en local como en Render.
4. Corre `npm run seed` (localmente, apuntando a tu URI de Atlas) para poblar el catálogo antes de la
   demo en producción.

## Próximos pasos sugeridos

1. Reemplaza el correo/teléfono/redes sociales de ejemplo en el `Footer` y en la página de Contacto por
   los datos reales de tu tienda.
2. Ajusta el catálogo de productos (`backend/src/seed/seedData.js`) o gestiónalo desde el panel de admin
   una vez desplegado.
3. Configura un dominio propio en Vercel y actualiza `CLIENT_URL` en Render en consecuencia.
4. Considera agregar verificación de correo y recuperación de contraseña si el proyecto crece.
