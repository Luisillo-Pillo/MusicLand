import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from './icons';
import './QuantitySelector.css';

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  // El texto del campo se maneja aparte del valor confirmado para poder borrarlo y
  // reescribirlo: si se propagara el campo vacío como 0, en el carrito (min = 0)
  // eso dispararía el diálogo de eliminar el producto a media edición.
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function handleDecrease() {
    if (value > min) onChange(value - 1);
  }

  function handleIncrease() {
    if (value < max) onChange(value + 1);
  }

  function handleInput(e) {
    const digits = e.target.value.replace(/\D/g, '');
    setDraft(digits);
    if (digits === '') return;
    onChange(Math.min(max, Math.max(min, Number(digits))));
  }

  function handleBlur() {
    if (draft === '') setDraft(String(value));
  }

  return (
    <div className="qty-selector">
      <button type="button" onClick={handleDecrease} disabled={value <= min} aria-label="Disminuir cantidad">
        <MinusIcon />
      </button>
      <input
        value={draft}
        onChange={handleInput}
        onBlur={handleBlur}
        inputMode="numeric"
        aria-label="Cantidad"
      />
      <button type="button" onClick={handleIncrease} disabled={value >= max} aria-label="Aumentar cantidad">
        <PlusIcon />
      </button>
    </div>
  );
}
