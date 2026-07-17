import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { LogoIcon, SearchIcon, CartIcon, ChevronDownIcon, UserIcon, LogoutIcon, EditIcon } from './icons';
import './Header.css';

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(search.trim() ? `/?search=${encodeURIComponent(search.trim())}` : '/');
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header-brand">
          <LogoIcon />
          MusicLand
        </Link>

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

        <div className="header-actions">
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
                  {user.name.split(' ')[0]}
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
    </header>
  );
}
