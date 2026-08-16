import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import {
  LogoIcon,
  SearchIcon,
  CartIcon,
  ChevronDownIcon,
  UserIcon,
  LogoutIcon,
  EditIcon,
  ReceiptIcon,
  MenuIcon,
  CloseIcon,
  SunIcon,
  MoonIcon
} from './icons';
import './Header.css';

// Barra superior fija en toda la app, dividida en 3 bloques a lo largo de la
// fila en escritorio (ver Header.css): logo a la izquierda, buscador +
// navegación principal centrados, y tema/carrito/usuario a la derecha. Los
// bloques son solo contenedores visuales — en mobile "desaparecen" (display:
// contents) y sus hijos vuelven a ser una fila plana con su propio menú
// hamburguesa, que es como ya funcionaba antes de dividir el header en bloques.
export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(activeSearch);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef(null);

  // Mantiene la caja alineada con la URL: al llegar por enlace, al usar atrás/adelante
  // o al quitar los filtros desde el listado, lo que se ve debe ser lo que se busca.
  useEffect(() => {
    setSearch(activeSearch);
  }, [activeSearch]);

  // Cierra el menú móvil al cambiar de página, para no dejarlo abierto tapando la vista siguiente.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Cierra el menú de usuario al hacer clic fuera de él (el dropdown no tiene
  // un botón de "cerrar" propio, se cierra por convención al perder foco/clic afuera).
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Envía la búsqueda como query param a Home, que es quien de verdad la resuelve.
  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(search.trim() ? `/?search=${encodeURIComponent(search.trim())}` : '/');
    setMobileNavOpen(false);
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  return (
    <header className="header">
      <div className="container header-row">
        {/* Bloque izquierdo: menú hamburguesa (solo mobile) + logo. */}
        <div className="header-group-left">
          <button
            type="button"
            className="header-menu-btn"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label={mobileNavOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>

          <Link to="/" className="header-brand">
            <LogoIcon />
            <span>MusicLand</span>
          </Link>
        </div>

        {/* Bloque central: buscador + navegación principal, como una sola
            unidad centrada en la fila (no cada uno centrado por separado). */}
        <div className="header-group-center">
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar instrumentos, marcas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <nav className="header-nav">
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/categorias">Categorías</NavLink>
            <NavLink to="/marcas">Marcas</NavLink>
            <NavLink to="/contacto">Contáctanos</NavLink>
          </nav>
        </div>

        {/* Bloque derecho: tema, carrito y perfil (o login/registro sin sesión). */}
        <div className="header-actions">
          <button
            type="button"
            className="header-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="btn btn-accent btn-sm">
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header-cart-btn"
                onClick={() => navigate('/carrito')}
                aria-label="Ver carrito"
              >
                <CartIcon />
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </button>

              <div className="user-menu" ref={menuRef}>
                <button type="button" className="user-menu-trigger" onClick={() => setMenuOpen((o) => !o)}>
                  <img src={user.profilePhoto} alt={user.name} />
                  <span className="user-menu-name">{user.name.split(' ')[0]}</span>
                  <ChevronDownIcon />
                </button>
                {menuOpen && (
                  <div className="user-menu-dropdown">
                    <Link to="/perfil" onClick={() => setMenuOpen(false)}>
                      <UserIcon size={16} /> Ver perfil
                    </Link>
                    <Link to="/carrito" onClick={() => setMenuOpen(false)}>
                      <CartIcon size={16} /> Ver carrito
                    </Link>
                    <Link to="/historial-compras" onClick={() => setMenuOpen(false)}>
                      <ReceiptIcon size={16} /> Historial de compras
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin/productos" onClick={() => setMenuOpen(false)}>
                        <EditIcon size={16} /> Panel admin
                      </Link>
                    )}
                    <button type="button" className="logout-option" onClick={handleLogout}>
                      <LogoutIcon size={16} /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {mobileNavOpen && (
        <nav className="header-mobile-nav">
          <NavLink to="/" end onClick={() => setMobileNavOpen(false)}>
            Inicio
          </NavLink>
          <NavLink to="/categorias" onClick={() => setMobileNavOpen(false)}>
            Categorías
          </NavLink>
          <NavLink to="/marcas" onClick={() => setMobileNavOpen(false)}>
            Marcas
          </NavLink>
          <NavLink to="/contacto" onClick={() => setMobileNavOpen(false)}>
            Contáctanos
          </NavLink>
        </nav>
      )}
    </header>
  );
}
