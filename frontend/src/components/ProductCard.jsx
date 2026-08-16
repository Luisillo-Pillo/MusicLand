import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartIcon } from './icons';
import { formatPrice, getSellingPrice } from '../utils/format';
import './ProductCard.css';

// Tarjeta de producto usada en el grid del Home, resultados de búsqueda,
// Categorías y Marcas. Es clicable como un todo (navega al detalle) y además
// trae su propio botón de "agregar al carrito" en una sola cantidad.
export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [adding, setAdding] = useState(false);
  // Feedback breve de "Agregado" en el botón tras la llamada, antes de volver al texto normal.
  const [added, setAdded] = useState(false);

  // Sin sesión, no hay carrito al que agregar: manda a login en vez de
  // intentar la petición (que el backend rechazaría de todas formas). Se
  // manda también qué se quería agregar (pendingCartAdd) y desde dónde
  // (from, la página actual con sus filtros/búsqueda incluidos): Login.jsx
  // agrega el producto al carrito automáticamente y vuelve aquí mismo en
  // cuanto la sesión se inicia, en vez de dejar al usuario en el inicio
  // teniendo que buscar el producto otra vez.
  async function handleAddToCart(e) {
    e.stopPropagation();
    if (!user) {
      navigate('/login', {
        state: {
          from: location.pathname + location.search,
          pendingCartAdd: { productId: product._id, quantity: 1 }
        }
      });
      return;
    }
    setAdding(true);
    try {
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } finally {
      setAdding(false);
    }
  }

  function goToDetail() {
    navigate(`/producto/${product._id}`);
  }

  // El resto de la tarjeta (imagen, nombre, precio) navega al detalle al hacer
  // clic; los botones cortan la propagación para no disparar la navegación
  // por encima de su propia acción.
  function handleCardKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToDetail();
    }
  }

  const outOfStock = product.stock <= 0;
  const onSale = product.discountPercent > 0;
  const sellingPrice = getSellingPrice(product);

  return (
    <div
      className="product-card card"
      onClick={goToDetail}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Ver detalles de ${product.name}`}
    >
      <div className="product-card-image">
        {/* Igual que el badge del carrusel: el % viene directo del producto,
            no hay una lista de "ofertas de la semana" aparte que mantener. */}
        {onSale && <span className="product-card-discount-badge">-{product.discountPercent}%</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        {onSale ? (
          <span className="product-card-price-row">
            <span className="product-card-price product-card-price-sale">{formatPrice(sellingPrice)}</span>
            <span className="product-card-price-original">{formatPrice(product.price)}</span>
          </span>
        ) : (
          <span className="product-card-price">{formatPrice(product.price)}</span>
        )}
      </div>
      <div className="product-card-actions">
        <button
          type="button"
          className="btn btn-primary product-card-add"
          onClick={handleAddToCart}
          disabled={outOfStock || adding}
          aria-label={outOfStock ? 'Sin stock' : added ? 'Producto agregado' : 'Agregar al carrito'}
        >
          <CartIcon size={15} />
          {/* En mobile este texto se oculta por CSS y el botón queda solo como ícono. */}
          <span className="product-card-add-label">
            {outOfStock ? 'Sin stock' : added ? 'Agregado' : 'Agregar'}
          </span>
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={(e) => {
            e.stopPropagation();
            goToDetail();
          }}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
