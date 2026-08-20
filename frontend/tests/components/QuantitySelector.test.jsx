import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantitySelector from '../../src/components/QuantitySelector';

// Componente controlado: value/onChange los maneja quien lo use (Cart,
// ProductDetail), así que estas pruebas verifican que llame a onChange con
// el número correcto en cada interacción, sin asumir que el componente
// actualiza su propio estado visible.
describe('QuantitySelector', () => {
  it('el botón "+" llama a onChange con value + 1', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} min={1} max={10} />);

    await user.click(screen.getByLabelText('Aumentar cantidad'));

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('el botón "-" llama a onChange con value - 1', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} min={1} max={10} />);

    await user.click(screen.getByLabelText('Disminuir cantidad'));

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('el botón "-" se deshabilita al llegar al mínimo (no baja de ahí)', () => {
    const onChange = vi.fn();
    render(<QuantitySelector value={1} onChange={onChange} min={1} max={10} />);

    expect(screen.getByLabelText('Disminuir cantidad')).toBeDisabled();
  });

  it('el botón "+" se deshabilita al llegar al máximo (no sube de ahí, p. ej. el stock disponible)', () => {
    const onChange = vi.fn();
    render(<QuantitySelector value={5} onChange={onChange} min={1} max={5} />);

    expect(screen.getByLabelText('Aumentar cantidad')).toBeDisabled();
  });

  it('escribir directo en el campo respeta el máximo (no deja pasar un número mayor al stock)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector value={1} onChange={onChange} min={1} max={5} />);

    const input = screen.getByLabelText('Cantidad');
    await user.clear(input);
    await user.type(input, '99');

    // Cada dígito tecleado dispara su propio onChange; el último debe quedar
    // topado en el máximo, no en 99.
    expect(onChange).toHaveBeenLastCalledWith(5);
  });
});
