import { MinusIcon, PlusIcon } from './icons';
import './QuantitySelector.css';

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  function handleDecrease() {
    if (value > min) onChange(value - 1);
  }

  function handleIncrease() {
    if (value < max) onChange(value + 1);
  }

  function handleInput(e) {
    const next = Number(e.target.value.replace(/\D/g, ''));
    if (Number.isNaN(next)) return;
    onChange(Math.min(max, Math.max(min, next)));
  }

  return (
    <div className="qty-selector">
      <button type="button" onClick={handleDecrease} disabled={value <= min} aria-label="Disminuir cantidad">
        <MinusIcon />
      </button>
      <input value={value} onChange={handleInput} inputMode="numeric" aria-label="Cantidad" />
      <button type="button" onClick={handleIncrease} disabled={value >= max} aria-label="Aumentar cantidad">
        <PlusIcon />
      </button>
    </div>
  );
}
