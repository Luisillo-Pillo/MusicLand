import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { ChevronDownIcon } from '../components/icons';
import { siteInfo } from '../config/siteInfo';
import './FAQ.css';

// Agrupadas por tema para que la página no se sienta como una lista plana de
// 15 preguntas sueltas.
const FAQ_GROUPS = [
  {
    title: 'Pedidos y pagos',
    items: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express. El pago se procesa de forma segura al finalizar tu compra en el checkout.'
      },
      {
        q: '¿Puedo modificar o cancelar mi pedido después de comprarlo?',
        a: 'Sí, mientras el pedido esté en estatus "Pendiente" o "Procesando" puedes cancelarlo tú mismo desde "Historial de compras". Una vez que sale a reparto, contáctanos y evaluamos el caso.'
      },
      {
        q: '¿Cómo sé en qué estatus va mi pedido?',
        a: 'En "Historial de compras" (dentro de tu cuenta) puedes ver el estatus actualizado de cada pedido: pendiente, procesando, enviado, entregado o cancelado.'
      },
      {
        q: '¿Emiten factura?',
        a: 'Sí. Escríbenos a través de la página de Contacto con tu número de pedido y tus datos fiscales y te la enviamos por correo.'
      }
    ]
  },
  {
    title: 'Envíos',
    items: [
      {
        q: '¿A qué zonas envían?',
        a: 'Enviamos a todo México. Los tiempos y costos exactos varían según tu ubicación; puedes ver el detalle completo en la página de Envíos y devoluciones.'
      },
      {
        q: '¿Cuánto tarda en llegar mi pedido?',
        a: 'En general de 3 a 7 días hábiles dentro de la República Mexicana, dependiendo de tu ubicación y la disponibilidad del producto.'
      },
      {
        q: '¿Puedo recoger mi pedido en tienda?',
        a: `Sí. Puedes recoger sin costo en nuestra sucursal de ${siteInfo.address.city}, ${siteInfo.address.state}. Selecciona esa opción al finalizar tu compra o contáctanos para coordinarlo.`
      }
    ]
  },
  {
    title: 'Devoluciones y garantía',
    items: [
      {
        q: '¿Puedo devolver un producto si no me convence?',
        a: 'Sí, cuentas con 15 días naturales desde que lo recibes para solicitar una devolución, siempre que el producto esté en las mismas condiciones en que se entregó. El detalle completo del proceso está en Envíos y devoluciones.'
      },
      {
        q: '¿Los instrumentos tienen garantía?',
        a: 'Todos nuestros productos cuentan con garantía del fabricante contra defectos de fabricación (normalmente de 6 a 12 meses según la marca). Guarda tu comprobante de compra para hacerla válida.'
      },
      {
        q: '¿Qué hago si mi producto llegó dañado o incompleto?',
        a: 'Contáctanos dentro de las siguientes 48 horas de recibido, con fotos del producto y del empaque, y gestionamos la reposición o el reembolso sin costo para ti.'
      }
    ]
  },
  {
    title: 'Productos y stock',
    items: [
      {
        q: '¿Los instrumentos son nuevos?',
        a: 'Sí, todo nuestro catálogo son productos 100% nuevos y originales, con garantía de fábrica.'
      },
      {
        q: 'Un producto que quiero aparece sin stock, ¿qué hago?',
        a: 'Contáctanos y con gusto te avisamos en cuanto vuelva a estar disponible, o te sugerimos una alternativa similar.'
      }
    ]
  }
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button type="button" className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        {q}
        <ChevronDownIcon size={18} className="faq-chevron" />
      </button>
      {isOpen && <p className="faq-answer">{a}</p>}
    </div>
  );
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState('0-0');

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 8 }}>Preguntas frecuentes</h1>
        <p className="faq-intro">
          Resolvemos las dudas más comunes sobre pedidos, envíos, devoluciones y garantía. Si no
          encuentras lo que buscas, <Link to="/contacto">contáctanos</Link> directamente.
        </p>

        <div className="faq-groups">
          {FAQ_GROUPS.map((group, gi) => (
            <section className="faq-group" key={group.title}>
              <h2 className="faq-group-title">{group.title}</h2>
              <div className="card faq-list">
                {group.items.map((item, ii) => {
                  const key = `${gi}-${ii}`;
                  return (
                    <FAQItem
                      key={key}
                      q={item.q}
                      a={item.a}
                      isOpen={openKey === key}
                      onToggle={() => setOpenKey(openKey === key ? null : key)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
