import Header from './Header';
import Footer from './Footer';

// Envoltorio de página: Header + contenido + Footer. Casi todas las páginas
// se envuelven en este componente para no repetir el mismo armazón en cada una.
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="page">{children}</main>
      <Footer />
    </>
  );
}
