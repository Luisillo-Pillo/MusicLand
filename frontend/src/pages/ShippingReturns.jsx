import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import ReturnRequestSection from '../components/ReturnRequestSection';
import { TruckIcon, ReturnIcon, ShieldIcon } from '../components/icons';
import { hoursLine } from '../config/siteInfo';
import './ShippingReturns.css';

// Página informativa de envíos/devoluciones/garantía (contenido estático) más
// el formulario de ReturnRequestSection, para poder solicitar una devolución
// sin salir de aquí.
export default function ShippingReturns() {
  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 8 }}>Envíos y devoluciones</h1>
        <p className="sr-intro">
          Todo lo que necesitas saber sobre cómo llega tu pedido y qué hacer si algo no sale como
          esperabas. Para casos particulares, escríbenos desde{' '}
          <Link to="/contacto">Contáctanos</Link>.
        </p>

        {/* Texto informativo (izquierda) + formulario para solicitar la
            devolución (derecha, fijo al hacer scroll — ver ReturnRequestSection.css)
            en el mismo layout de dos columnas que usa Checkout. */}
        <div className="sr-layout">
          <div className="sr-sections">
            <section className="card sr-section">
              <h2>
                <TruckIcon size={20} /> Envíos
              </h2>

              <h3>Cobertura y tiempos</h3>
              <p>
                Enviamos a toda la República Mexicana. El tiempo de entrega habitual es de 3 a 7 días
                hábiles, dependiendo de tu ubicación y la disponibilidad del producto. Recibirás un
                correo de confirmación en cuanto tu pedido cambie de estatus, y puedes revisarlo en
                todo momento desde "Historial de compras".
              </p>

              <h3>Costo de envío</h3>
              <p>
                El costo se calcula según tu código postal y el peso/volumen del pedido, y se muestra
                antes de confirmar la compra en el checkout — nunca hay cargos ocultos.
              </p>

              <h3>Recolección en tienda</h3>
              <p>
                Si prefieres no esperar el envío, puedes recoger tu pedido sin costo directamente en
                nuestra tienda física. Elige esa opción al finalizar tu compra, o contáctanos para
                coordinar el horario (atendemos {hoursLine().toLowerCase()}).
              </p>
            </section>

            <section className="card sr-section">
              <h2>
                <ReturnIcon size={20} /> Devoluciones y cambios
              </h2>

              <h3>Plazo</h3>
              <p>
                Tienes <strong>15 días naturales</strong> desde que recibes tu pedido para solicitar una
                devolución o cambio, sin necesidad de justificar el motivo.
              </p>

              <h3>Condiciones</h3>
              <p>
                El producto debe estar en las mismas condiciones en que se entregó: sin uso, con su
                empaque original, accesorios y manuales incluidos. Los instrumentos con signos de uso
                más allá de una prueba razonable no califican para devolución.
              </p>

              <h3>¿Cómo solicito una devolución?</h3>
              <p>
                Usa el formulario "Solicitar una devolución" — puedes elegir el pedido completo o solo
                productos específicos y contarnos el motivo. Te confirmamos por correo el proceso de
                recolección o el punto de entrega, y una vez que revisamos el producto procesamos el
                reembolso a tu método de pago original en un plazo de 5 a 10 días hábiles.
              </p>

              <h3>Producto dañado o incompleto</h3>
              <p>
                Si tu pedido llega dañado, incompleto o con un producto distinto al que compraste,
                contáctanos dentro de las siguientes 48 horas con fotos del producto y del empaque.
                Gestionamos la reposición o el reembolso sin costo para ti.
              </p>
            </section>

            <section className="card sr-section">
              <h2>
                <ShieldIcon size={20} /> Garantía
              </h2>
              <p>
                Todos nuestros instrumentos y equipos son 100% nuevos y originales, con garantía del
                fabricante contra defectos de fabricación (generalmente de 6 a 12 meses, según la
                marca). Conserva tu comprobante de compra: es el que necesitamos para hacerla válida.
              </p>
            </section>
          </div>

          <ReturnRequestSection />
        </div>
      </div>
    </Layout>
  );
}
