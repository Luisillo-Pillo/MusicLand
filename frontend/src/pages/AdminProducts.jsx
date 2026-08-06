import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import AdminNav from '../components/AdminNav';
import ConfirmModal from '../components/ConfirmModal';
import { EditIcon, TrashIcon, PlusIcon, SearchIcon, FilterIcon, ChevronDownIcon } from '../components/icons';
import {
  formatPrice,
  parsePriceInput,
  formatPriceInput,
  normalizePriceInput
} from '../utils/format';
import {
  getProductsRequest,
  getFiltersRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest
} from '../api/productApi';
import './AdminProducts.css';

const PAGE_SIZE = 25;

const emptyForm = {
  name: '',
  price: '',
  stock: '',
  description: '',
  category: '',
  brand: '',
  image: '',
  featured: false
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [listError, setListError] = useState('');

  // minPrice/maxPrice guardan el valor crudo ("18499.99"); en pantalla se muestran
  // formateados como $18,499.99. Todos los filtros se aplican en vivo con debounce.
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
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

  // Un rango invertido no se consulta: devolvería siempre cero y parecería un fallo.
  const invalidRange =
    minPrice !== '' && maxPrice !== '' && Number(minPrice) > Number(maxPrice);

  const loadProducts = useCallback(async () => {
    if (invalidRange) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setListError('');
    try {
      const { data } = await getProductsRequest({
        q: search.trim() || undefined,
        category: category || undefined,
        brand: brand || undefined,
        minPrice: minPrice !== '' ? minPrice : undefined,
        maxPrice: maxPrice !== '' ? maxPrice : undefined,
        page,
        limit: PAGE_SIZE
      });
      setProducts(data.products);
      setTotal(data.total);
      setPages(data.pages || 1);
    } catch (err) {
      setListError(err.response?.data?.message || 'No se pudieron cargar los productos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, brand, minPrice, maxPrice, page, invalidRange]);

  useEffect(() => {
    // Se espera un poco tras teclear para no consultar en cada letra.
    const timer = setTimeout(loadProducts, 350);
    return () => clearTimeout(timer);
  }, [loadProducts]);

  // Cualquier cambio de filtro debe devolver al usuario a la primera página:
  // si estaba en la 8 y el nuevo filtro solo tiene 2, se quedaría en blanco.
  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  function clearFilters() {
    setSearch('');
    setCategory('');
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  }

  const hasActiveFilters = !!(search || category || brand || minPrice !== '' || maxPrice !== '');

  function openCreateForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setFormOpen(true);
  }

  function openEditForm(product) {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category,
      brand: product.brand,
      image: product.image,
      featured: product.featured
    });
    setEditingId(product._id);
    setError('');
    setFormOpen(true);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      };
      if (editingId) {
        await updateProductRequest(editingId, payload);
      } else {
        await createProductRequest(payload);
      }
      setFormOpen(false);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar el producto');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setListError('');
    try {
      await deleteProductRequest(target._id);
      await loadProducts();
    } catch (err) {
      setListError(err.response?.data?.message || 'No se pudo eliminar el producto');
    }
  }

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="admin-header">
          <h1>Administración de productos</h1>
          <button type="button" className="btn btn-primary" onClick={openCreateForm}>
            <PlusIcon size={14} /> Nuevo producto
          </button>
        </div>

        <AdminNav />

        <div className="admin-products-filters">
          <div className="admin-search-box">
            <SearchIcon size={16} />
            <input
              type="text"
              placeholder="Buscar por nombre, categoría o marca..."
              value={search}
              onChange={(e) => changeFilter(setSearch, e.target.value)}
            />
          </div>

          <div className="admin-products-filter-row">
            <span className="admin-products-filter-label">
              <FilterIcon size={15} /> Filtrar por:
            </span>

            <label className={`admin-products-select ${category ? 'active' : ''}`}>
              <select value={category} onChange={(e) => changeFilter(setCategory, e.target.value)}>
                <option value="">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} />
            </label>

            <label className={`admin-products-select ${brand ? 'active' : ''}`}>
              <select value={brand} onChange={(e) => changeFilter(setBrand, e.target.value)}>
                <option value="">Todas las marcas</option>
                {brands.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.count})
                  </option>
                ))}
              </select>
              <ChevronDownIcon size={14} />
            </label>

            <div className={`admin-products-price ${minPrice !== '' || maxPrice !== '' ? 'active' : ''}`}>
              <span className="admin-products-price-label">Precio</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="$0.00"
                value={formatPriceInput(minPrice)}
                onChange={(e) => changeFilter(setMinPrice, parsePriceInput(e.target.value))}
                onBlur={() => setMinPrice((v) => normalizePriceInput(v))}
                aria-label="Precio mínimo"
              />
              <span className="admin-products-price-sep">—</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="$0.00"
                value={formatPriceInput(maxPrice)}
                onChange={(e) => changeFilter(setMaxPrice, parsePriceInput(e.target.value))}
                onBlur={() => setMaxPrice((v) => normalizePriceInput(v))}
                aria-label="Precio máximo"
              />
            </div>

            {hasActiveFilters && (
              <button type="button" className="admin-products-clear" onClick={clearFilters}>
                Quitar filtros
              </button>
            )}
          </div>

          {invalidRange ? (
            <p className="admin-products-range-warning">
              El precio mínimo ({formatPrice(minPrice)}) es mayor que el máximo (
              {formatPrice(maxPrice)}). Ajusta el rango para ver resultados.
            </p>
          ) : (
            <p className="admin-products-count">
              {loading ? 'Buscando...' : `${total} ${total === 1 ? 'producto' : 'productos'}`}
              {hasActiveFilters && !loading && ' con los filtros aplicados'}
            </p>
          )}
        </div>

        {listError && <p className="error-text" style={{ marginBottom: 16 }}>{listError}</p>}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : products.length === 0 ? (
          <p className="admin-search-empty">No se encontraron productos que coincidan con los filtros.</p>
        ) : (
          <>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img className="admin-product-thumb" src={product.image} alt={product.name} />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>{formatPrice(product.price)}</td>
                      <td className={product.stock === 0 ? 'admin-products-nostock' : ''}>{product.stock}</td>
                      <td>
                        <div className="admin-table-actions">
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => openEditForm(product)}
                            aria-label={`Editar ${product.name}`}
                          >
                            <EditIcon size={14} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => setDeleteTarget(product)}
                            aria-label={`Eliminar ${product.name}`}
                          >
                            <TrashIcon size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className="admin-pagination">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Anterior
                </button>
                <span>
                  Página {page} de {pages}
                </span>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  disabled={page >= pages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {formOpen && (
        <div className="modal-overlay" onClick={() => setFormOpen(false)}>
          <div className="modal-box admin-form-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? 'Editar producto' : 'Nuevo producto'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Precio</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Categoría</label>
                  <input
                    id="category"
                    name="category"
                    list="admin-category-options"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                  <datalist id="admin-category-options">
                    {categories.map((c) => (
                      <option key={c.name} value={c.name} />
                    ))}
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Marca</label>
                  <input
                    id="brand"
                    name="brand"
                    list="admin-brand-options"
                    value={form.brand}
                    onChange={handleChange}
                    required
                  />
                  <datalist id="admin-brand-options">
                    {brands.map((b) => (
                      <option key={b.name} value={b.name} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="image">URL de imagen</label>
                <input id="image" name="image" value={form.image} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={handleChange}
                  style={{ width: 'auto' }}
                />
                <label htmlFor="featured" style={{ margin: 0 }}>
                  Mostrar en el carrusel de destacados
                </label>
              </div>

              {error && <p className="error-text">{error}</p>}

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setFormOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar producto"
        message={`¿Seguro que deseas eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
