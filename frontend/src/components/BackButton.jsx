import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from './icons';

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
