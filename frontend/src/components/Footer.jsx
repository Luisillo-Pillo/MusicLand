import { Link } from 'react-router-dom';
import {
  LogoIcon,
  MailIcon,
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon
} from './icons';
import { siteInfo, addressLine, hoursLine } from '../config/siteInfo';
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
                <Link to="/preguntas-frecuentes">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link to="/envios-y-devoluciones">Envíos y devoluciones</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <div className="footer-contact-item">
              <LocationIcon size={16} />
              <span>
                {addressLine()}
                <br />
                C.P. {siteInfo.address.zipCode}
              </span>
            </div>
            <div className="footer-contact-item">
              <PhoneIcon size={16} />
              <a href={`tel:${siteInfo.phoneTel}`}>{siteInfo.phone}</a>
            </div>
            <div className="footer-contact-item">
              <MailIcon size={16} />
              <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
            </div>
            <div className="footer-contact-item">
              <ClockIcon size={16} />
              <span>{hoursLine()}</span>
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
