// handleError es el `catch` de prácticamente todos los controladores (ver
// backend/src/utils/handleError.js): esta prueba cubre justo lo que le
// importa a la seguridad del proyecto — que un CastError o un
// ValidationError den un mensaje claro, y que cualquier OTRO error (uno real
// del servidor) nunca filtre detalle interno (stack, mensaje crudo) al cliente.
const handleError = require('../../src/utils/handleError');

// Mock mínimo de un objeto `res` de Express: solo lo que handleError usa
// (res.status(n).json(obj)), encadenable igual que el real.
function mockRes() {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}

describe('handleError', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('CastError (id con formato inválido) da 400 con mensaje amigable', () => {
    const res = mockRes();
    const error = { name: 'CastError' };
    handleError(res, error, 'Error al obtener el producto');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'El identificador proporcionado no es válido' });
  });

  it('ValidationError reenvía los mensajes de las reglas del schema', () => {
    const res = mockRes();
    const error = {
      name: 'ValidationError',
      errors: {
        price: { message: 'El precio no puede ser negativo' }
      }
    };
    handleError(res, error, 'Error al crear el producto');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'El precio no puede ser negativo' });
  });

  it('código 11000 (índice único duplicado) da 409', () => {
    const res = mockRes();
    const error = { code: 11000 };
    handleError(res, error, 'Error al registrar');
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Ya existe un registro con esos datos' });
  });

  it('cualquier otro error da 500 con el mensaje genérico, NUNCA con error.message ni el stack', () => {
    const res = mockRes();
    const error = new Error('ECONNREFUSED 10.0.4.12:27017 — detalle interno de infraestructura');
    handleError(res, error, 'Error al obtener usuarios');
    expect(res.status).toHaveBeenCalledWith(500);
    // El mensaje que llega al cliente es el que pasó el controlador, no error.message.
    expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener usuarios' });
    const [[sentBody]] = res.json.mock.calls;
    expect(JSON.stringify(sentBody)).not.toContain('10.0.4.12');
  });
});
