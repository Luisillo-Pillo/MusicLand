export function formatPrice(value) {
  const num = Number(value) || 0;
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

export function digitsOnly(value, maxLength) {
  const digits = String(value || '').replace(/\D/g, '');
  return maxLength ? digits.slice(0, maxLength) : digits;
}

export function formatPhoneDisplay(value) {
  const d = digitsOnly(value, 10);
  const parts = [];
  if (d.length > 0) parts.push(d.slice(0, 3));
  if (d.length > 3) parts.push(d.slice(3, 6));
  if (d.length > 6) parts.push(d.slice(6, 10));
  return parts.join(' ');
}

export function formatCardNumberDisplay(value) {
  const d = digitsOnly(value, 16);
  return (d.match(/.{1,4}/g) || []).join(' ');
}

export function formatExpiryDisplay(value) {
  const d = digitsOnly(value, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function detectCardBrand(cardDigits) {
  if (cardDigits.startsWith('4')) return 'Visa';
  if (cardDigits.startsWith('5')) return 'Mastercard';
  if (cardDigits.startsWith('3')) return 'American Express';
  return 'Visa';
}
