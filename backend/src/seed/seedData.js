const products = [
  {
    "name": "Guitarra Electrica Fender Stratocaster",
    "price": 18500,
    "category": "Guitarras",
    "brand": "Fender",
    "description": "Guitarra eléctrica icónica con cuerpo de aliso, mástil de maple y 3 pastillas single-coil, ideal para blues, rock y pop.",
    "image": "https://picsum.photos/seed/guitarra-electrica-fender-stratocaster/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Guitarra Electrica Fender Telecaster",
    "price": 17800,
    "category": "Guitarras",
    "brand": "Fender",
    "description": "Guitarra eléctrica de cuerpo sólido con sonido brillante y definido, perfecta para country, rock y funk.",
    "image": "https://picsum.photos/seed/guitarra-electrica-fender-telecaster/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Gibson Les Paul Standard",
    "price": 39900,
    "category": "Guitarras",
    "brand": "Gibson",
    "description": "Guitarra eléctrica con cuerpo de caoba y tapa de arce, pastillas humbucker de alta ganancia para tonos cálidos y potentes.",
    "image": "https://picsum.photos/seed/guitarra-electrica-gibson-les-paul-standard/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Gibson SG Standard",
    "price": 32500,
    "category": "Guitarras",
    "brand": "Gibson",
    "description": "Guitarra eléctrica ligera con doble cutaway, ideal para rock clásico y hard rock por su sustain prolongado.",
    "image": "https://picsum.photos/seed/guitarra-electrica-gibson-sg-standard/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Epiphone Les Paul Special",
    "price": 8900,
    "category": "Guitarras",
    "brand": "Epiphone",
    "description": "Versión accesible del clásico Les Paul, con pastillas humbucker y gran versatilidad tonal.",
    "image": "https://picsum.photos/seed/guitarra-electrica-epiphone-les-paul-special/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Squier Affinity Stratocaster",
    "price": 5400,
    "category": "Guitarras",
    "brand": "Squier",
    "description": "Guitarra eléctrica ideal para principiantes, con el sonido clásico Stratocaster a precio accesible.",
    "image": "https://picsum.photos/seed/guitarra-electrica-squier-affinity-stratocaster/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Ibanez RG550",
    "price": 22900,
    "category": "Guitarras",
    "brand": "Ibanez",
    "description": "Guitarra eléctrica de alto rendimiento para metal y rock, con mástil delgado y trémolo Edge.",
    "image": "https://picsum.photos/seed/guitarra-electrica-ibanez-rg550/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Ibanez GRX70QA",
    "price": 6800,
    "category": "Guitarras",
    "brand": "Ibanez",
    "description": "Guitarra eléctrica con tapa de arce flameado, ideal para principiantes y estilos modernos.",
    "image": "https://picsum.photos/seed/guitarra-electrica-ibanez-grx70qa/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Electrica PRS SE Custom 24",
    "price": 21500,
    "category": "Guitarras",
    "brand": "PRS",
    "description": "Guitarra eléctrica versátil con pastillas humbucker y mástil delgado, apta para múltiples géneros.",
    "image": "https://picsum.photos/seed/guitarra-electrica-prs-se-custom-24/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Acustica Yamaha FG800",
    "price": 5200,
    "category": "Guitarras",
    "brand": "Yamaha",
    "description": "Guitarra acústica de tapa maciza de abeto, ideal para principiantes y estudiantes por su gran proyección.",
    "image": "https://picsum.photos/seed/guitarra-acustica-yamaha-fg800/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Acustica Taylor 114ce",
    "price": 24900,
    "category": "Guitarras",
    "brand": "Taylor",
    "description": "Guitarra electroacústica con tapa maciza de abeto Sitka y ecualizador integrado, sonido brillante y balanceado.",
    "image": "https://picsum.photos/seed/guitarra-acustica-taylor-114ce/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Guitarra Acustica Martin D-28",
    "price": 39500,
    "category": "Guitarras",
    "brand": "Martin",
    "description": "Guitarra acústica dreadnought de referencia mundial, tapa de abeto y aros de palorosa, sonido profundo y potente.",
    "image": "https://picsum.photos/seed/guitarra-acustica-martin-d-28/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Acustica Yamaha FS830",
    "price": 6500,
    "category": "Guitarras",
    "brand": "Yamaha",
    "description": "Guitarra acústica de cuerpo concierto con tapa maciza, ideal para tocar sentado y fingerpicking.",
    "image": "https://picsum.photos/seed/guitarra-acustica-yamaha-fs830/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Electroacustica Ibanez AEG50",
    "price": 8200,
    "category": "Guitarras",
    "brand": "Ibanez",
    "description": "Guitarra electroacústica con cutaway y preamplificador integrado, ideal para presentaciones en vivo.",
    "image": "https://picsum.photos/seed/guitarra-electroacustica-ibanez-aeg50/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Clasica Yamaha C40",
    "price": 2900,
    "category": "Guitarras",
    "brand": "Yamaha",
    "description": "Guitarra clásica de cuerdas de nylon, perfecta para principiantes y estudiantes de música.",
    "image": "https://picsum.photos/seed/guitarra-clasica-yamaha-c40/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Clasica Cordoba C5",
    "price": 6900,
    "category": "Guitarras",
    "brand": "Cordoba",
    "description": "Guitarra clásica con tapa maciza de cedro, sonido cálido tradicional español.",
    "image": "https://picsum.photos/seed/guitarra-clasica-cordoba-c5/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Squier Bullet Stratocaster HSS",
    "price": 4200,
    "category": "Guitarras",
    "brand": "Squier",
    "description": "Guitarra eléctrica económica con configuración HSS, ideal para iniciarse en el rock y metal.",
    "image": "https://picsum.photos/seed/guitarra-electrica-squier-bullet-stratocaster-hss/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Jackson JS22 Dinky",
    "price": 7900,
    "category": "Guitarras",
    "brand": "Jackson",
    "description": "Guitarra eléctrica con mástil delgado y humbuckers de alta salida, pensada para metal y shred.",
    "image": "https://picsum.photos/seed/guitarra-electrica-jackson-js22-dinky/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Electrica ESP LTD EC-256",
    "price": 11500,
    "category": "Guitarras",
    "brand": "ESP LTD",
    "description": "Guitarra eléctrica de cuerpo tipo single-cut con pastillas humbucker, ideal para rock y metal moderno.",
    "image": "https://picsum.photos/seed/guitarra-electrica-esp-ltd-ec-256/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Bajo Acustica Ortega D1-5",
    "price": 4600,
    "category": "Guitarras",
    "brand": "Ortega",
    "description": "Guitarra bajo acústica de 5 cuerdas con tapa de abeto, ideal para práctica sin amplificación.",
    "image": "https://picsum.photos/seed/guitarra-bajo-acustica-ortega-d1-5/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bajo Electrico Fender Precision Bass",
    "price": 21500,
    "category": "Bajos",
    "brand": "Fender",
    "description": "Bajo eléctrico de 4 cuerdas con pastilla split-coil, sonido grueso y punchy ideal para rock y funk.",
    "image": "https://picsum.photos/seed/bajo-electrico-fender-precision-bass/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Bajo Electrico Fender Jazz Bass",
    "price": 22900,
    "category": "Bajos",
    "brand": "Fender",
    "description": "Bajo eléctrico con dos pastillas single-coil, versátil y brillante para jazz, funk y pop.",
    "image": "https://picsum.photos/seed/bajo-electrico-fender-jazz-bass/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Bajo Electrico Squier Affinity Jazz Bass",
    "price": 6900,
    "category": "Bajos",
    "brand": "Squier",
    "description": "Bajo eléctrico accesible con el clásico tono Jazz Bass, ideal para principiantes.",
    "image": "https://picsum.photos/seed/bajo-electrico-squier-affinity-jazz-bass/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Bajo Electrico Ibanez GSR200",
    "price": 7200,
    "category": "Bajos",
    "brand": "Ibanez",
    "description": "Bajo eléctrico de 4 cuerdas con mástil delgado, perfecto para estudiantes y bajistas en crecimiento.",
    "image": "https://picsum.photos/seed/bajo-electrico-ibanez-gsr200/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bajo Electrico Yamaha TRBX304",
    "price": 9800,
    "category": "Bajos",
    "brand": "Yamaha",
    "description": "Bajo eléctrico de 4 cuerdas con electrónica activa/pasiva y gran definición tonal.",
    "image": "https://picsum.photos/seed/bajo-electrico-yamaha-trbx304/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Bajo Electrico Music Man StingRay",
    "price": 34900,
    "category": "Bajos",
    "brand": "Music Man",
    "description": "Bajo eléctrico icónico con pastilla humbucker activa, sonido potente y definido usado en funk y rock.",
    "image": "https://picsum.photos/seed/bajo-electrico-music-man-stingray/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Bajo Electrico 5 Cuerdas Ibanez SR305E",
    "price": 12900,
    "category": "Bajos",
    "brand": "Ibanez",
    "description": "Bajo eléctrico de 5 cuerdas con electrónica activa, ideal para estilos modernos que requieren mayor rango.",
    "image": "https://picsum.photos/seed/bajo-electrico-5-cuerdas-ibanez-sr305e/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Bajo Electrico Epiphone Thunderbird",
    "price": 13500,
    "category": "Bajos",
    "brand": "Epiphone",
    "description": "Bajo eléctrico de cuerpo explorer con pastillas humbucker, sonido profundo característico del rock clásico.",
    "image": "https://picsum.photos/seed/bajo-electrico-epiphone-thunderbird/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bajo Acustico Fender CB-60SCE",
    "price": 8900,
    "category": "Bajos",
    "brand": "Fender",
    "description": "Bajo acústico con cutaway y preamplificador, ideal para grabaciones y presentaciones acústicas.",
    "image": "https://picsum.photos/seed/bajo-acustico-fender-cb-60sce/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Bajo Electrico Sterling by Music Man StingRay Ray34",
    "price": 15900,
    "category": "Bajos",
    "brand": "Sterling by Music Man",
    "description": "Versión accesible del icónico StingRay con pastilla humbucker activa y gran versatilidad tonal.",
    "image": "https://picsum.photos/seed/bajo-electrico-sterling-by-music-man-stingray-ray34/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Bateria Acustica Pearl Export EXX",
    "price": 18900,
    "category": "Percusión",
    "brand": "Pearl",
    "description": "Set de batería completo de 5 piezas con cascos de álamo, ideal para estudio y presentaciones en vivo.",
    "image": "https://picsum.photos/seed/bateria-acustica-pearl-export-exx/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Bateria Electronica Roland TD-1DMK",
    "price": 15900,
    "category": "Percusión",
    "brand": "Roland",
    "description": "Batería electrónica con parches de malla silenciosos, ideal para práctica en espacios reducidos.",
    "image": "https://picsum.photos/seed/bateria-electronica-roland-td-1dmk/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bateria Acustica Yamaha Stage Custom",
    "price": 22900,
    "category": "Percusión",
    "brand": "Yamaha",
    "description": "Set de batería de 5 piezas con cascos de arce, sonido cálido y proyección profesional.",
    "image": "https://picsum.photos/seed/bateria-acustica-yamaha-stage-custom/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Platillo Zildjian A Custom Crash 16",
    "price": 4200,
    "category": "Percusión",
    "brand": "Zildjian",
    "description": "Platillo crash de 16 pulgadas con brillo y ataque rápido, ideal para rock y pop.",
    "image": "https://picsum.photos/seed/platillo-zildjian-a-custom-crash-16/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Platillo Zildjian A Zildjian Ride 20",
    "price": 6800,
    "category": "Percusión",
    "brand": "Zildjian",
    "description": "Platillo ride de 20 pulgadas con sonido definido y campana clara para acentos.",
    "image": "https://picsum.photos/seed/platillo-zildjian-a-zildjian-ride-20/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Set de Platillos Meinl HCS",
    "price": 3900,
    "category": "Percusión",
    "brand": "Meinl",
    "description": "Pack de platillos de entrada con hi-hat, crash y ride, ideal para bateristas principiantes.",
    "image": "https://picsum.photos/seed/set-de-platillos-meinl-hcs/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Cajon Peruano Meinl Percussion",
    "price": 2900,
    "category": "Percusión",
    "brand": "Meinl",
    "description": "Cajón flamenco de madera con cuerdas internas ajustables para sonido tipo snare.",
    "image": "https://picsum.photos/seed/cajon-peruano-meinl-percussion/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Djembe Toca Percussion 12 pulgadas",
    "price": 2400,
    "category": "Percusión",
    "brand": "Toca",
    "description": "Djembe africano de fibra de vidrio, ligero y resistente, ideal para percusión de calle y ensambles.",
    "image": "https://picsum.photos/seed/djembe-toca-percussion-12-pulgadas/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Congas LP Aspire",
    "price": 8900,
    "category": "Percusión",
    "brand": "LP",
    "description": "Par de congas con cascos de madera y parches sintéticos, sonido cálido tradicional.",
    "image": "https://picsum.photos/seed/congas-lp-aspire/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Bongos LP City Series",
    "price": 3200,
    "category": "Percusión",
    "brand": "LP",
    "description": "Par de bongós compactos con parches de piel natural, ideales para música latina.",
    "image": "https://picsum.photos/seed/bongos-lp-city-series/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Baquetas Vic Firth 5A",
    "price": 450,
    "category": "Percusión",
    "brand": "Vic Firth",
    "description": "Par de baquetas de madera de nogal, punta ovalada, estándar para batería y percusión.",
    "image": "https://picsum.photos/seed/baquetas-vic-firth-5a/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Pedal de Bombo Tama Iron Cobra",
    "price": 5900,
    "category": "Percusión",
    "brand": "Tama",
    "description": "Pedal de bombo doble cadena con acción rápida y ajustable, usado por bateristas profesionales.",
    "image": "https://picsum.photos/seed/pedal-de-bombo-tama-iron-cobra/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Pandereta LP Percussion",
    "price": 950,
    "category": "Percusión",
    "brand": "LP",
    "description": "Pandereta de madera con platillos de acero, ideal para percusión rítmica en directo.",
    "image": "https://picsum.photos/seed/pandereta-lp-percussion/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Timbales LP Matador",
    "price": 11900,
    "category": "Percusión",
    "brand": "LP",
    "description": "Set de timbales tradicionales con herrajes cromados, ideales para salsa y música latina.",
    "image": "https://picsum.photos/seed/timbales-lp-matador/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Xilofono Yamaha Estudiantil",
    "price": 3400,
    "category": "Percusión",
    "brand": "Yamaha",
    "description": "Xilófono de percusión melódica con láminas resonantes, ideal para educación musical.",
    "image": "https://picsum.photos/seed/xilofono-yamaha-estudiantil/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Piano Digital Yamaha P-125",
    "price": 13900,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Piano digital de 88 teclas contrapesadas con sonido de piano de cola muestreado, ideal para estudio.",
    "image": "https://picsum.photos/seed/piano-digital-yamaha-p-125/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Piano Digital Casio CDP-S110",
    "price": 8900,
    "category": "Teclados y Pianos",
    "brand": "Casio",
    "description": "Piano digital compacto de 88 teclas con acción de martillo escalado, ligero y portátil.",
    "image": "https://picsum.photos/seed/piano-digital-casio-cdp-s110/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Piano Digital Roland FP-30X",
    "price": 16900,
    "category": "Teclados y Pianos",
    "brand": "Roland",
    "description": "Piano digital con sonido SuperNATURAL y conectividad Bluetooth, ideal para práctica e interpretación.",
    "image": "https://picsum.photos/seed/piano-digital-roland-fp-30x/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Teclado Arreglista Yamaha PSR-E373",
    "price": 6900,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Teclado de 61 teclas con cientos de timbres y ritmos, ideal para principiantes y educación musical.",
    "image": "https://picsum.photos/seed/teclado-arreglista-yamaha-psr-e373/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Teclado Arreglista Casio CT-S300",
    "price": 4900,
    "category": "Teclados y Pianos",
    "brand": "Casio",
    "description": "Teclado portátil de 61 teclas con función de acompañamiento automático y salida USB.",
    "image": "https://picsum.photos/seed/teclado-arreglista-casio-ct-s300/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Sintetizador Korg Minilogue",
    "price": 18900,
    "category": "Teclados y Pianos",
    "brand": "Korg",
    "description": "Sintetizador analógico polifónico de 4 voces, ideal para producción musical y sonidos electrónicos.",
    "image": "https://picsum.photos/seed/sintetizador-korg-minilogue/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Sintetizador Roland Juno-DS61",
    "price": 21900,
    "category": "Teclados y Pianos",
    "brand": "Roland",
    "description": "Sintetizador/estación de trabajo con sonidos versátiles y secuenciador integrado.",
    "image": "https://picsum.photos/seed/sintetizador-roland-juno-ds61/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Piano Vertical Digital Yamaha YDP-145",
    "price": 24900,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Piano digital tipo mueble con acción de martillo Graded Hammer Standard, ideal para el hogar.",
    "image": "https://picsum.photos/seed/piano-vertical-digital-yamaha-ydp-145/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Teclado Controlador MIDI Akai MPK Mini",
    "price": 2900,
    "category": "Teclados y Pianos",
    "brand": "Akai",
    "description": "Controlador MIDI compacto de 25 teclas con pads y perillas, ideal para producción musical en DAW.",
    "image": "https://picsum.photos/seed/teclado-controlador-midi-akai-mpk-mini/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Teclado Controlador M-Audio Keystation 61",
    "price": 4500,
    "category": "Teclados y Pianos",
    "brand": "M-Audio",
    "description": "Controlador MIDI de 61 teclas semi-contrapesadas, ideal para producción y grabación en estudio.",
    "image": "https://picsum.photos/seed/teclado-controlador-m-audio-keystation-61/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Organo Electronico Casio CT-X700",
    "price": 5900,
    "category": "Teclados y Pianos",
    "brand": "Casio",
    "description": "Teclado con 600 timbres y funciones de aprendizaje, ideal para estudiantes de música.",
    "image": "https://picsum.photos/seed/organo-electronico-casio-ct-x700/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Piano Digital Korg B2",
    "price": 9900,
    "category": "Teclados y Pianos",
    "brand": "Korg",
    "description": "Piano digital de 88 teclas con sonido natural de piano acústico y diseño compacto.",
    "image": "https://picsum.photos/seed/piano-digital-korg-b2/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Estacion de Trabajo Yamaha MODX6",
    "price": 32900,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Sintetizador/workstation profesional con motor de síntesis avanzado, ideal para producción y directo.",
    "image": "https://picsum.photos/seed/estacion-de-trabajo-yamaha-modx6/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Teclado Infantil Casio SA-76",
    "price": 1400,
    "category": "Teclados y Pianos",
    "brand": "Casio",
    "description": "Mini teclado de 44 teclas ideal para introducir a niños al mundo de la música.",
    "image": "https://picsum.photos/seed/teclado-infantil-casio-sa-76/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Piano Digital Portatil Alesis Recital",
    "price": 4200,
    "category": "Teclados y Pianos",
    "brand": "Alesis",
    "description": "Piano digital de 88 teclas semi-contrapesadas, ideal para principiantes por su relación precio-calidad.",
    "image": "https://picsum.photos/seed/piano-digital-portatil-alesis-recital/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Saxofon Alto Yamaha YAS-280",
    "price": 24900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Saxofón alto estudiantil con afinación estable y buena proyección, ideal para principiantes.",
    "image": "https://picsum.photos/seed/saxofon-alto-yamaha-yas-280/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Saxofon Alto Selmer AS42",
    "price": 38900,
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "description": "Saxofón alto profesional con acabado laqueado y mecanismo preciso, usado por músicos avanzados.",
    "image": "https://picsum.photos/seed/saxofon-alto-selmer-as42/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Trompeta Bach TR300",
    "price": 9900,
    "category": "Instrumentos de Viento",
    "brand": "Bach",
    "description": "Trompeta estudiantil en Bb con acabado laqueado, ideal para bandas escolares.",
    "image": "https://picsum.photos/seed/trompeta-bach-tr300/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Trompeta Yamaha YTR-2330",
    "price": 11900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Trompeta profesional para estudiantes con válvulas de precisión y sonido brillante.",
    "image": "https://picsum.photos/seed/trompeta-yamaha-ytr-2330/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Clarinete Yamaha YCL-255",
    "price": 8900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Clarinete estudiantil de resina ABS, resistente y con buena afinación.",
    "image": "https://picsum.photos/seed/clarinete-yamaha-ycl-255/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Flauta Traversa Yamaha YFL-222",
    "price": 10900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Flauta traversa estudiantil con cuerpo plateado, ideal para bandas escolares y estudiantes.",
    "image": "https://picsum.photos/seed/flauta-traversa-yamaha-yfl-222/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Trombon Yamaha YSL-354",
    "price": 13900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Trombón tenor con vara de precisión y sonido cálido, ideal para bandas y orquesta.",
    "image": "https://picsum.photos/seed/trombon-yamaha-ysl-354/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Tuba Jupiter JTU1110",
    "price": 39900,
    "category": "Instrumentos de Viento",
    "brand": "Jupiter",
    "description": "Tuba estudiantil en Bb con acabado lacado, ideal para bandas sinfónicas.",
    "image": "https://picsum.photos/seed/tuba-jupiter-jtu1110/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Trompeta Getzen 300 Series",
    "price": 10500,
    "category": "Instrumentos de Viento",
    "brand": "Getzen",
    "description": "Trompeta estudiantil con acabado plateado y respuesta rápida, ideal para principiantes.",
    "image": "https://picsum.photos/seed/trompeta-getzen-300-series/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Armonica Hohner Special 20",
    "price": 950,
    "category": "Instrumentos de Viento",
    "brand": "Hohner",
    "description": "Armónica diatónica de 10 orificios, ideal para blues, folk y rock.",
    "image": "https://picsum.photos/seed/armonica-hohner-special-20/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Saxofon Tenor Jupiter JTS700",
    "price": 27900,
    "category": "Instrumentos de Viento",
    "brand": "Jupiter",
    "description": "Saxofón tenor estudiantil con mecanismo suave y sonido cálido, ideal para jazz y bandas.",
    "image": "https://picsum.photos/seed/saxofon-tenor-jupiter-jts700/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Flauta Dulce Yamaha YRS-23",
    "price": 350,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Flauta dulce soprano de plástico, estándar en la educación musical escolar.",
    "image": "https://picsum.photos/seed/flauta-dulce-yamaha-yrs-23/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Corno Frances Jupiter JHR1000",
    "price": 29900,
    "category": "Instrumentos de Viento",
    "brand": "Jupiter",
    "description": "Corno francés estudiantil de doble trompa, ideal para orquesta y banda sinfónica.",
    "image": "https://picsum.photos/seed/corno-frances-jupiter-jhr1000/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Melodica Hohner Student 32",
    "price": 1200,
    "category": "Instrumentos de Viento",
    "brand": "Hohner",
    "description": "Melódica de 32 teclas, instrumento de viento-teclado ideal para educación musical.",
    "image": "https://picsum.photos/seed/melodica-hohner-student-32/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Gaita de Fole Tradicional",
    "price": 6900,
    "category": "Instrumentos de Viento",
    "brand": "Generico",
    "description": "Gaita tradicional de fole con tres roncones, instrumento folclórico de viento.",
    "image": "https://picsum.photos/seed/gaita-de-fole-tradicional/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Violin Yamaha V5SA 4/4",
    "price": 5900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Yamaha",
    "description": "Violín estudiantil de tamaño completo con estuche y arco incluidos, ideal para principiantes.",
    "image": "https://picsum.photos/seed/violin-yamaha-v5sa-4-4/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Violonchelo Cecilio CCO-100",
    "price": 8900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Cecilio",
    "description": "Violonchelo estudiantil 4/4 con estuche acolchado, ideal para estudiantes de orquesta.",
    "image": "https://picsum.photos/seed/violonchelo-cecilio-cco-100/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Viola Stentor Student II",
    "price": 6900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Stentor",
    "description": "Viola estudiantil con buen balance tonal, ideal para iniciarse en cuerdas frotadas.",
    "image": "https://picsum.photos/seed/viola-stentor-student-ii/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Contrabajo Cecilio 3/4",
    "price": 15900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Cecilio",
    "description": "Contrabajo acústico de tamaño 3/4, ideal para estudiantes de orquesta y jazz.",
    "image": "https://picsum.photos/seed/contrabajo-cecilio-3-4/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Arpa Celtica Roosebeck 22 Cuerdas",
    "price": 12900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Roosebeck",
    "description": "Arpa celta de 22 cuerdas de madera maciza, ideal para música folk y terapia musical.",
    "image": "https://picsum.photos/seed/arpa-celtica-roosebeck-22-cuerdas/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Ukelele Soprano Kala KA-15S",
    "price": 1400,
    "category": "Cuerda Clásica y Folk",
    "brand": "Kala",
    "description": "Ukelele soprano de caoba, ligero y de fácil ejecución, ideal para principiantes.",
    "image": "https://picsum.photos/seed/ukelele-soprano-kala-ka-15s/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Ukelele Concierto Cordoba 15CM",
    "price": 2200,
    "category": "Cuerda Clásica y Folk",
    "brand": "Cordoba",
    "description": "Ukelele concierto con tapa maciza de caoba, sonido cálido y proyección mejorada.",
    "image": "https://picsum.photos/seed/ukelele-concierto-cordoba-15cm/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Banjo Deering Goodtime",
    "price": 13900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Deering",
    "description": "Banjo de 5 cuerdas fabricado en EUA, sonido brillante ideal para bluegrass y folk.",
    "image": "https://picsum.photos/seed/banjo-deering-goodtime/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Mandolina Kentucky KM-150",
    "price": 6900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Kentucky",
    "description": "Mandolina estilo A con tapa maciza de abeto, ideal para bluegrass y folk.",
    "image": "https://picsum.photos/seed/mandolina-kentucky-km-150/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Violin de Estudio Avanzado Cremona SV-175",
    "price": 9900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Cremona",
    "description": "Violín de estudio avanzado con tapa maciza y acabado antiguo, ideal para intermedios.",
    "image": "https://picsum.photos/seed/violin-de-estudio-avanzado-cremona-sv-175/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Amplificador de Guitarra Fender Champion 20",
    "price": 3900,
    "category": "Accesorios",
    "brand": "Fender",
    "description": "Amplificador combo de 20W con efectos digitales integrados, ideal para práctica y ensayo.",
    "image": "https://picsum.photos/seed/amplificador-de-guitarra-fender-champion-20/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Amplificador de Bajo Ampeg BA-108",
    "price": 4200,
    "category": "Accesorios",
    "brand": "Ampeg",
    "description": "Amplificador combo para bajo de 20W, sonido cálido y potente para práctica en casa.",
    "image": "https://picsum.photos/seed/amplificador-de-bajo-ampeg-ba-108/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Afinador Cromatico Korg TM-60",
    "price": 650,
    "category": "Accesorios",
    "brand": "Korg",
    "description": "Afinador y metrónomo combinado, compatible con guitarra, bajo y otros instrumentos.",
    "image": "https://picsum.photos/seed/afinador-cromatico-korg-tm-60/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Cuerdas para Guitarra Electrica Ernie Ball Regular Slinky",
    "price": 250,
    "category": "Accesorios",
    "brand": "Ernie Ball",
    "description": "Set de cuerdas 10-46 de níquel, estándar de la industria para guitarra eléctrica.",
    "image": "https://picsum.photos/seed/cuerdas-para-guitarra-electrica-ernie-ball-regular-slinky/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Cuerdas para Guitarra Acustica DAddario EJ16",
    "price": 280,
    "category": "Accesorios",
    "brand": "D'Addario",
    "description": "Set de cuerdas phosphor bronze, sonido cálido y brillante para guitarra acústica.",
    "image": "https://picsum.photos/seed/cuerdas-para-guitarra-acustica-daddario-ej16/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Capo para Guitarra Kyser Quick-Change",
    "price": 450,
    "category": "Accesorios",
    "brand": "Kyser",
    "description": "Capo de resorte de acción rápida, compatible con guitarras acústicas y eléctricas.",
    "image": "https://picsum.photos/seed/capo-para-guitarra-kyser-quick-change/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Funda Acolchada para Guitarra Gator",
    "price": 1200,
    "category": "Accesorios",
    "brand": "Gator",
    "description": "Funda acolchada resistente al agua para guitarra eléctrica, con correa y bolsillo frontal.",
    "image": "https://picsum.photos/seed/funda-acolchada-para-guitarra-gator/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Estuche Rigido para Guitarra SKB",
    "price": 3200,
    "category": "Accesorios",
    "brand": "SKB",
    "description": "Estuche rígido con interior acolchado, protección máxima para transporte de guitarras.",
    "image": "https://picsum.photos/seed/estuche-rigido-para-guitarra-skb/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Interfaz de Audio Focusrite Scarlett 2i2",
    "price": 4900,
    "category": "Accesorios",
    "brand": "Focusrite",
    "description": "Interfaz de audio USB de 2 entradas, ideal para grabación en casa y producción musical.",
    "image": "https://picsum.photos/seed/interfaz-de-audio-focusrite-scarlett-2i2/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Microfono Shure SM58",
    "price": 3900,
    "category": "Accesorios",
    "brand": "Shure",
    "description": "Micrófono dinámico vocal de referencia mundial, robusto y con excelente rechazo de feedback.",
    "image": "https://picsum.photos/seed/microfono-shure-sm58/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Pedal de Efectos Boss DS-1 Distortion",
    "price": 1900,
    "category": "Accesorios",
    "brand": "Boss",
    "description": "Pedal de distorsión clásico usado en rock y grunge desde los años 80.",
    "image": "https://picsum.photos/seed/pedal-de-efectos-boss-ds-1-distortion/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Atril para Partituras Manhasset 48",
    "price": 1800,
    "category": "Accesorios",
    "brand": "Manhasset",
    "description": "Atril profesional plegable con base robusta, estándar en salas de ensayo y orquestas.",
    "image": "https://picsum.photos/seed/atril-para-partituras-manhasset-48/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Soporte para Guitarra Hercules GS414B",
    "price": 950,
    "category": "Accesorios",
    "brand": "Hercules",
    "description": "Soporte plegable con brazos autoajustables, protege el instrumento de caídas accidentales.",
    "image": "https://picsum.photos/seed/soporte-para-guitarra-hercules-gs414b/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Metronomo Digital Seiko SQ50",
    "price": 550,
    "category": "Accesorios",
    "brand": "Seiko",
    "description": "Metrónomo digital compacto con múltiples ritmos y afinador de referencia integrado.",
    "image": "https://picsum.photos/seed/metronomo-digital-seiko-sq50/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Audifonos de Estudio Audio-Technica ATH-M20x",
    "price": 1900,
    "category": "Accesorios",
    "brand": "Audio-Technica",
    "description": "Audífonos cerrados de monitoreo, ideales para mezcla y grabación en casa.",
    "image": "https://picsum.photos/seed/audifonos-de-estudio-audio-technica-ath-m20x/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Fender Player Plus Stratocaster HSS",
    "price": 23900,
    "category": "Guitarras",
    "brand": "Fender",
    "description": "Guitarra eléctrica con pastilla humbucker en el puente, mástil de arce y acabado moderno para versatilidad tonal.",
    "image": "https://picsum.photos/seed/guitarra-electrica-fender-player-plus-stratocaster-hss/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Guitarra Electrica Gibson Les Paul Junior",
    "price": 28900,
    "category": "Guitarras",
    "brand": "Gibson",
    "description": "Guitarra eléctrica minimalista con una sola pastilla P-90, ligera y con un tono crudo muy apreciado en el rock.",
    "image": "https://picsum.photos/seed/guitarra-electrica-gibson-les-paul-junior/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Epiphone SG Standard",
    "price": 9900,
    "category": "Guitarras",
    "brand": "Epiphone",
    "description": "Versión accesible de la icónica SG, con pastillas humbucker ProBucker y gran comodidad de ejecución.",
    "image": "https://picsum.photos/seed/guitarra-electrica-epiphone-sg-standard/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Squier Classic Vibe 60s Jazzmaster",
    "price": 8900,
    "category": "Guitarras",
    "brand": "Squier",
    "description": "Réplica fiel del clásico de los 60, con vibrato flotante y sonido brillante ideal para surf e indie.",
    "image": "https://picsum.photos/seed/guitarra-electrica-squier-classic-vibe-60s-jazzmaster/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Ibanez JEM77 Steve Vai",
    "price": 45900,
    "category": "Guitarras",
    "brand": "Ibanez",
    "description": "Guitarra signature de alto rendimiento con mástil Wizard y trémolo Edge, pensada para virtuosos.",
    "image": "https://picsum.photos/seed/guitarra-electrica-ibanez-jem77-steve-vai/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Electrica PRS SE Silver Sky",
    "price": 24900,
    "category": "Guitarras",
    "brand": "PRS",
    "description": "Guitarra versátil diseñada junto a John Mayer, con pastillas single-coil de gran claridad y sustain.",
    "image": "https://picsum.photos/seed/guitarra-electrica-prs-se-silver-sky/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Jackson Pro Series Soloist",
    "price": 26900,
    "category": "Guitarras",
    "brand": "Jackson",
    "description": "Guitarra de alto rendimiento con mástil delgado y humbuckers activos, ideal para metal técnico.",
    "image": "https://picsum.photos/seed/guitarra-electrica-jackson-pro-series-soloist/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Electrica ESP LTD MH-1000",
    "price": 19900,
    "category": "Guitarras",
    "brand": "ESP LTD",
    "description": "Guitarra de cuerpo sólido con pastillas EMG activas, pensada para géneros pesados y alta ganancia.",
    "image": "https://picsum.photos/seed/guitarra-electrica-esp-ltd-mh-1000/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Acustica Taylor GS Mini",
    "price": 14900,
    "category": "Guitarras",
    "brand": "Taylor",
    "description": "Guitarra acústica compacta con gran proyección, ideal para viajar sin sacrificar calidad de sonido.",
    "image": "https://picsum.photos/seed/guitarra-acustica-taylor-gs-mini/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Acustica Martin LX1 Little Martin",
    "price": 8900,
    "category": "Guitarras",
    "brand": "Martin",
    "description": "Guitarra acústica de viaje con tapa maciza de abeto, sonido cálido en un formato reducido.",
    "image": "https://picsum.photos/seed/guitarra-acustica-martin-lx1-little-martin/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Acustica Yamaha FGX830C",
    "price": 8900,
    "category": "Guitarras",
    "brand": "Yamaha",
    "description": "Guitarra electroacústica con cutaway y ecualizador integrado, tapa maciza de abeto tipo dreadnought.",
    "image": "https://picsum.photos/seed/guitarra-acustica-yamaha-fgx830c/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Guitarra Electroacustica Cordoba Fusion 12",
    "price": 12900,
    "category": "Guitarras",
    "brand": "Cordoba",
    "description": "Guitarra clásica electroacústica con mástil delgado, ideal para guitarristas eléctricos que buscan cuerdas de nylon.",
    "image": "https://picsum.photos/seed/guitarra-electroacustica-cordoba-fusion-12/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Clasica Yamaha CG122MS",
    "price": 4900,
    "category": "Guitarras",
    "brand": "Yamaha",
    "description": "Guitarra clásica con tapa maciza de abeto y aros de caoba, excelente relación calidad-precio.",
    "image": "https://picsum.photos/seed/guitarra-clasica-yamaha-cg122ms/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Music Man Cutlass",
    "price": 42900,
    "category": "Guitarras",
    "brand": "Music Man",
    "description": "Guitarra eléctrica premium con pastillas activas y mástil ultra delgado, fabricada en EUA.",
    "image": "https://picsum.photos/seed/guitarra-electrica-music-man-cutlass/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Gretsch G5420T Electromatic",
    "price": 21900,
    "category": "Guitarras",
    "brand": "Gretsch",
    "description": "Guitarra hollow body con vibrato Bigsby, sonido cálido y twangy característico del rockabilly.",
    "image": "https://picsum.photos/seed/guitarra-electrica-gretsch-g5420t-electromatic/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Schecter Omen Extreme-6",
    "price": 10900,
    "category": "Guitarras",
    "brand": "Schecter",
    "description": "Guitarra de cuerpo sólido con pastillas activas EMG, mástil delgado ideal para riffs pesados.",
    "image": "https://picsum.photos/seed/guitarra-electrica-schecter-omen-extreme-6/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Charvel Pro-Mod DK24",
    "price": 18900,
    "category": "Guitarras",
    "brand": "Charvel",
    "description": "Guitarra superstrat con mástil compound radius y trémolo de alta precisión, para tocar rápido y cómodo.",
    "image": "https://picsum.photos/seed/guitarra-electrica-charvel-pro-mod-dk24/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Guitarra Acustica Seagull S6 Original",
    "price": 8900,
    "category": "Guitarras",
    "brand": "Seagull",
    "description": "Guitarra acústica canadiense con tapa maciza de cedro, sonido cálido y construcción artesanal.",
    "image": "https://picsum.photos/seed/guitarra-acustica-seagull-s6-original/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Reverend Double Agent",
    "price": 15900,
    "category": "Guitarras",
    "brand": "Reverend",
    "description": "Guitarra eléctrica versátil con electrónica única y hardware de calidad, sonido brillante y definido.",
    "image": "https://picsum.photos/seed/guitarra-electrica-reverend-double-agent/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Guitarra Electrica Fender American Professional II Telecaster",
    "price": 32900,
    "category": "Guitarras",
    "brand": "Fender",
    "description": "Guitarra fabricada en EUA con pastillas V-Mod II y mástil mejorado, referencia profesional Telecaster.",
    "image": "https://picsum.photos/seed/guitarra-electrica-fender-american-professional-ii-telecaster/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bajo Electrico Fender American Professional II P Bass",
    "price": 38900,
    "category": "Bajos",
    "brand": "Fender",
    "description": "Bajo fabricado en EUA con pastilla split-coil mejorada y mástil cómodo, tono profesional de referencia.",
    "image": "https://picsum.photos/seed/bajo-electrico-fender-american-professional-ii-p-bass/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Bajo Electrico Music Man Bongo 4",
    "price": 39900,
    "category": "Bajos",
    "brand": "Music Man",
    "description": "Bajo de alto rendimiento con electrónica activa de 3 bandas y pastillas humbucker potentes.",
    "image": "https://picsum.photos/seed/bajo-electrico-music-man-bongo-4/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Bajo Electrico Ibanez SR500",
    "price": 11900,
    "category": "Bajos",
    "brand": "Ibanez",
    "description": "Bajo de 4 cuerdas ligero con mástil delgado SR y electrónica activa/pasiva conmutable.",
    "image": "https://picsum.photos/seed/bajo-electrico-ibanez-sr500/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Bajo Electrico Squier Classic Vibe 60s Jazz Bass",
    "price": 8900,
    "category": "Bajos",
    "brand": "Squier",
    "description": "Réplica del clásico Jazz Bass de los 60, con dos pastillas single-coil de tono versátil.",
    "image": "https://picsum.photos/seed/bajo-electrico-squier-classic-vibe-60s-jazz-bass/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bajo Electrico Yamaha BB434",
    "price": 10900,
    "category": "Bajos",
    "brand": "Yamaha",
    "description": "Bajo de cuerpo sólido con pastillas de alta salida, ideal para rock, funk y jazz moderno.",
    "image": "https://picsum.photos/seed/bajo-electrico-yamaha-bb434/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Bajo Electrico Spector Performer 5",
    "price": 13900,
    "category": "Bajos",
    "brand": "Spector",
    "description": "Bajo de 5 cuerdas con cuerpo ergonómico y electrónica activa, gran rango tonal para estilos modernos.",
    "image": "https://picsum.photos/seed/bajo-electrico-spector-performer-5/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Bajo Electrico Schecter Stiletto Studio-4",
    "price": 14900,
    "category": "Bajos",
    "brand": "Schecter",
    "description": "Bajo con cuerpo de caoba y arce, electrónica activa EMG, sonido definido y potente.",
    "image": "https://picsum.photos/seed/bajo-electrico-schecter-stiletto-studio-4/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Bajo Acustico Ibanez AEB10E",
    "price": 7900,
    "category": "Bajos",
    "brand": "Ibanez",
    "description": "Bajo acústico con cutaway y preamplificador integrado, ideal para grabaciones íntimas.",
    "image": "https://picsum.photos/seed/bajo-acustico-ibanez-aeb10e/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bajo Electrico Epiphone Thunderbird Pro-IV",
    "price": 12900,
    "category": "Bajos",
    "brand": "Epiphone",
    "description": "Bajo de cuerpo explorer con pastillas humbucker, sonido profundo característico del rock clásico.",
    "image": "https://picsum.photos/seed/bajo-electrico-epiphone-thunderbird-pro-iv/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Bajo Electrico Fender Squier Affinity Precision Bass PJ",
    "price": 6900,
    "category": "Bajos",
    "brand": "Squier",
    "description": "Bajo accesible con configuración PJ de pastillas, ideal para principiantes que buscan versatilidad.",
    "image": "https://picsum.photos/seed/bajo-electrico-fender-squier-affinity-precision-bass-pj/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Bateria Acustica DW Design Series",
    "price": 34900,
    "category": "Percusión",
    "brand": "DW",
    "description": "Set de batería profesional de 5 piezas con cascos de arce, sonido cálido y gran proyección.",
    "image": "https://picsum.photos/seed/bateria-acustica-dw-design-series/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Bateria Electronica Alesis Nitro Max",
    "price": 12900,
    "category": "Percusión",
    "brand": "Alesis",
    "description": "Batería electrónica con parches de malla y módulo de sonido expandido, ideal para práctica silenciosa.",
    "image": "https://picsum.photos/seed/bateria-electronica-alesis-nitro-max/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Bateria Acustica Ludwig Breakbeats",
    "price": 14900,
    "category": "Percusión",
    "brand": "Ludwig",
    "description": "Set de batería compacto de 4 piezas, ideal para espacios reducidos y estilos urbanos.",
    "image": "https://picsum.photos/seed/bateria-acustica-ludwig-breakbeats/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Platillo Sabian AAX Stage Crash 17",
    "price": 5400,
    "category": "Percusión",
    "brand": "Sabian",
    "description": "Platillo crash brillante y de respuesta rápida, ideal para rock y pop en vivo.",
    "image": "https://picsum.photos/seed/platillo-sabian-aax-stage-crash-17/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Platillo Paiste PST 8 Rock Ride 20",
    "price": 4900,
    "category": "Percusión",
    "brand": "Paiste",
    "description": "Platillo ride potente con campana definida, pensado para estilos de alta energía.",
    "image": "https://picsum.photos/seed/platillo-paiste-pst-8-rock-ride-20/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Set de Platillos Zildjian Planet Z",
    "price": 4200,
    "category": "Percusión",
    "brand": "Zildjian",
    "description": "Pack de platillos de entrada con hi-hat, crash y ride, ideal para bateristas principiantes.",
    "image": "https://picsum.photos/seed/set-de-platillos-zildjian-planet-z/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Cajon Meinl Percussion Jam Cajon",
    "price": 3200,
    "category": "Percusión",
    "brand": "Meinl",
    "description": "Cajón flamenco con esquinas redondeadas y cuerdas ajustables, sonido versátil tipo snare.",
    "image": "https://picsum.photos/seed/cajon-meinl-percussion-jam-cajon/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Djembe Remo Mondo",
    "price": 3900,
    "category": "Percusión",
    "brand": "Remo",
    "description": "Djembe con parche sintético resistente a la humedad, ideal para ensambles y clases grupales.",
    "image": "https://picsum.photos/seed/djembe-remo-mondo/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Congas Meinl Headliner Series",
    "price": 9900,
    "category": "Percusión",
    "brand": "Meinl",
    "description": "Par de congas con cascos de madera y parches naturales, sonido cálido tradicional.",
    "image": "https://picsum.photos/seed/congas-meinl-headliner-series/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Bongos Toca Players Series",
    "price": 2900,
    "category": "Percusión",
    "brand": "Toca",
    "description": "Par de bongós con parches de piel de búfalo, ideales para música latina y world music.",
    "image": "https://picsum.photos/seed/bongos-toca-players-series/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Baquetas Promark 5B Hickory",
    "price": 480,
    "category": "Percusión",
    "brand": "Promark",
    "description": "Par de baquetas de nogal americano, punta de madera, estándar de la industria.",
    "image": "https://picsum.photos/seed/baquetas-promark-5b-hickory/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Pedal de Bombo DW 5000 Series",
    "price": 8900,
    "category": "Percusión",
    "brand": "DW",
    "description": "Pedal de bombo profesional con acción suave y ajuste preciso, usado en grabaciones y directo.",
    "image": "https://picsum.photos/seed/pedal-de-bombo-dw-5000-series/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Pandereta Meinl Percussion 10",
    "price": 890,
    "category": "Percusión",
    "brand": "Meinl",
    "description": "Pandereta de madera con platillos de acero inoxidable, sonido brillante y definido.",
    "image": "https://picsum.photos/seed/pandereta-meinl-percussion-10/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Timbales LP Tito Puente",
    "price": 15900,
    "category": "Percusión",
    "brand": "LP",
    "description": "Set de timbales profesionales con herrajes cromados, diseño signature para música latina.",
    "image": "https://picsum.photos/seed/timbales-lp-tito-puente/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Vibraphone Yamaha YV-1605",
    "price": 89900,
    "category": "Percusión",
    "brand": "Yamaha",
    "description": "Vibráfono profesional de 3 octavas con resonadores afinados, ideal para jazz y música contemporánea.",
    "image": "https://picsum.photos/seed/vibraphone-yamaha-yv-1605/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Piano Digital Kawai ES120",
    "price": 17900,
    "category": "Teclados y Pianos",
    "brand": "Kawai",
    "description": "Piano digital portátil con acción de martillo realista y altavoces potentes integrados.",
    "image": "https://picsum.photos/seed/piano-digital-kawai-es120/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Piano Digital Yamaha P-225",
    "price": 15900,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Piano digital compacto con sonido de piano de cola CFX muestreado y diseño elegante.",
    "image": "https://picsum.photos/seed/piano-digital-yamaha-p-225/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Piano Digital Casio PX-S1100",
    "price": 12900,
    "category": "Teclados y Pianos",
    "brand": "Casio",
    "description": "Piano digital ultradelgado de 88 teclas con sonido acústico multidimensional.",
    "image": "https://picsum.photos/seed/piano-digital-casio-px-s1100/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Piano Digital Roland FP-10",
    "price": 11900,
    "category": "Teclados y Pianos",
    "brand": "Roland",
    "description": "Piano digital de entrada con sonido SuperNATURAL y acción PHA-4 Standard.",
    "image": "https://picsum.photos/seed/piano-digital-roland-fp-10/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Teclado Arreglista Yamaha PSR-E473",
    "price": 9900,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Teclado de 61 teclas con cientos de voces, ritmos y conectividad Bluetooth Audio.",
    "image": "https://picsum.photos/seed/teclado-arreglista-yamaha-psr-e473/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Teclado Arreglista Casio CT-S500",
    "price": 6900,
    "category": "Teclados y Pianos",
    "brand": "Casio",
    "description": "Teclado portátil con altavoces potentes y salida de audio USB para grabación directa.",
    "image": "https://picsum.photos/seed/teclado-arreglista-casio-ct-s500/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Sintetizador Korg Volca Keys",
    "price": 4900,
    "category": "Teclados y Pianos",
    "brand": "Korg",
    "description": "Sintetizador analógico compacto de 3 voces, ideal para producción y experimentación sonora.",
    "image": "https://picsum.photos/seed/sintetizador-korg-volca-keys/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Sintetizador Roland Gaia 2",
    "price": 19900,
    "category": "Teclados y Pianos",
    "brand": "Roland",
    "description": "Sintetizador de síntesis virtual analógica con estructura de 3 osciladores por voz.",
    "image": "https://picsum.photos/seed/sintetizador-roland-gaia-2/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Piano Vertical Digital Casio AP-270",
    "price": 22900,
    "category": "Teclados y Pianos",
    "brand": "Casio",
    "description": "Piano digital tipo mueble con acción de martillo escalado y doble teclado para clases.",
    "image": "https://picsum.photos/seed/piano-vertical-digital-casio-ap-270/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Teclado Controlador Novation Launchkey 49",
    "price": 6900,
    "category": "Teclados y Pianos",
    "brand": "Novation",
    "description": "Controlador MIDI de 49 teclas con integración profunda a Ableton Live y otros DAW.",
    "image": "https://picsum.photos/seed/teclado-controlador-novation-launchkey-49/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Teclado Controlador Arturia KeyLab Essential 61",
    "price": 7900,
    "category": "Teclados y Pianos",
    "brand": "Arturia",
    "description": "Controlador MIDI de 61 teclas semi-contrapesadas con software de producción incluido.",
    "image": "https://picsum.photos/seed/teclado-controlador-arturia-keylab-essential-61/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Organo Electronico Yamaha YPT-270",
    "price": 4900,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Teclado educativo con lección integrada y cientos de timbres para aprender a tocar.",
    "image": "https://picsum.photos/seed/organo-electronico-yamaha-ypt-270/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Piano Digital Kawai KDP120",
    "price": 24900,
    "category": "Teclados y Pianos",
    "brand": "Kawai",
    "description": "Piano digital tipo mueble con acción de martillo Responsive Hammer Compact.",
    "image": "https://picsum.photos/seed/piano-digital-kawai-kdp120/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Estacion de Trabajo Korg Kronos 2",
    "price": 89900,
    "category": "Teclados y Pianos",
    "brand": "Korg",
    "description": "Workstation profesional con múltiples motores de sonido, usada por productores y bandas en gira.",
    "image": "https://picsum.photos/seed/estacion-de-trabajo-korg-kronos-2/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Teclado Infantil Yamaha PSS-E30",
    "price": 2200,
    "category": "Teclados y Pianos",
    "brand": "Yamaha",
    "description": "Mini teclado de 37 teclas ideal para introducir a los niños en la música.",
    "image": "https://picsum.photos/seed/teclado-infantil-yamaha-pss-e30/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Saxofon Alto Jupiter JAS500",
    "price": 18900,
    "category": "Instrumentos de Viento",
    "brand": "Jupiter",
    "description": "Saxofón alto estudiantil con mecanismo ajustado de fábrica y estuche resistente incluido.",
    "image": "https://picsum.photos/seed/saxofon-alto-jupiter-jas500/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Saxofon Tenor Yamaha YTS-280",
    "price": 32900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Saxofón tenor estudiantil con buena proyección y afinación estable en todo el registro.",
    "image": "https://picsum.photos/seed/saxofon-tenor-yamaha-yts-280/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Trompeta Jupiter JTR700",
    "price": 12900,
    "category": "Instrumentos de Viento",
    "brand": "Jupiter",
    "description": "Trompeta estudiantil en Bb con válvulas de precisión y acabado lacado duradero.",
    "image": "https://picsum.photos/seed/trompeta-jupiter-jtr700/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Trompeta Yamaha YTR-4335GII",
    "price": 24900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Trompeta intermedia con campana de latón dorado y respuesta suave en todos los registros.",
    "image": "https://picsum.photos/seed/trompeta-yamaha-ytr-4335gii/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Clarinete Buffet Crampon B12",
    "price": 11900,
    "category": "Instrumentos de Viento",
    "brand": "Buffet Crampon",
    "description": "Clarinete estudiantil de resina resistente con mecanismo niquelado, gran estabilidad de afinación.",
    "image": "https://picsum.photos/seed/clarinete-buffet-crampon-b12/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Flauta Traversa Gemeinhardt 2SP",
    "price": 9900,
    "category": "Instrumentos de Viento",
    "brand": "Gemeinhardt",
    "description": "Flauta traversa estudiantil plateada, ligera y de fácil embocadura para principiantes.",
    "image": "https://picsum.photos/seed/flauta-traversa-gemeinhardt-2sp/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Trombon Bach TB301",
    "price": 13900,
    "category": "Instrumentos de Viento",
    "brand": "Bach",
    "description": "Trombón tenor estudiantil con vara ligera y sonido cálido, ideal para bandas escolares.",
    "image": "https://picsum.photos/seed/trombon-bach-tb301/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Tuba Yamaha YBB-105",
    "price": 45900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Tuba estudiantil en Bb de 3 pistones, con acabado lacado y proyección potente.",
    "image": "https://picsum.photos/seed/tuba-yamaha-ybb-105/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Trompeta Conn Director",
    "price": 9900,
    "category": "Instrumentos de Viento",
    "brand": "Conn",
    "description": "Trompeta estudiantil clásica, confiable y de fácil mantenimiento para bandas escolares.",
    "image": "https://picsum.photos/seed/trompeta-conn-director/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Armonica Suzuki Folkmaster",
    "price": 850,
    "category": "Instrumentos de Viento",
    "brand": "Suzuki",
    "description": "Armónica diatónica de 10 orificios con cuerpo de madera, tono cálido tradicional.",
    "image": "https://picsum.photos/seed/armonica-suzuki-folkmaster/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Saxofon Baritono Jupiter JBS1000",
    "price": 45900,
    "category": "Instrumentos de Viento",
    "brand": "Jupiter",
    "description": "Saxofón barítono con mecanismo de fa agudo y estuche con ruedas incluido.",
    "image": "https://picsum.photos/seed/saxofon-baritono-jupiter-jbs1000/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Flauta Dulce Aulos 205B",
    "price": 450,
    "category": "Instrumentos de Viento",
    "brand": "Aulos",
    "description": "Flauta dulce soprano de plástico de alta calidad, estándar en la educación musical.",
    "image": "https://picsum.photos/seed/flauta-dulce-aulos-205b/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Corno Frances Yamaha YHR-314II",
    "price": 34900,
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "description": "Corno francés estudiantil de trompa sencilla, ligero y de fácil respuesta.",
    "image": "https://picsum.photos/seed/corno-frances-yamaha-yhr-314ii/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Melodica Suzuki M-37C",
    "price": 1500,
    "category": "Instrumentos de Viento",
    "brand": "Suzuki",
    "description": "Melódica de 37 teclas con estuche incluido, instrumento viento-teclado para educación musical.",
    "image": "https://picsum.photos/seed/melodica-suzuki-m-37c/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Gaita Escocesa McCallum Bagpipes",
    "price": 15900,
    "category": "Instrumentos de Viento",
    "brand": "McCallum",
    "description": "Gaita escocesa tradicional con roncones afinados, ideal para bandas de gaitas y folclore.",
    "image": "https://picsum.photos/seed/gaita-escocesa-mccallum-bagpipes/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Violin Stentor Student I 4/4",
    "price": 3900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Stentor",
    "description": "Violín estudiantil de entrada con arco y estuche incluidos, ideal para primeros pasos.",
    "image": "https://picsum.photos/seed/violin-stentor-student-i-4-4/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Violonchelo Yamaha VC5S",
    "price": 12900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Yamaha",
    "description": "Violonchelo estudiantil de tamaño completo con buen balance tonal y construcción sólida.",
    "image": "https://picsum.photos/seed/violonchelo-yamaha-vc5s/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Viola Cecilio CVA-500",
    "price": 5900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Cecilio",
    "description": "Viola estudiantil con estuche acolchado, ideal para estudiantes de orquesta escolar.",
    "image": "https://picsum.photos/seed/viola-cecilio-cva-500/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Contrabajo Stentor Student II 3/4",
    "price": 18900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Stentor",
    "description": "Contrabajo acústico de estudio con buen proyección, ideal para orquesta y jazz.",
    "image": "https://picsum.photos/seed/contrabajo-stentor-student-ii-3-4/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Arpa de Mesa Rees Harps Sharpsicle",
    "price": 8900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Rees Harps",
    "description": "Arpa de mesa portátil de 26 cuerdas, ideal para terapia musical y música folk.",
    "image": "https://picsum.photos/seed/arpa-de-mesa-rees-harps-sharpsicle/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Ukelele Tenor Kala KA-T",
    "price": 2900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Kala",
    "description": "Ukelele tenor de caoba con sonido cálido y mayor proyección que el soprano.",
    "image": "https://picsum.photos/seed/ukelele-tenor-kala-ka-t/600/400",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Ukelele Baritono Cordoba 25B",
    "price": 3200,
    "category": "Cuerda Clásica y Folk",
    "brand": "Cordoba",
    "description": "Ukelele barítono con tapa maciza de abeto, afinación similar a las cuatro primeras cuerdas de guitarra.",
    "image": "https://picsum.photos/seed/ukelele-baritono-cordoba-25b/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Banjo Recording King RK-R20",
    "price": 8900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Recording King",
    "description": "Banjo de 5 cuerdas con aro resonador, sonido brillante ideal para bluegrass.",
    "image": "https://picsum.photos/seed/banjo-recording-king-rk-r20/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Mandolina Ibanez M510",
    "price": 4900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Ibanez",
    "description": "Mandolina estilo A con tapa maciza de abeto, ideal para folk y bluegrass.",
    "image": "https://picsum.photos/seed/mandolina-ibanez-m510/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Violin de Estudio Yamaha V7SG 4/4",
    "price": 13900,
    "category": "Cuerda Clásica y Folk",
    "brand": "Yamaha",
    "description": "Violín de estudio avanzado con tapa maciza y acabado antiguo, ideal para nivel intermedio.",
    "image": "https://picsum.photos/seed/violin-de-estudio-yamaha-v7sg-4-4/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Amplificador de Guitarra Boss Katana 50",
    "price": 6900,
    "category": "Accesorios",
    "brand": "Boss",
    "description": "Amplificador combo versátil con efectos digitales integrados y múltiples canales de sonido.",
    "image": "https://picsum.photos/seed/amplificador-de-guitarra-boss-katana-50/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Amplificador de Bajo Fender Rumble 40",
    "price": 5900,
    "category": "Accesorios",
    "brand": "Fender",
    "description": "Amplificador combo para bajo de 40W con ecualizador de 3 bandas y entrada auxiliar.",
    "image": "https://picsum.photos/seed/amplificador-de-bajo-fender-rumble-40/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Afinador de Pedal Boss TU-3",
    "price": 1900,
    "category": "Accesorios",
    "brand": "Boss",
    "description": "Afinador cromático de pedal con pantalla de alta visibilidad, estándar de la industria.",
    "image": "https://picsum.photos/seed/afinador-de-pedal-boss-tu-3/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Cuerdas para Bajo Electrico Ernie Ball Slinky Bass",
    "price": 450,
    "category": "Accesorios",
    "brand": "Ernie Ball",
    "description": "Set de cuerdas de níquel para bajo de 4 cuerdas, calibre estándar y buen sustain.",
    "image": "https://picsum.photos/seed/cuerdas-para-bajo-electrico-ernie-ball-slinky-bass/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Cuerdas para Guitarra Clasica DAddario EJ45",
    "price": 250,
    "category": "Accesorios",
    "brand": "D'Addario",
    "description": "Set de cuerdas de nylon para guitarra clásica, tensión normal y sonido cálido.",
    "image": "https://picsum.photos/seed/cuerdas-para-guitarra-clasica-daddario-ej45/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Capo para Guitarra DAddario NS Artist",
    "price": 350,
    "category": "Accesorios",
    "brand": "D'Addario",
    "description": "Capo de bajo perfil con mecanismo de tensión ajustable, apto para acústicas y eléctricas.",
    "image": "https://picsum.photos/seed/capo-para-guitarra-daddario-ns-artist/600/400",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Funda Acolchada para Bajo Gator",
    "price": 1400,
    "category": "Accesorios",
    "brand": "Gator",
    "description": "Funda acolchada con correa ajustable y bolsillo frontal, protección para transporte diario.",
    "image": "https://picsum.photos/seed/funda-acolchada-para-bajo-gator/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Estuche Rigido para Bajo SKB",
    "price": 3900,
    "category": "Accesorios",
    "brand": "SKB",
    "description": "Estuche rígido con interior moldeado, máxima protección para transporte y viajes.",
    "image": "https://picsum.photos/seed/estuche-rigido-para-bajo-skb/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Interfaz de Audio PreSonus AudioBox USB 96",
    "price": 2900,
    "category": "Accesorios",
    "brand": "PreSonus",
    "description": "Interfaz de audio de 2 canales con preamplificadores de calidad, ideal para grabación en casa.",
    "image": "https://picsum.photos/seed/interfaz-de-audio-presonus-audiobox-usb-96/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Microfono Audio-Technica AT2020",
    "price": 2900,
    "category": "Accesorios",
    "brand": "Audio-Technica",
    "description": "Micrófono de condensador de estudio con captación de detalle excepcional.",
    "image": "https://picsum.photos/seed/microfono-audio-technica-at2020/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Pedal de Efectos MXR Phase 90",
    "price": 2200,
    "category": "Accesorios",
    "brand": "MXR",
    "description": "Pedal de phaser clásico usado en incontables grabaciones de rock desde los años 70.",
    "image": "https://picsum.photos/seed/pedal-de-efectos-mxr-phase-90/600/400",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Atril para Partituras On-Stage Stands",
    "price": 850,
    "category": "Accesorios",
    "brand": "On-Stage",
    "description": "Atril plegable de altura ajustable, ligero y fácil de transportar a ensayos.",
    "image": "https://picsum.photos/seed/atril-para-partituras-on-stage-stands/600/400",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Soporte para Teclado Ultimate Support",
    "price": 1900,
    "category": "Accesorios",
    "brand": "Ultimate Support",
    "description": "Soporte en X de altura ajustable, estable y plegable para teclados y pianos digitales.",
    "image": "https://picsum.photos/seed/soporte-para-teclado-ultimate-support/600/400",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Metronomo Korg MA-2",
    "price": 450,
    "category": "Accesorios",
    "brand": "Korg",
    "description": "Metrónomo compacto con múltiples ritmos y afinador de referencia integrado.",
    "image": "https://picsum.photos/seed/metronomo-korg-ma-2/600/400",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Audifonos de Estudio Sony MDR-7506",
    "price": 2900,
    "category": "Accesorios",
    "brand": "Sony",
    "description": "Audífonos cerrados de monitoreo profesional, estándar en estudios de grabación y broadcast.",
    "image": "https://picsum.photos/seed/audifonos-de-estudio-sony-mdr-7506/600/400",
    "stock": 26,
    "featured": false
  }
];

module.exports = products;
