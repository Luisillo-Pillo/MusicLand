import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';

export default function NotFound() {
  return (
    <Layout>
      <BackButton />
      <div className="container empty-state">
        <h1>404</h1>
        <p>La página que buscas no existe.</p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
}
