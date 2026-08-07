import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartIcon } from './icons';
import { formatPrice } from '../utils/format';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAddToCart() {
    if (!user) {
      navigate('/login', { state: { from: '/' } });
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

  const outOfStock = product.stock <= 0;

  return (
    <div className="product-card card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <span className="product-card-price">{formatPrice(product.price)}</span>
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
          onClick={() => navigate(`/producto/${product._id}`)}
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
}
