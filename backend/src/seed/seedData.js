function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function img(name) {
  return `https://picsum.photos/seed/${slugify(name)}/600/400`;
}

const rawProducts = [
  // Guitarras
  { name: 'Fender Player Stratocaster', price: 899.99, stock: 12, category: 'Guitarras', brand: 'Fender', featured: true, description: 'Guitarra eléctrica con cuerpo de aliso, mástil de maple y pastillas Player Series single-coil. Ideal para blues, rock y pop.' },
  { name: 'Fender Player Telecaster', price: 849.99, stock: 10, category: 'Guitarras', brand: 'Fender', description: 'El clásico sonido Telecaster con versatilidad para country, rock y jazz. Cuerpo de aliso y mástil de arce.' },
  { name: 'Gibson Les Paul Standard 60s', price: 2499.99, stock: 5, category: 'Guitarras', brand: 'Gibson', featured: true, description: 'Ícono del rock con cuerpo de caoba y tapa de arce flameado, pastillas humbucker Burstbucker.' },
  { name: 'Gibson SG Standard', price: 2199.99, stock: 4, category: 'Guitarras', brand: 'Gibson', description: 'Ligera, rápida y con un mordisco de sonido característico. Perfecta para rock y hard rock.' },
  { name: 'Ibanez RG550 Genesis', price: 799.99, stock: 8, category: 'Guitarras', brand: 'Ibanez', featured: true, description: 'Guitarra shredder con mástil delgado, tremolo Edge y pastillas de alta ganancia para metal.' },
  { name: 'Ibanez GA35TCE Clásica Electroacústica', price: 299.99, stock: 15, category: 'Guitarras', brand: 'Ibanez', description: 'Guitarra clásica de cuerdas de nylon con ecualizador integrado, ideal para estudio y principiantes.' },
  { name: 'Yamaha Pacifica 112V', price: 349.99, stock: 20, category: 'Guitarras', brand: 'Yamaha', description: 'Excelente relación calidad-precio, versátil para todo tipo de géneros musicales.' },
  { name: 'Yamaha FG800 Acústica', price: 259.99, stock: 18, category: 'Guitarras', brand: 'Yamaha', description: 'Guitarra acústica con tapa maciza de abeto, sonido cálido y proyección excepcional.' },

  // Bajos
  { name: 'Fender Player Precision Bass', price: 949.99, stock: 9, category: 'Bajos', brand: 'Fender', description: 'El bajo más icónico de la historia, con un tono profundo y contundente.' },
  { name: 'Ibanez SR300E', price: 429.99, stock: 11, category: 'Bajos', brand: 'Ibanez', description: 'Bajo de 4 cuerdas ligero y cómodo, con electrónica activa de 2 bandas.' },
  { name: 'Yamaha TRBX304', price: 379.99, stock: 14, category: 'Bajos', brand: 'Yamaha', description: 'Bajo versátil con pastillas activas/pasivas conmutables y gran sustain.' },
  { name: 'Gibson Thunderbird Bass', price: 1899.99, stock: 3, category: 'Bajos', brand: 'Gibson', description: 'Diseño icónico de los 60s con un sonido grave profundo y presencia visual única.' },

  // Baterías y Percusión
  { name: 'Pearl Export Series 5 Piezas', price: 899.99, stock: 6, category: 'Baterías y Percusión', brand: 'Pearl', description: 'Batería acústica completa con cascos de álamo, ideal para estudio y presentaciones en vivo.' },
  { name: 'Pearl Roadshow 5 Piezas', price: 649.99, stock: 7, category: 'Baterías y Percusión', brand: 'Pearl', description: 'Batería completa para principiantes, incluye platillos y herrajes.' },
  { name: 'Zildjian A Custom Crash 16"', price: 219.99, stock: 16, category: 'Baterías y Percusión', brand: 'Zildjian', featured: true, description: 'Platillo crash brillante y potente, perfecto para rock y pop moderno.' },
  { name: 'Zildjian K Ride 20"', price: 289.99, stock: 10, category: 'Baterías y Percusión', brand: 'Zildjian', description: 'Ride con tonos cálidos y complejos, hecho a mano para bateristas exigentes.' },
  { name: 'Roland TD-17KVX Batería Electrónica', price: 1699.99, stock: 4, category: 'Baterías y Percusión', brand: 'Roland', featured: true, description: 'Batería electrónica con parches de malla y módulo de sonido profesional.' },
  { name: 'Meinl Cajón Flamenco', price: 149.99, stock: 13, category: 'Baterías y Percusión', brand: 'Meinl', description: 'Cajón de percusión con cuerdas internas ajustables para un sonido tipo snare.' },

  // Teclados y Pianos
  { name: 'Yamaha P-125 Piano Digital', price: 649.99, stock: 9, category: 'Teclados y Pianos', brand: 'Yamaha', featured: true, description: 'Piano digital portátil de 88 teclas con acción contrapesada y sonidos de piano de concierto.' },
  { name: 'Yamaha PSR-E373 Teclado Arreglador', price: 249.99, stock: 17, category: 'Teclados y Pianos', brand: 'Yamaha', description: 'Teclado de 61 teclas con cientos de voces y ritmos, ideal para aprender.' },
  { name: 'Roland FP-30X Piano Digital', price: 799.99, stock: 8, category: 'Teclados y Pianos', brand: 'Roland', featured: true, description: 'Piano digital compacto con motor de sonido SuperNATURAL y altavoces integrados.' },
  { name: 'Roland Juno-DS61 Sintetizador', price: 999.99, stock: 5, category: 'Teclados y Pianos', brand: 'Roland', description: 'Sintetizador de 61 teclas con miles de sonidos y capacidades de sampling.' },
  { name: 'Casio CT-X700 Teclado', price: 299.99, stock: 15, category: 'Teclados y Pianos', brand: 'Casio', description: 'Teclado con procesador de sonido AiX, gran variedad de tonos y acompañamientos.' },
  { name: 'Casio Privia PX-160 Piano Digital', price: 749.99, stock: 7, category: 'Teclados y Pianos', brand: 'Casio', description: 'Piano digital con tecnología de sonido Tri-Sensor Scaled Hammer Action.' },

  // Instrumentos de Viento
  { name: 'Yamaha YTR-2330 Trompeta', price: 649.99, stock: 6, category: 'Instrumentos de Viento', brand: 'Yamaha', description: 'Trompeta estudiante en Sib con acabado lacado y válvulas de precisión.' },
  { name: 'Yamaha YAS-280 Saxofón Alto', price: 1199.99, stock: 5, category: 'Instrumentos de Viento', brand: 'Yamaha', description: 'Saxofón alto para estudiantes con mecanismo ajustado a fábrica y sonido cálido.' },
  { name: 'Yamaha YCL-255 Clarinete', price: 599.99, stock: 7, category: 'Instrumentos de Viento', brand: 'Yamaha', description: 'Clarinete de resina ABS resistente, ideal para estudiantes de nivel intermedio.' },
  { name: 'Jupiter JFL-700 Flauta Transversal', price: 499.99, stock: 8, category: 'Instrumentos de Viento', brand: 'Jupiter', description: 'Flauta transversal en Do con llaves plateadas y mecanismo offset G.' },
  { name: 'Conn-Selmer Trombón Estudiante', price: 549.99, stock: 6, category: 'Instrumentos de Viento', brand: 'Conn-Selmer', description: 'Trombón tenor con vara ligera y sonido proyectado, perfecto para bandas escolares.' },

  // Micrófonos y Audio
  { name: 'Shure SM58', price: 99.99, stock: 30, category: 'Micrófonos y Audio', brand: 'Shure', featured: true, description: 'El micrófono vocal más utilizado en el mundo, robusto y con sonido cálido para directo.' },
  { name: 'Shure SM57', price: 99.99, stock: 28, category: 'Micrófonos y Audio', brand: 'Shure', description: 'Micrófono instrumental versátil, ideal para amplificadores y cajas de batería.' },
  { name: 'Shure SM7B', price: 399.99, stock: 10, category: 'Micrófonos y Audio', brand: 'Shure', description: 'Micrófono de estudio profesional para voces, podcasts y streaming.' },
  { name: 'Shure PGA58', price: 59.99, stock: 22, category: 'Micrófonos y Audio', brand: 'Shure', description: 'Micrófono vocal dinámico de entrada, con patrón cardioide y buen rechazo de ruido.' },
  { name: 'Audio-Technica AT2020', price: 149.99, stock: 16, category: 'Micrófonos y Audio', brand: 'Audio-Technica', description: 'Micrófono de condensador de estudio con captación de detalle excepcional.' },
  { name: 'Audio-Technica ATH-M50x', price: 169.99, stock: 20, category: 'Micrófonos y Audio', brand: 'Audio-Technica', description: 'Audífonos de estudio circumaurales con sonido crítico y aislamiento acústico.' },
  { name: 'Rode NT1', price: 269.99, stock: 9, category: 'Micrófonos y Audio', brand: 'Rode', description: 'Micrófono de condensador de bajísimo ruido propio, ideal para grabación vocal.' },
  { name: 'Behringer Xenyx Q802USB', price: 129.99, stock: 12, category: 'Micrófonos y Audio', brand: 'Behringer', description: 'Mezcladora compacta de 8 canales con interfaz USB y preamplificadores de micrófono XENYX.' },

  // Equipos DJ y Producción
  { name: 'Pioneer DJ DDJ-400', price: 349.99, stock: 10, category: 'Equipos DJ y Producción', brand: 'Pioneer DJ', description: 'Controlador DJ de 2 canales para principiantes, compatible con rekordbox DJ.' },
  { name: 'Pioneer DJ XDJ-RX3', price: 1999.99, stock: 3, category: 'Equipos DJ y Producción', brand: 'Pioneer DJ', featured: true, description: 'Sistema todo en uno de última generación para DJs profesionales.' },
  { name: 'Numark Mixtrack Pro FX', price: 199.99, stock: 14, category: 'Equipos DJ y Producción', brand: 'Numark', description: 'Controlador DJ con efectos integrados y jog wheels de alta resolución.' },
  { name: 'Roland SP-404MKII', price: 499.99, stock: 7, category: 'Equipos DJ y Producción', brand: 'Roland', description: 'Sampler de producción compacto con efectos en tiempo real, favorito de productores de beats.' },
  { name: 'Boss RC-505mkII Loop Station', price: 599.99, stock: 6, category: 'Equipos DJ y Producción', brand: 'Boss', featured: true, description: 'Estación de looping de 5 pistas para presentaciones en vivo y producción.' },

  // Accesorios
  { name: 'Fender Correa de Guitarra Original', price: 29.99, stock: 40, category: 'Accesorios', brand: 'Fender', description: 'Correa de poliéster tejido con el logo clásico de Fender, ajustable.' },
  { name: 'Dunlop Cuerdas Guitarra Eléctrica 09-42', price: 12.99, stock: 60, category: 'Accesorios', brand: 'Dunlop', description: 'Juego de cuerdas niqueladas de calibre ligero para guitarra eléctrica.' },
  { name: 'Boss TU-3 Afinador Cromático', price: 79.99, stock: 25, category: 'Accesorios', brand: 'Boss', description: 'Afinador de pedal estándar de la industria, con pantalla de alta visibilidad.' },
  { name: 'Boss DS-1 Pedal de Distorsión', price: 59.99, stock: 22, category: 'Accesorios', brand: 'Boss', description: 'El pedal de distorsión más icónico, usado por generaciones de guitarristas.' },
  { name: 'Yamaha Funda Acolchada para Guitarra Acústica', price: 49.99, stock: 30, category: 'Accesorios', brand: 'Yamaha', description: 'Funda acolchada con correas ajustables y bolsillo frontal para accesorios.' },
  { name: 'On-Stage Atril para Partituras', price: 34.99, stock: 18, category: 'Accesorios', brand: 'On-Stage', description: 'Atril plegable de altura ajustable, ligero y fácil de transportar.' },
  { name: 'Hercules Soporte de Guitarra', price: 39.99, stock: 20, category: 'Accesorios', brand: 'Hercules', description: 'Soporte de piso con brazos auto-ajustables que se adaptan al mástil.' }
];

const products = rawProducts.map((p) => ({ ...p, image: img(p.name) }));

module.exports = products;
