import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Envuelve una <Route> para exigir sesión (y, con adminOnly, además rol
// admin). Es solo una capa de UX en el cliente: quien de verdad protege los
// datos es el backend (protect/adminOnly en cada ruta de la API), esto nomás
// evita que alguien sin sesión llegue a ver la pantalla y le mande a /login.
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mientras loadUser() (en AuthContext) sigue resolviendo si hay una sesión
  // válida, no se puede decidir todavía si dejar pasar o redirigir.
  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner" />
      </div>
    );
  }

  // Sin sesión: manda a login, recordando a dónde volver tras iniciar sesión
  // (Login.jsx lee location.state.from para redirigir de vuelta aquí).
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
