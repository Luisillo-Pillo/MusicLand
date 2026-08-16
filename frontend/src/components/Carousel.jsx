import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import { formatPrice, getSellingPrice } from '../utils/format';
import './Carousel.css';

// Carrusel de ofertas en el hero del Home (los `slides` son los productos con
// descuento que devuelve getDeals en el backend). Avanza solo cada 5s y
// también se puede navegar con las flechas o los puntos.
export default function Carousel({ slides }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Cambia de diapositiva con módulo para que dé la vuelta en ambos sentidos
  // (de la última a la primera con "siguiente", de la primera a la última con "anterior").
  const goTo = useCallback(
    (i) => {
      setIndex((prev) => {
        const total = slides.length;
        return (i + total) % total;
      });
    },
    [slides.length]
  );

  // Autoplay: avanza sola cada 5s. Se desactiva con una sola diapositiva (no
  // tendría sentido animarse a sí misma) y el intervalo se reinicia cada vez
  // que cambia `index`, para que el tiempo de espera sea siempre 5s completos
  // desde la última transición (manual o automática).
  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(timer);
  }, [index, goTo, slides.length]);

  if (!slides.length) return null;

  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide) => {
          const onSale = slide.discountPercent > 0;
          return (
          <div
            key={slide._id}
            className="carousel-slide"
            onClick={() => navigate(`/producto/${slide._id}`)}
            role="button"
            tabIndex={0}
          >
            <img src={slide.image} alt={slide.name} />
            <div className="carousel-slide-overlay">
              {/* Sin ofertas activas, getDeals cae de vuelta a mostrar
                  productos recientes: en ese caso no se finge un descuento
                  que no existe, solo se omite la insignia. */}
              {onSale && <span className="badge carousel-discount-badge">-{slide.discountPercent}% OFF</span>}
              <h3>{slide.name}</h3>
              {onSale ? (
                <p className="carousel-slide-price-row">
                  <span className="carousel-slide-price-sale">{formatPrice(getSellingPrice(slide))}</span>
                  <span className="carousel-slide-price-original">{formatPrice(slide.price)}</span>
                </p>
              ) : (
                <p>{formatPrice(slide.price)}</p>
              )}
              <button
                type="button"
                className="btn btn-accent btn-sm"
                style={{ alignSelf: 'flex-start' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/producto/${slide._id}`);
                }}
              >
                Ver producto
              </button>
            </div>
          </div>
          );
        })}
      </div>

      <button className="carousel-arrow prev" onClick={() => goTo(index - 1)} aria-label="Anterior">
        <ChevronLeftIcon />
      </button>
      <button className="carousel-arrow next" onClick={() => goTo(index + 1)} aria-label="Siguiente">
        <ChevronRightIcon />
      </button>

      <div className="carousel-dots">
        {slides.map((slide, i) => (
          <button
            key={slide._id}
            className={i === index ? 'active' : ''}
            onClick={() => goTo(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
