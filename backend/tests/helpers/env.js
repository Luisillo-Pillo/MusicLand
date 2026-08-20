// Variables de entorno mínimas que el código de la app necesita para poder
// arrancar en las pruebas (JWT_SECRET lo usan generateToken/protect;
// CLIENT_URL lo usa la config de CORS en app.js) — nunca se carga el .env
// real ni se toca MONGODB_URI, así las pruebas jamás pueden conectarse por
// accidente a la base de datos real de desarrollo/producción.
process.env.JWT_SECRET = 'clave-secreta-solo-para-pruebas';
process.env.JWT_EXPIRES_IN = '1h';
process.env.CLIENT_URL = 'http://localhost:5173';
