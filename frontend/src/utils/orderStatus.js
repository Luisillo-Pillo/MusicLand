// Todos los estatus posibles, en el orden en que avanza un pedido.
export const ORDER_STATUSES = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];

export const statusLabels = {
  pendiente: 'Pendiente',
  procesando: 'Procesando',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado'
};

// Entregado y cancelado cierran el ciclo del pedido: su estatus queda congelado.
export const FINAL_STATUSES = ['entregado', 'cancelado'];

// Un cliente solo puede cancelar antes de que el pedido salga del almacén;
// el admin además puede cancelar uno ya enviado. Refleja las reglas del backend.
export function canCancel(order, isAdmin) {
  if (!order || FINAL_STATUSES.includes(order.status)) return false;
  return isAdmin || ['pendiente', 'procesando'].includes(order.status);
}

export function isCancelled(order) {
  return order?.status === 'cancelado';
}

// Ni entregado ni cancelado admiten cambio de estatus.
export function canChangeStatus(order) {
  return !!order && !FINAL_STATUSES.includes(order.status);
}

// Solo se eliminan los pedidos que ya cerraron su ciclo.
export function canDelete(order) {
  return !!order && FINAL_STATUSES.includes(order.status);
}

// Solo se puede solicitar devolución de un pedido ya entregado, y no si ya hay
// una solicitud en revisión (una aprobada o rechazada no bloquea volver a pedir).
export function canRequestReturn(order) {
  if (!order || order.status !== 'entregado') return false;
  return !(order.returnRequest && order.returnRequest.status === 'pendiente');
}

export const returnStatusLabels = {
  pendiente: 'En revisión',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada'
};
