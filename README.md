# MusicLand

E-commerce full stack de instrumentos musicales y equipo de audio. Monorepo con dos proyectos independientes:

- **`backend/`** — API REST con Node.js, Express, Mongoose (MongoDB) y autenticación JWT.
- **`frontend/`** — SPA con React + Vite.

## Estructura del proyecto

```
MusicLand/
├── backend/
│   ├── src/
│   │   ├── app.js            # la app de Express (middlewares, rutas) sin abrir puerto — la usan
│   │   │                       server.js (con app.listen real) y las pruebas (con supertest)
│   │   ├── config/db.js
│   │   ├── models/          # User, Product, Order, ContactMessage
│   │   ├── middleware/       # auth (protect/adminOnly), rate limiters
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── seed/            # catálogo de ejemplo (400 productos) + script de siembra
│   │   └── utils/           # generateToken, mailer (nodemailer), handleError
│   ├── tests/                # Jest + Supertest + mongodb-memory-server (ver sección Pruebas)
│   ├── server.js             # entrypoint real: conecta Mongo y pone app.js a escuchar
│   ├── render.yaml          # blueprint de despliegue en Render
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/              # cliente axios + funciones por recurso
    │   ├── context/          # AuthContext, CartContext, ThemeContext
    │   ├── components/       # Header, Footer, Carousel, ProductCard, modales, icons, mapa, etc.
    │   ├── pages/             # una página por ruta, cargadas con React.lazy
    │   └── utils/, config/    # formato de precios/fechas, reglas de estatus, datos del sitio
    ├── tests/                 # Vitest + React Testing Library (ver sección Pruebas)
    ├── vercel.json           # config de despliegue en Vercel
    └── .env.example
```

## Funcionalidades

- Catálogo de 400 productos en 14 categorías (Guitarras Acústicas/Eléctricas, Bajos Eléctricos,
  Baterías y Baterías Electrónicas, Platillos, Pianos y Pianos Digitales, Teclados, Sintetizadores,
  Instrumentos de Viento, Micrófonos, Audio, Amplificadores) de 20 marcas reales del rubro.
- Búsqueda de texto, filtros por categoría/marca/precio y orden (precio, nombre o aleatorio con
  paginación estable) en el listado del Home.
- **Sistema de ofertas**: cada producto puede tener un porcentaje de descuento (0-90%); el carrusel
  de la portada muestra automáticamente los productos con oferta activa, con precio tachado + precio
  con descuento en toda la tienda (tarjeta, detalle, carrito y checkout). El precio que se cobra al
  confirmar la compra se recalcula en el servidor en ese instante, nunca se confía en un precio
  cacheado del cliente.
- Registro/login con JWT (30 días por defecto) y contraseñas cifradas con bcrypt. Roles `user` y
  `admin`. Si un visitante sin sesión intenta agregar algo al carrito o "Comprar ahora", al iniciar
  sesión (o registrarse) se completa esa acción automáticamente y se vuelve a la página donde estaba.
- Carrito de compras persistido por usuario en MongoDB (cantidad ajustable, eliminación con
  confirmación) y flujo alterno de "Comprar ahora" (compra un solo producto sin tocar el carrito).
- Checkout simulado (dirección de envío + método de pago no funcional, no hay cobro real) con
  direcciones y métodos de pago guardados y reutilizables entre compras.
- **Cancelaciones y devoluciones**: el cliente puede cancelar un pedido mientras no haya salido del
  almacén (un admin además puede cancelar uno ya enviado) y solicitar la devolución de un pedido
  entregado dentro de los 15 días siguientes, por producto o completo, con seguimiento de estatus.
- Correos transaccionales por SMTP de Gmail (nodemailer): confirmación de compra al cliente y aviso a
  la tienda, avisos de cancelación/devolución, respuestas del panel de admin al formulario de contacto
  o directo a un cliente. Si `SMTP_USER`/`SMTP_PASS` no están configurados, la app sigue funcionando
  con normalidad y solo se omite el envío (nunca bloquea la operación principal).
- Perfil de usuario editable (nombre, teléfono, contraseña, direcciones y métodos de pago).
- Panel de administración (`/admin/*`, solo rol `admin`): CRUD de productos (incluye el % de
  descuento), gestión de pedidos por estatus, devoluciones, usuarios (cambiar rol, contactar,
  eliminar con cascada de sus pedidos activos) y bandeja del formulario de contacto.
- Modo claro/oscuro con selector en el header, recordado en `localStorage` (claro por defecto, no
  sigue el `prefers-color-scheme` del sistema operativo).
- Mapa interactivo de Google Maps (sin API key) en la página de Contacto, con enlace a direcciones.
- Íconos y logo en SVG inline (sin dependencias externas de íconos); páginas cargadas con
  `React.lazy` + `Suspense` para no meter el panel de admin en el bundle de un cliente cualquiera.
- Seguridad: `helmet`, CORS restringido a `CLIENT_URL`, rate limiting en login/registro/contacto,
  mensajes de error genéricos que nunca filtran detalle interno (stack traces, nombres de colección,
  etc.) al cliente.

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
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
SMTP_USER=<correo de Gmail de la tienda>
SMTP_PASS=<contraseña de aplicación de 16 caracteres, no la contraseña normal>
NOTIFY_EMAIL=<correo donde quieres recibir los avisos internos>
```

`SMTP_USER`/`SMTP_PASS`/`NOTIFY_EMAIL` son opcionales para desarrollar: sin ellos, la app funciona
igual y solo se omite el envío de correos (se avisa por consola).

Siembra la base de datos con el catálogo de productos y dos usuarios de prueba:

```bash
npm run seed
```

Esto crea:
- **Admin:** `admin@musicland.com` / `Admin123!`
- **Usuario:** `usuario@musicland.com` / `Usuario123!`

> `npm run seed` reemplaza TODO el catálogo de productos por el de `seedData.js` (no toca usuarios ni
> pedidos existentes salvo crear estos dos si no existen ya). No lo corras contra una base de datos en
> producción con productos propios ya cargados a mano desde el panel de admin.

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

- **User**: nombre, correo, contraseña (hash bcrypt), teléfono, foto de perfil, rol (`user`/`admin`),
  direcciones, métodos de pago (solo datos simulados: últimos 4 dígitos, sin número completo ni CVV)
  y carrito — todo embebido por usuario.
- **Product**: nombre, precio de lista, `discountPercent` (0-90, 0 = sin oferta), stock, descripción,
  categoría, marca, imagen.
- **Order**: número de pedido, usuario, productos comprados (snapshot de nombre/imagen/precio ya con
  descuento aplicado), total, dirección de envío, método de pago, estatus (pendiente → procesando →
  enviado → entregado, o cancelado), datos de cancelación y arreglo de solicitudes de devolución.
- **ContactMessage**: nombre, correo, mensaje, estatus de respuesta.

## Pruebas

Ambos proyectos tienen su propia suite de pruebas automatizadas — ninguna toca la base de datos
real ni requiere que el backend/frontend estén corriendo aparte.

```bash
cd backend && npm test    # Jest + Supertest, contra un MongoDB real EN MEMORIA
                           # (mongodb-memory-server) — nunca contra tu Atlas de desarrollo.
cd frontend && npm test   # Vitest + React Testing Library.
```

Cubre lo más sensible del proyecto: que el precio y el stock de un pedido SIEMPRE se calculen en
el servidor (un precio manipulado en la petición se ignora por completo), las reglas de
cancelación/devolución por estatus, `handleError` (que un error interno nunca filtre detalle al
cliente), y los formatos de precio/teléfono/tarjeta. No es cobertura exhaustiva — es la base
mínima para detectar una regresión real antes de que llegue a producción.

## Endpoints principales

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | `/api/auth/register`, `/api/auth/login` | Público |
| GET | `/api/products`, `/api/products/deals`, `/api/products/filters`, `/api/products/:id` | Público |
| POST/PUT/DELETE | `/api/products` / `/api/products/:id` | Solo admin |
| GET/PUT | `/api/users/me` | Usuario autenticado |
| GET/POST/PUT/DELETE | `/api/cart` | Usuario autenticado |
| POST/GET | `/api/orders` | Usuario autenticado |
| PUT | `/api/orders/:id/cancel`, `/api/orders/:id/return-request` | Dueño del pedido (o admin) |
| GET/PUT/DELETE | `/api/orders/all`, `/api/orders/returns`, `/api/orders/user/:userId` | Solo admin |
| POST | `/api/contact` | Público (con rate limit) |
| GET/POST/DELETE | `/api/contact` (listar/responder/borrar) | Solo admin |

## Despliegue

### Backend en Render

1. Sube este repositorio a GitHub.
2. En Render, crea un **Web Service** apuntando a la carpeta `backend` (o usa el `backend/render.yaml`
   incluido con "New +" → "Blueprint").
3. Configura las variables de entorno en el dashboard de Render: `MONGODB_URI`, `JWT_SECRET`,
   `JWT_EXPIRES_IN`, `CLIENT_URL` (debe ser la URL pública de tu frontend en Vercel), `SMTP_USER`,
   `SMTP_PASS`, `NOTIFY_EMAIL`.
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

1. Configura un dominio propio en Vercel y actualiza `CLIENT_URL` en Render en consecuencia.
2. Considera agregar verificación de correo y recuperación de contraseña si el proyecto crece.
3. Si vas a usar una pasarela de pago real, el checkout actual es 100% simulado — habría que
   integrar un procesador (Stripe, Mercado Pago, etc.) antes de aceptar pagos reales.
