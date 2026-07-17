import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { getProductsRequest } from '../api/productApi';
import './ListingGrid.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProductsRequest({ limit: 500 })
      .then(({ data }) => {
        const counts = {};
        data.products.forEach((p) => {
          counts[p.category] = (counts[p.category] || 0) + 1;
        });
        setCategories(Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])));
      })
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
        ) : (
          <div className="listing-grid">
            {categories.map(([name, count]) => (
              <div
                key={name}
                className="listing-tile card"
                onClick={() => navigate(`/?category=${encodeURIComponent(name)}`)}
              >
                {name}
                <span>{count} productos</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
