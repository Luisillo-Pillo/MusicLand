export function formatPrice(value) {
  const num = Number(value) || 0;
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
