import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from './icons';

// Botón "volver" que usa el historial del navegador cuando hay a dónde
// volver dentro de la app, y una ruta fija cuando no (p. ej. si se llegó por
// un enlace externo o al recargar la página, donde history.length es bajo).
export default function BackButton({ fallback = '/' }) {
  const navigate = useNavigate();

  function handleClick() {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  }

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleClick}
      aria-label="Volver a la página anterior"
      title="Volver"
    >
      <ArrowLeftIcon />
    </button>
  );
}
