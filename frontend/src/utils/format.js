// Formatea un número como precio en dólares con separadores de miles y
// siempre dos decimales ($1,234.50). Un valor no numérico se trata como $0
// en vez de mostrar "$NaN".
export function formatPrice(value) {
  const num = Number(value) || 0;
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// El precio que en verdad se cobra por un producto: el de lista si no tiene
// oferta, o el de lista menos su discountPercent si sí. Misma fórmula
// (y mismo redondeo a centavos) que Product.getSellingPrice() en el backend
// — se duplica aquí a propósito porque el carrito y el resumen de checkout
// muestran el precio ANTES de mandar la orden al servidor, que es quien
// calcula y cobra el definitivo; que ambos lados usen la misma cuenta es lo
// que evita que el total mostrado aquí no coincida con lo que se cobra allá.
export function getSellingPrice(product) {
  if (!product) return 0;
  if (!product.discountPercent) return product.price;
  return Math.round(product.price * (1 - product.discountPercent / 100) * 100) / 100;
}

// Deja solo dígitos y un punto decimal, con un máximo de dos decimales.
// Devuelve el valor "crudo" ("18499.99") apto para Number(), no el formateado.
export function parsePriceInput(value) {
  const cleaned = String(value ?? '').replace(/[^\d.]/g, '');
  if (cleaned === '') return '';

  const [intRaw, ...rest] = cleaned.split('.');
  const intPart = intRaw.replace(/^0+(?=\d)/, '');

  if (rest.length === 0) return intPart;
  return `${intPart}.${rest.join('').slice(0, 2)}`;
}

// Presenta el valor crudo como $000,000.00. Conserva lo que el usuario está
// escribiendo (un punto final o un solo decimal) para no pelear con el cursor.
export function formatPriceInput(raw) {
  if (raw === '' || raw == null) return '';

  const [intPart, decPart] = String(raw).split('.');
  const grouped = (intPart || '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decPart === undefined) return `$${grouped}`;
  return `$${grouped}.${decPart}`;
}

// Completa los decimales al salir del campo: "$5,000" -> "$5,000.00"
export function normalizePriceInput(raw) {
  if (raw === '' || raw == null) return '';
  const n = Number(raw);
  if (!Number.isFinite(n)) return '';
  return n.toFixed(2);
}

// Quita todo lo que no sea dígito y recorta a maxLength; es lo que en verdad
// se guarda en el estado de teléfono/tarjeta/expiración — lo demás en este
// archivo son solo formatos de presentación sobre este valor "crudo".
export function digitsOnly(value, maxLength) {
  const digits = String(value || '').replace(/\D/g, '');
  return maxLength ? digits.slice(0, maxLength) : digits;
}

// "0000000000" -> "000 000 0000", para mostrar el teléfono mientras se
// captura sin tener que guardarlo ya formateado.
export function formatPhoneDisplay(value) {
  const d = digitsOnly(value, 10);
  const parts = [];
  if (d.length > 0) parts.push(d.slice(0, 3));
  if (d.length > 3) parts.push(d.slice(3, 6));
  if (d.length > 6) parts.push(d.slice(6, 10));
  return parts.join(' ');
}

// Agrupa el número de tarjeta en bloques de 4 dígitos ("0000 0000 0000 0000").
export function formatCardNumberDisplay(value) {
  const d = digitsOnly(value, 16);
  return (d.match(/.{1,4}/g) || []).join(' ');
}

// "MMAA" -> "MM/AA" mientras se teclea (sin la barra todavía si solo hay 1-2 dígitos).
export function formatExpiryDisplay(value) {
  const d = digitsOnly(value, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

// Adivina la marca de la tarjeta por su primer dígito (como hace cualquier
// checkout real), solo para mostrarla — el pago en sí es simulado, no hay
// validación real de tarjetas en este proyecto.
export function detectCardBrand(cardDigits) {
  if (cardDigits.startsWith('4')) return 'Visa';
  if (cardDigits.startsWith('5')) return 'Mastercard';
  if (cardDigits.startsWith('3')) return 'American Express';
  return 'Visa';
}
