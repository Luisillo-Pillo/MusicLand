import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import ConfirmModal from '../components/ConfirmModal';
import { EditIcon, TrashIcon, PlusIcon } from '../components/icons';
import {
  getProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest
} from '../api/productApi';
import './AdminProducts.css';

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
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function loadProducts() {
    setLoading(true);
    try {
      const { data } = await getProductsRequest({ limit: 500 });
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

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
    await deleteProductRequest(deleteTarget._id);
    setDeleteTarget(null);
    await loadProducts();
  }

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="admin-header">
          <h1>Panel de administración de productos</h1>
          <button type="button" className="btn btn-primary" onClick={openCreateForm}>
            <PlusIcon size={14} /> Nuevo producto
          </button>
        </div>

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : (
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
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => openEditForm(product)}
                        >
                          <EditIcon size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(product)}
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
                  <input id="category" name="category" value={form.category} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Marca</label>
                  <input id="brand" name="brand" value={form.brand} onChange={handleChange} required />
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
