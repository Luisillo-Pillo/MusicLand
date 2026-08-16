import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { EmptyBoxIcon } from '../components/icons';

// Página 404: se muestra para cualquier ruta que no coincida con ninguna
// definida en App.jsx (la <Route path="*"> al final de <Routes>).
//
// Antes era solo "404 / La página que buscas no existe.". Se amplió siguiendo
// la convención de los 404 de tiendas en línea (Amazon, MercadoLibre, etc.):
// un tono de disculpa breve en vez de un código de error seco, y — lo más
// importante — no dejar al usuario en un callejón sin salida: se le ofrecen
// dos caminos concretos para seguir comprando (inicio y categorías) además
// del botón de "volver" de siempre.
export default function NotFound() {
  return (
    <Layout>
      <BackButton />
      <div className="container empty-state">
        <EmptyBoxIcon size={72} />
        <h1 style={{ marginBottom: 0 }}>No encontramos esta página</h1>
        <p style={{ maxWidth: 420, textAlign: 'center' }}>
          Puede que el enlace esté roto o que la página ya no exista. Prueba desde el inicio o
          revisa nuestras categorías para seguir buscando.
        </p>
        <div className="profile-actions">
          <Link to="/" className="btn btn-primary">
            Ir al inicio
          </Link>
          <Link to="/categorias" className="btn btn-outline">
            Ver categorías
          </Link>
        </div>
      </div>
    </Layout>
  );
}
