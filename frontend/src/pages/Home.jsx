import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { getProductsRequest, getFeaturedProductsRequest, getFiltersRequest } from '../api/productApi';
import { FilterIcon, ChevronDownIcon } from '../components/icons';
import './Home.css';

const PAGE_SIZE = 12;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const sort = searchParams.get('sort') || '';

  const [featured, setFeatured] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getFeaturedProductsRequest()
      .then(({ data }) => setFeatured(data))
      .catch(() => setFeatured([]));
    getFiltersRequest()
      .then(({ data }) => {
        setCategories(data.categories);
        setBrands(data.brands);
      })
      .catch(() => {
        setCategories([]);
        setBrands([]);
      });
  }, []);

  // Al cambiar los filtros se vuelve a la primera página y se reemplaza el listado.
  useEffect(() => {
    setLoading(true);
    setError('');
    setPage(1);
    getProductsRequest({ search, category, brand, sort, page: 1, limit: PAGE_SIZE })
      .then(({ data }) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch((err) => {
        setProducts([]);
        setTotal(0);
        setError(err.response?.data?.message || 'No se pudieron cargar los productos. Intenta de nuevo.');
      })
      .finally(() => setLoading(false));
  }, [search, category, brand, sort]);

  // "Ver más" pide la siguiente página al servidor y la añade: cargar el catálogo
  // completo de una vez dejaría fuera todo lo que exceda el límite de la API.
  async function loadMore() {
    const next = page + 1;
    setLoadingMore(true);
    setError('');
    try {
      const { data } = await getProductsRequest({
        search,
        category,
        brand,
        sort,
        page: next,
        limit: PAGE_SIZE
      });
      setProducts((prev) => [...prev, ...data.products]);
      setTotal(data.total);
      setPage(next);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudieron cargar más productos.');
    } finally {
      setLoadingMore(false);
    }
  }

  const hasMore = products.length < total;
  const hasActiveFilters = !!(search || category || brand || sort);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams({});
  }

  return (
    <Layout>
      <div className="container">
        {!hasActiveFilters && (
          <section className="home-hero">
            <Carousel slides={featured} />
          </section>
        )}

        <section>
          <div className="home-section-title">
            <h2>{search ? `Resultados para "${search}"` : 'Nuestros productos'}</h2>
            <span>{total} productos disponibles</span>
          </div>

          <div className="home-filters">
            <span className="home-filters-label">
              <FilterIcon size={15} />
              Filtrar por:
            </span>

            <label className={`home-filter-select ${category ? 'active' : ''}`}>
              <select value={category} onChange={(e) => updateFilter('category', e.target.value)}>
                <option value="">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} className="home-filter-chevron" />
            </label>

            <label className={`home-filter-select ${brand ? 'active' : ''}`}>
              <select value={brand} onChange={(e) => updateFilter('brand', e.target.value)}>
                <option value="">Todas las marcas</option>
                {brands.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.count})
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} className="home-filter-chevron" />
            </label>

            <label className={`home-filter-select ${sort ? 'active' : ''}`}>
              <select value={sort} onChange={(e) => updateFilter('sort', e.target.value)}>
                <option value="">Más recientes</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="name_asc">Nombre: A-Z</option>
                <option value="name_desc">Nombre: Z-A</option>
              </select>
              <ChevronDownIcon size={14} className="home-filter-chevron" />
            </label>

            {hasActiveFilters && (
              <button type="button" className="home-filters-clear" onClick={clearFilters}>
                Quitar filtros
              </button>
            )}
          </div>

          {loading ? (
            <div className="spinner-wrapper">
              <div className="spinner" />
            </div>
          ) : error ? (
            <div className="empty-state">
              <p className="error-text">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>No encontramos productos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {hasMore && (
                <div className="home-load-more">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={loadingMore}
                    onClick={loadMore}
                  >
                    {loadingMore ? 'Cargando...' : `Ver más productos (${total - products.length})`}
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
