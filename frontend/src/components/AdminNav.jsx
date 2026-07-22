import { NavLink } from 'react-router-dom';
import './AdminNav.css';

export default function AdminNav() {
  return (
    <nav className="admin-nav">
      <NavLink to="/admin/productos" className={({ isActive }) => (isActive ? 'active' : '')}>
        Productos
      </NavLink>
      <NavLink to="/admin/usuarios" className={({ isActive }) => (isActive ? 'active' : '')}>
        Clientes
      </NavLink>
      <NavLink to="/admin/mensajes" className={({ isActive }) => (isActive ? 'active' : '')}>
        Mensajes
      </NavLink>
    </nav>
  );
}
