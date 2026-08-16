import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router no hace scroll al inicio al navegar (a diferencia de una
// navegación de página completa de toda la vida); este componente, montado
// una vez en App.jsx, sube la página al tope cada vez que cambia la ruta.
// No renderiza nada visible (return null): es puro efecto secundario.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
