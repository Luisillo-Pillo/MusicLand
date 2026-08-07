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

// La ventana para solicitar una devolución son 15 días naturales desde que el
// pedido se marcó como entregado (deliveredAt, sin hora). Pasado ese plazo la
// opción desaparece aunque nunca se haya solicitado una devolución.
export const RETURN_WINDOW_DAYS = 15;

function isWithinReturnWindow(order) {
  if (!order?.deliveredAt) return false;
  const deadline = new Date(order.deliveredAt);
  deadline.setDate(deadline.getDate() + RETURN_WINDOW_DAYS);
  return Date.now() <= deadline.getTime();
}

// IDs de producto que ya aparecen en alguna solicitud de devolución previa de
// este pedido (sin importar su estatus: pendiente, aprobada o rechazada). Una
// vez solicitado, ese producto ya no puede volver a solicitarse.
export function alreadyRequestedProductIds(order) {
  return new Set(
    (order?.returnRequests || []).flatMap((r) => r.items.map((i) => i.product).filter(Boolean))
  );
}

// Productos del pedido que todavía se pueden incluir en una nueva solicitud.
export function returnableProducts(order) {
  if (!order) return [];
  const requested = alreadyRequestedProductIds(order);
  return order.products.filter((p) => p.product && !requested.has(p.product));
}

// Solo se puede solicitar devolución de un pedido entregado, dentro de los 15
// días siguientes a la entrega, y solo si queda al menos un producto que
// nunca se haya incluido en una solicitud anterior (si un pedido con varios
// productos ya cubrió todos con solicitudes previas, deja de ser elegible).
export function canRequestReturn(order) {
  if (!order || order.status !== 'entregado') return false;
  if (!isWithinReturnWindow(order)) return false;
  return returnableProducts(order).length > 0;
}

export const returnStatusLabels = {
  pendiente: 'En revisión',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada'
};
