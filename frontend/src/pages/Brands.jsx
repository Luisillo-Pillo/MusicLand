import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { getFiltersRequest } from '../api/productApi';
import { brandLogos } from '../config/brandLogos';
import './ListingGrid.css';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFiltersRequest()
      .then(({ data }) => setBrands(data.brands))
      .catch((err) => setError(err.response?.data?.message || 'No se pudieron cargar las marcas.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 24 }}>Marcas</h1>
        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="listing-grid">
            {brands.map(({ name, count }) => (
              <div
                key={name}
                className="listing-tile listing-tile-brand card"
                onClick={() => navigate(`/?brand=${encodeURIComponent(name)}`)}
              >
                {brandLogos[name] && (
                  // Fondo blanco fijo, sin importar el tema: los logos de marca
                  // vienen pensados para fondo claro y varios son oscuros, así
                  // que en modo oscuro se volverían invisibles sobre la tarjeta.
                  <div className="listing-tile-logo-wrap">
                    <img className="listing-tile-logo" src={brandLogos[name]} alt={`Logo de ${name}`} loading="lazy" />
                  </div>
                )}
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
