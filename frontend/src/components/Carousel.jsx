import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import './Carousel.css';

export default function Carousel({ slides }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const goTo = useCallback(
    (i) => {
      setIndex((prev) => {
        const total = slides.length;
        return (i + total) % total;
      });
    },
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(timer);
  }, [index, goTo, slides.length]);

  if (!slides.length) return null;

  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="carousel-slide"
            onClick={() => navigate(`/producto/${slide._id}`)}
            role="button"
            tabIndex={0}
          >
            <img src={slide.image} alt={slide.name} />
            <div className="carousel-slide-overlay">
              <span className="badge">Destacado</span>
              <h3>{slide.name}</h3>
              <p>${slide.price.toFixed(2)}</p>
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
        ))}
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
