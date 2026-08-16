// Traduce errores internos a respuestas seguras: registra el detalle en el servidor
// y devuelve al cliente solo lo que necesita saber, sin filtrar la estructura interna.
// Es el `catch` de prácticamente todos los controladores (ver los `handleError(res,
// error, '...')` al final de cada try/catch); mantiene un único lugar que decide
// qué tan seguro es exponer cada tipo de error de Mongoose/MongoDB.
function handleError(res, error, message) {
  // El log completo (con stack) solo va a la consola del servidor —
  // process.env no expone esto al cliente, y el mensaje HTTP de más abajo
  // nunca incluye error.stack ni error.message directamente.
  console.error(`${message}:`, error);

  // CastError: Mongoose no pudo convertir algo (típicamente un :id de la URL)
  // al tipo que espera el schema — el caso más común es un ObjectId con
  // formato inválido. Es un error de entrada del cliente, no del servidor.
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'El identificador proporcionado no es válido' });
  }

  // ValidationError: el documento no pasó las reglas del schema (required,
  // min, match, enum, etc.). Los mensajes de esas reglas ya están escritos
  // pensando en el usuario final (ver los schemas en src/models/), así que
  // sí es seguro reenviarlos tal cual — a diferencia de error.message de
  // otros tipos de error, que sí puede traer detalle interno.
  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors || {})
      .map((e) => e.message)
      .join('. ');
    return res.status(400).json({ message: details || 'Los datos enviados no son válidos' });
  }

  // Código 11000 = violación de índice único de MongoDB (p. ej. un correo que
  // ya existe). No se expone qué campo/índice fue, solo que hay un choque.
  if (error.code === 11000) {
    return res.status(409).json({ message: 'Ya existe un registro con esos datos' });
  }

  // Cualquier otro error (de red, del driver, un bug) es un 500 genérico con
  // el `message` que cada controlador definió de antemano (p. ej. "Error al
  // obtener productos") — nunca error.message, que podría traer rutas de
  // archivo, nombres de colección u otro detalle interno del servidor.
  return res.status(500).json({ message });
}

module.exports = handleError;
