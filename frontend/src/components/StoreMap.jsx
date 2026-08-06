import { LocationIcon } from './icons';
import { siteInfo, addressFull, mapEmbedUrl, mapLinkUrl, directionsUrl } from '../config/siteInfo';
import './StoreMap.css';

export default function StoreMap({ title = 'Dónde estamos' }) {
  return (
    <div className="store-map card">
      <div className="store-map-head">
        <h3>
          <LocationIcon size={17} /> {title}
        </h3>
        <p>{addressFull()}</p>
      </div>

      <div className="store-map-frame">
        <iframe
          title={`Mapa de ${siteInfo.name} en ${siteInfo.address.city}`}
          src={mapEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="store-map-actions">
        <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
          Cómo llegar
        </a>
        <a href={mapLinkUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
          Ver mapa más grande
        </a>
      </div>
    </div>
  );
}
