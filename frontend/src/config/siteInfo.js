// Datos de contacto de la tienda. Punto único de verdad: el pie de página, la
// página de contacto y el mapa leen de aquí para que no vuelvan a divergir.
export const siteInfo = {
  name: 'MusicLand',

  address: {
    street: 'Calle Aldama #306',
    neighborhood: 'Rincón de Romos Centro',
    city: 'Rincón de Romos',
    state: 'Ags',
    zipCode: '20400',
    country: 'México'
  },

  // +52 449 260 9175 — 'tel' va sin espacios para el enlace tel:
  phone: '+52 449 260 9175',
  phoneTel: '+524492609175',

  email: 'musicland1305@gmail.com',

  hours: {
    label: 'Lunes a sábado',
    range: '8:00 a.m. - 8:00 p.m.'
  },

  // Coordenadas de Calle Aldama en el centro de Rincón de Romos (OpenStreetMap).
  // El número 306 no está mapeado, así que el marcador señala la calle.
  map: {
    lat: 22.2311208,
    lon: -102.3242381,
    zoomDelta: 0.004
  }
};

export function addressLine() {
  const a = siteInfo.address;
  return `${a.street}, ${a.neighborhood}, ${a.city}, ${a.state}`;
}

export function addressFull() {
  const a = siteInfo.address;
  return `${a.street}, ${a.neighborhood}, ${a.city}, ${a.state}, C.P. ${a.zipCode}, ${a.country}`;
}

export function hoursLine() {
  return `${siteInfo.hours.label} ${siteInfo.hours.range}`;
}

// Recuadro que enmarca el marcador dentro del iframe de OpenStreetMap.
export function mapEmbedUrl() {
  const { lat, lon, zoomDelta: d } = siteInfo.map;
  const bbox = [lon - d, lat - d / 2, lon + d, lat + d / 2].join('%2C');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

export function mapLinkUrl() {
  const { lat, lon } = siteInfo.map;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
}

export function directionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressFull())}`;
}
