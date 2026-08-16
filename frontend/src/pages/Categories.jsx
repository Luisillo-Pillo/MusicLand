import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { getFiltersRequest } from '../api/productApi';
import './ListingGrid.css';

// Listado de categorías con su conteo de productos; cada tarjeta navega al
// Home ya filtrado por esa categoría.
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFiltersRequest()
      .then(({ data }) => setCategories(data.categories))
      .catch((err) => setError(err.response?.data?.message || 'No se pudieron cargar las categorías.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 24 }}>Categorías</h1>
        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="listing-grid">
            {categories.map(({ name, count }) => (
              <div
                key={name}
                className="listing-tile card"
                onClick={() => navigate(`/?category=${encodeURIComponent(name)}`)}
              >
                {name}
                <span>
                  {count} {count === 1 ? 'producto' : 'productos'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
