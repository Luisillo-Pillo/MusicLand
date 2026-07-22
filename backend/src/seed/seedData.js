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
  }
];

module.exports = products;
