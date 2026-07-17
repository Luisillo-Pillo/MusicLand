import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { getProductsRequest, getFeaturedProductsRequest } from '../api/productApi';
import './Home.css';

const PAGE_SIZE = 12;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';

  const [featured, setFeatured] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    getFeaturedProductsRequest().then(({ data }) => setFeatured(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    setVisibleCount(PAGE_SIZE);
    getProductsRequest({ search, category, brand, limit: 200 })
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [search, category, brand]);

  const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
  const hasMore = visibleCount < products.length;

  function clearFilters() {
    setSearchParams({});
  }

  const activeFilterLabel = search
    ? `Resultados para "${search}"`
    : category
    ? `Categoría: ${category}`
    : brand
    ? `Marca: ${brand}`
    : null;

  return (
    <Layout>
      <div className="container">
        {!activeFilterLabel && (
          <section className="home-hero">
            <Carousel slides={featured} />
          </section>
        )}

        <section>
          <div className="home-section-title">
            <h2>{activeFilterLabel || 'Nuestros productos'}</h2>
            {activeFilterLabel ? (
              <button type="button" className="btn btn-ghost btn-sm" onClick={clearFilters}>
                Quitar filtro
              </button>
            ) : (
              <span>{products.length} productos disponibles</span>
            )}
          </div>

          {loading ? (
            <div className="spinner-wrapper">
              <div className="spinner" />
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>No encontramos productos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {hasMore && (
                <div className="home-load-more">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  >
                    Ver más productos
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}
