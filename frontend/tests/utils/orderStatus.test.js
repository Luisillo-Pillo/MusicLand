import { describe, it, expect } from 'vitest';
import {
  canCancel,
  isCancelled,
  canChangeStatus,
  canDelete,
  canRequestReturn,
  returnableProducts,
  RETURN_WINDOW_DAYS
} from '../../src/utils/orderStatus';

describe('canCancel', () => {
  it('el cliente puede cancelar mientras esté pendiente o procesando', () => {
    expect(canCancel({ status: 'pendiente' }, false)).toBe(true);
    expect(canCancel({ status: 'procesando' }, false)).toBe(true);
  });

  it('el cliente NO puede cancelar uno ya enviado', () => {
    expect(canCancel({ status: 'enviado' }, false)).toBe(false);
  });

  it('el admin sí puede cancelar uno enviado', () => {
    expect(canCancel({ status: 'enviado' }, true)).toBe(true);
  });

  it('nadie puede cancelar un pedido ya entregado o cancelado (estatus final)', () => {
    expect(canCancel({ status: 'entregado' }, true)).toBe(false);
    expect(canCancel({ status: 'cancelado' }, true)).toBe(false);
  });
});

describe('isCancelled / canChangeStatus / canDelete', () => {
  it('isCancelled solo es true para status "cancelado"', () => {
    expect(isCancelled({ status: 'cancelado' })).toBe(true);
    expect(isCancelled({ status: 'entregado' })).toBe(false);
  });

  it('canChangeStatus es false para los estatus finales', () => {
    expect(canChangeStatus({ status: 'entregado' })).toBe(false);
    expect(canChangeStatus({ status: 'procesando' })).toBe(true);
  });

  it('canDelete solo permite borrar pedidos ya en un estatus final', () => {
    expect(canDelete({ status: 'entregado' })).toBe(true);
    expect(canDelete({ status: 'pendiente' })).toBe(false);
  });
});

describe('canRequestReturn / returnableProducts', () => {
  function deliveredOrder(daysAgo, overrides = {}) {
    const deliveredAt = new Date();
    deliveredAt.setDate(deliveredAt.getDate() - daysAgo);
    return {
      status: 'entregado',
      deliveredAt: deliveredAt.toISOString(),
      products: [{ product: 'p1', name: 'Guitarra', quantity: 1 }],
      returnRequests: [],
      ...overrides
    };
  }

  it('solo se puede solicitar devolución de un pedido entregado', () => {
    expect(canRequestReturn({ status: 'enviado' })).toBe(false);
  });

  it(`dentro de los ${RETURN_WINDOW_DAYS} días de entregado, se puede solicitar`, () => {
    expect(canRequestReturn(deliveredOrder(5))).toBe(true);
  });

  it(`después de los ${RETURN_WINDOW_DAYS} días, ya no se puede`, () => {
    expect(canRequestReturn(deliveredOrder(RETURN_WINDOW_DAYS + 1))).toBe(false);
  });

  it('un producto ya incluido en una solicitud previa no vuelve a ofrecerse', () => {
    const order = deliveredOrder(2, {
      products: [
        { product: 'p1', name: 'Guitarra', quantity: 1 },
        { product: 'p2', name: 'Amplificador', quantity: 1 }
      ],
      returnRequests: [{ items: [{ product: 'p1' }], status: 'pendiente' }]
    });

    const remaining = returnableProducts(order);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].product).toBe('p2');
  });

  it('si TODOS los productos ya se solicitaron, deja de ser elegible', () => {
    const order = deliveredOrder(2, {
      returnRequests: [{ items: [{ product: 'p1' }], status: 'pendiente' }]
    });

    expect(canRequestReturn(order)).toBe(false);
  });
});
