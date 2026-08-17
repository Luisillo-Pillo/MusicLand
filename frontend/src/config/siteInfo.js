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

  // Nivel de acercamiento del mapa embebido (17 = a nivel de calle, se ve la
  // cuadra completa). No hacen falta coordenadas: el mapa busca la dirección
  // completa de arriba directamente en Google Maps (ver mapEmbedUrl más abajo).
  map: {
    zoom: 17
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

// Mapa de Google Maps embebido SIN API key: es el mismo truco que usan la
// mayoría de los sitios pequeños (parámetro `output=embed` sobre la URL
// normal de búsqueda de Google Maps). No es una API oficialmente documentada
// por Google, pero es estable en la práctica y evita tener que dar de alta
// un proyecto en Google Cloud con tarjeta vinculada solo para mostrar un
// mapa. Si más adelante se prefiere la Maps Embed API oficial (requiere API
// key), solo hay que cambiar esta función: el resto del sitio no sabe ni le
// importa qué proveedor de mapas hay detrás.
export function mapEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(addressFull())}&z=${siteInfo.map.zoom}&output=embed`;
}

// "Ver mapa más grande": misma búsqueda, pero en la Google Maps normal en
// una pestaña aparte (esta sí es una URL pública y estable de Google).
export function mapLinkUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressFull())}`;
}

export function directionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressFull())}`;
}
