import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartIcon } from './icons';
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
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <span className="product-card-price">${product.price.toFixed(2)}</span>
        <span className={`product-card-stock ${outOfStock ? 'low' : ''}`}>
          {outOfStock ? 'Sin stock' : `${product.stock} disponibles`}
        </span>
      </div>
      <div className="product-card-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddToCart}
          disabled={outOfStock || adding}
        >
          <CartIcon size={15} />
          {added ? 'Agregado' : 'Agregar'}
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
