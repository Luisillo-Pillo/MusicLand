import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import QuantitySelector from '../components/QuantitySelector';
import { getProductByIdRequest } from '../api/productApi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartIcon, BoltIcon } from '../components/icons';
import { formatPrice, getSellingPrice } from '../utils/format';
import './ProductDetail.css';

// Ficha de un producto: imagen, descripción, selector de cantidad y las dos
// vías de compra (agregar al carrito, o "Comprar ahora" directo a checkout).
export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  // Se vuelve a pedir el producto cada vez que cambia el :id de la URL (p.
  // ej. al navegar de un producto a otro desde "productos relacionados"),
  // reiniciando la cantidad elegida a 1.
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

  // Igual que en ProductCard: sin sesión, guarda qué se quería agregar
  // (con la cantidad ya elegida) y a qué producto volver, para que Login.jsx
  // lo agregue solo en cuanto inicie sesión.
  async function handleAddToCart() {
    if (!user) {
      navigate('/login', {
        state: {
          from: `/producto/${id}`,
          pendingCartAdd: { productId: product._id, quantity }
        }
      });
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

  // Salta directo a checkout con este producto puntual, sin pasar por el
  // carrito ni tocarlo: lo que el usuario ya tenía guardado ahí se queda igual.
  //
  // Sin sesión: se manda el mismo { product, quantity } que se le pasaría a
  // Checkout, pero como pendingBuyNow en el state de /login. Login.jsx, en
  // vez de agregarlo al carrito, navega directo a /checkout con ese producto
  // — que es "la página a la que el usuario quería ir" en este caso — sin
  // volver a pasar por el detalle del producto ni pedirle repetir el clic.
  function handleBuyNow() {
    if (!user) {
      navigate('/login', {
        state: { from: `/producto/${id}`, pendingBuyNow: { product, quantity } }
      });
      return;
    }
    navigate('/checkout', { state: { buyNow: { product, quantity } } });
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
  const onSale = product.discountPercent > 0;
  const sellingPrice = getSellingPrice(product);

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            {onSale && <span className="product-detail-discount-badge">-{product.discountPercent}% OFF</span>}
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <div className="product-detail-meta">
              <span className="badge">{product.category}</span>
              <span className="badge">{product.brand}</span>
            </div>
            <h1>{product.name}</h1>
            {onSale ? (
              <p className="product-detail-price-row">
                <span className="product-detail-price product-detail-price-sale">
                  {formatPrice(sellingPrice)}
                </span>
                <span className="product-detail-price-original">{formatPrice(product.price)}</span>
                <span className="product-detail-discount-pill">Ahorras {formatPrice(product.price - sellingPrice)}</span>
              </p>
            ) : (
              <p className="product-detail-price">{formatPrice(product.price)}</p>
            )}

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
                disabled={outOfStock}
              >
                <BoltIcon size={16} />
                Comprar ahora
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={outOfStock || adding}
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
