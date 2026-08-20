import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  getSellingPrice,
  digitsOnly,
  formatPhoneDisplay,
  formatCardNumberDisplay,
  formatExpiryDisplay,
  detectCardBrand,
  parsePriceInput
} from '../../src/utils/format';

describe('formatPrice', () => {
  it('formatea con separador de miles y siempre 2 decimales', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50');
  });

  it('un valor no numérico se trata como $0, no como $NaN', () => {
    expect(formatPrice(undefined)).toBe('$0.00');
    expect(formatPrice('no-es-numero')).toBe('$0.00');
  });
});

describe('getSellingPrice', () => {
  // Misma fórmula que Product.getSellingPrice() en el backend — ver el
  // comentario en utils/format.js sobre por qué se duplica a propósito.
  it('sin producto, devuelve 0 en vez de lanzar', () => {
    expect(getSellingPrice(null)).toBe(0);
  });

  it('sin descuento, devuelve el precio de lista', () => {
    expect(getSellingPrice({ price: 500, discountPercent: 0 })).toBe(500);
  });

  it('con descuento, aplica el porcentaje y redondea a centavos', () => {
    expect(getSellingPrice({ price: 999.99, discountPercent: 15 })).toBe(849.99);
  });
});

describe('digitsOnly', () => {
  it('quita todo lo que no sea dígito', () => {
    expect(digitsOnly('449 123-4567')).toBe('4491234567');
  });

  it('recorta a maxLength', () => {
    expect(digitsOnly('12345678901234', 10)).toBe('1234567890');
  });
});

describe('formatPhoneDisplay', () => {
  it('agrupa 10 dígitos en 3-3-4', () => {
    expect(formatPhoneDisplay('4491234567')).toBe('449 123 4567');
  });

  it('con menos dígitos, agrupa solo lo que hay', () => {
    expect(formatPhoneDisplay('449')).toBe('449');
    expect(formatPhoneDisplay('')).toBe('');
  });
});

describe('formatCardNumberDisplay', () => {
  it('agrupa en bloques de 4', () => {
    expect(formatCardNumberDisplay('4111111111111111')).toBe('4111 1111 1111 1111');
  });
});

describe('formatExpiryDisplay', () => {
  it('agrega la barra a partir del tercer dígito', () => {
    expect(formatExpiryDisplay('12')).toBe('12');
    expect(formatExpiryDisplay('1228')).toBe('12/28');
  });
});

describe('detectCardBrand', () => {
  it('4 -> Visa, 5 -> Mastercard, 3 -> American Express', () => {
    expect(detectCardBrand('4111')).toBe('Visa');
    expect(detectCardBrand('5500')).toBe('Mastercard');
    expect(detectCardBrand('3400')).toBe('American Express');
  });
});

describe('parsePriceInput', () => {
  it('quita ceros a la izquierda y limita a 2 decimales', () => {
    expect(parsePriceInput('0018499.999')).toBe('18499.99');
  });
});
