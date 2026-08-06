// Traduce errores internos a respuestas seguras: registra el detalle en el servidor
// y devuelve al cliente solo lo que necesita saber, sin filtrar la estructura interna.
function handleError(res, error, message) {
  console.error(`${message}:`, error);

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'El identificador proporcionado no es válido' });
  }

  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors || {})
      .map((e) => e.message)
      .join('. ');
    return res.status(400).json({ message: details || 'Los datos enviados no son válidos' });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'Ya existe un registro con esos datos' });
  }

  return res.status(500).json({ message });
}

module.exports = handleError;
