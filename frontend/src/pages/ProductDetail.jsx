import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import QuantitySelector from '../components/QuantitySelector';
import { getProductByIdRequest } from '../api/productApi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartIcon, BoltIcon } from '../components/icons';
import { formatPrice } from '../utils/format';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductByIdRequest(id)
      .then(({ data }) => {
        setProduct(data);
        setQuantity(1);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAddToCart() {
    if (!user) {
      navigate('/login', { state: { from: `/producto/${id}` } });
      return;
    }
    setAdding(true);
    setError('');
    try {
      await addToCart(product._id, quantity);
      setFeedback('Producto agregado al carrito.');
      setTimeout(() => setFeedback(''), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo agregar el producto al carrito.');
    } finally {
      setAdding(false);
    }
  }

  // Agrega el producto al carrito y salta directo a checkout, sin pasar por la
  // pantalla de carrito: es el atajo de "una compra, un clic".
  async function handleBuyNow() {
    if (!user) {
      navigate('/login', { state: { from: `/producto/${id}` } });
      return;
    }
    setBuying(true);
    setError('');
    try {
      await addToCart(product._id, quantity);
      navigate('/checkout');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo procesar la compra.');
      setBuying(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <BackButton />
        <div className="spinner-wrapper">
          <div className="spinner" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <BackButton />
        <div className="container empty-state">
          <p>No se encontró el producto que buscas.</p>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </Layout>
    );
  }

  const outOfStock = product.stock <= 0;

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <div className="product-detail-meta">
              <span className="badge">{product.category}</span>
              <span className="badge">{product.brand}</span>
            </div>
            <h1>{product.name}</h1>
            <p className="product-detail-price">{formatPrice(product.price)}</p>

            <h4>Descripción</h4>
            <p className="product-detail-description">{product.description}</p>

            <p className={`product-detail-stock ${outOfStock ? 'low' : ''}`}>
              {outOfStock ? 'Sin stock disponible' : `Stock disponible: ${product.stock} unidades`}
            </p>

            {!outOfStock && (
              <div className="product-detail-qty-row">
                <span>Cantidad</span>
                <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={product.stock} />
              </div>
            )}

            {error && <p className="error-text">{error}</p>}

            <div className="product-detail-actions">
              <button
                type="button"
                className="btn btn-accent"
                onClick={handleBuyNow}
                disabled={outOfStock || buying || adding}
              >
                <BoltIcon size={16} />
                {buying ? 'Procesando...' : 'Comprar ahora'}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={outOfStock || adding || buying}
              >
                <CartIcon size={16} />
                {feedback || 'Agregar al carrito'}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
