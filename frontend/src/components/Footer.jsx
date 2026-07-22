import { Link } from 'react-router-dom';
import { LogoIcon, MailIcon, PhoneIcon, LocationIcon, FacebookIcon, InstagramIcon, TwitterIcon } from './icons';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <LogoIcon />
              MusicLand
            </div>
            <p>
              Tu tienda de confianza en instrumentos musicales, audio profesional y equipos para
              DJ. Calidad y pasión por la música desde siempre.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href="#" aria-label="Instagram">
                <InstagramIcon size={16} />
              </a>
              <a href="#" aria-label="Twitter">
                <TwitterIcon size={16} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Enlaces</h4>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/categorias">Categorías</Link>
              </li>
              <li>
                <Link to="/marcas">Marcas</Link>
              </li>
              <li>
                <Link to="/contacto">Contáctanos</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Ayuda</h4>
            <ul>
              <li>
                <Link to="/perfil">Mi cuenta</Link>
              </li>
              <li>
                <Link to="/carrito">Mi carrito</Link>
              </li>
              <li>
                <Link to="/contacto">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link to="/contacto">Envíos y devoluciones</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <div className="footer-contact-item">
              <LocationIcon size={16} />
              Av. de la Música 123, Ciudad de México
            </div>
            <div className="footer-contact-item">
              <PhoneIcon size={16} />
              +52 55 1234 5678
            </div>
            <div className="footer-contact-item">
              <MailIcon size={16} />
              contacto@musicland.com
            </div>
          </div>
        </div>

        <div className="footer-bottom"  style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
          <span>© {year} MusicLand. Todos los derechos reservados.</span>
          {/* <span>Hecho con dedicación para amantes de la música.</span>   */}
        </div>
      </div>
    </footer>
  );
}
