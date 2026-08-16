const products = [
  {
    "name": "Yamaha Clavinova Pro 260",
    "price": 49499.99,
    "stock": 11,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Clavinova en color natural, con acabado pro.",
    "category": "Pianos",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Yamaha DGX Custom 442",
    "price": 5309.99,
    "stock": 11,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo DGX en color transparente, con acabado custom.",
    "category": "Teclados",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha FS Plus 626",
    "price": 3999.99,
    "stock": 13,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo FS en color vino, con acabado plus.",
    "category": "Guitarras Acústicas",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha YSL Edition 469",
    "price": 37829.99,
    "stock": 10,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo YSL en color azul océano, con acabado edition.",
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Recording Custom Edition 294",
    "price": 15309.99,
    "stock": 15,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Recording Custom en color rojo cereza, con acabado edition.",
    "category": "Baterías",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Stagepass Custom 109",
    "price": 9939.99,
    "stock": 15,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Stagepass en color gris metálico, con acabado custom.",
    "category": "Audio",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha TransAcoustic Signature 757",
    "price": 89189.99,
    "stock": 11,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo TransAcoustic en color negro, con acabado signature.",
    "category": "Pianos",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Modx Custom 310",
    "price": 38009.99,
    "stock": 19,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Modx en color vino, con acabado custom.",
    "category": "Teclados",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha APX II 56",
    "price": 15739.99,
    "stock": 14,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo APX en color sunburst, con acabado ii.",
    "category": "Guitarras Acústicas",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha YAS Plus 399",
    "price": 21019.99,
    "stock": 20,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo YAS en color sunburst, con acabado plus.",
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Rydeen Classic 373",
    "price": 17849.99,
    "stock": 14,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Rydeen en color rojo cereza, con acabado classic.",
    "category": "Baterías",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Stagepass Classic 756",
    "price": 7259.99,
    "stock": 17,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Stagepass en color vino, con acabado classic.",
    "category": "Audio",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha C3X Signature 234",
    "price": 127019.99,
    "stock": 10,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo C3X en color vino, con acabado signature.",
    "category": "Pianos",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 15
  },
  {
    "name": "Yamaha Genos Standard 420",
    "price": 14979.99,
    "stock": 13,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Genos en color rojo cereza, con acabado standard.",
    "category": "Teclados",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Storia Deluxe 681",
    "price": 12739.99,
    "stock": 20,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Storia en color azul océano, con acabado deluxe.",
    "category": "Guitarras Acústicas",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha YFL Elite 152",
    "price": 19319.99,
    "stock": 18,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo YFL en color natural, con acabado elite.",
    "category": "Instrumentos de Viento",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Rydeen Edition 418",
    "price": 25019.99,
    "stock": 12,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Rydeen en color transparente, con acabado edition.",
    "category": "Baterías",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha AG Custom 891",
    "price": 4079.99,
    "stock": 20,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo AG en color negro, con acabado custom.",
    "category": "Audio",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Telecaster Edition 75",
    "price": 42089.99,
    "stock": 19,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Telecaster en color transparente, con acabado edition.",
    "category": "Guitarras Eléctricas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Precision Bass Signature 891",
    "price": 66549.99,
    "stock": 20,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Precision Bass en color vino, con acabado signature.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Champion Signature 124",
    "price": 16039.99,
    "stock": 12,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Champion en color rojo cereza, con acabado signature.",
    "category": "Amplificadores",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Newporter Pro 522",
    "price": 24049.99,
    "stock": 18,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Newporter en color natural, con acabado pro.",
    "category": "Guitarras Acústicas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Stratocaster Vintage 633",
    "price": 26109.99,
    "stock": 15,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Stratocaster en color vino, con acabado vintage.",
    "category": "Guitarras Eléctricas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 20
  },
  {
    "name": "Fender Jazz Bass Pro 341",
    "price": 39319.99,
    "stock": 11,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Jazz Bass en color transparente, con acabado pro.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Blues Junior Vintage 69",
    "price": 13879.99,
    "stock": 19,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Blues Junior en color azul océano, con acabado vintage.",
    "category": "Amplificadores",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender CD-60S Custom 845",
    "price": 6739.99,
    "stock": 18,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo CD-60S en color dorado, con acabado custom.",
    "category": "Guitarras Acústicas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Telecaster Elite 979",
    "price": 56289.99,
    "stock": 14,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Telecaster en color dorado, con acabado elite.",
    "category": "Guitarras Eléctricas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender American Ultra Bass Edition 961",
    "price": 42359.99,
    "stock": 13,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo American Ultra Bass en color azul océano, con acabado edition.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Blues Junior Series 458",
    "price": 40889.99,
    "stock": 17,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Blues Junior en color rojo cereza, con acabado series.",
    "category": "Amplificadores",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender CD-60S Plus 75",
    "price": 13459.99,
    "stock": 19,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo CD-60S en color azul océano, con acabado plus.",
    "category": "Guitarras Acústicas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Jazzmaster Plus 235",
    "price": 9619.99,
    "stock": 20,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Jazzmaster en color transparente, con acabado plus.",
    "category": "Guitarras Eléctricas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Jazz Bass Plus 937",
    "price": 11889.99,
    "stock": 15,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Jazz Bass en color sunburst, con acabado plus.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Champion Plus 695",
    "price": 23909.99,
    "stock": 18,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Champion en color natural, con acabado plus.",
    "category": "Amplificadores",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Sonoran SE 813",
    "price": 16829.99,
    "stock": 16,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Sonoran en color azul océano, con acabado se.",
    "category": "Guitarras Acústicas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Telecaster Special 684",
    "price": 46079.99,
    "stock": 16,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Telecaster en color sunburst, con acabado special.",
    "category": "Guitarras Eléctricas",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Precision Bass X 699",
    "price": 49209.99,
    "stock": 20,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Precision Bass en color negro, con acabado x.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Les Paul Standard Standard 755",
    "price": 67419.99,
    "stock": 11,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Les Paul Standard en color gris metálico, con acabado standard.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Hummingbird II 559",
    "price": 64869.99,
    "stock": 16,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Hummingbird en color azul océano, con acabado ii.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Les Paul Studio Signature 265",
    "price": 134319.99,
    "stock": 11,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Les Paul Studio en color dorado, con acabado signature.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 25
  },
  {
    "name": "Gibson L-00 Special 677",
    "price": 119929.99,
    "stock": 10,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo L-00 en color negro, con acabado special.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Les Paul Standard Plus 426",
    "price": 85709.99,
    "stock": 13,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Les Paul Standard en color blanco perla, con acabado plus.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson L-00 Standard 398",
    "price": 20219.99,
    "stock": 16,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo L-00 en color blanco perla, con acabado standard.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson SG Standard X 443",
    "price": 112079.99,
    "stock": 18,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo SG Standard en color natural, con acabado x.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson L-00 Elite 313",
    "price": 41779.99,
    "stock": 10,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo L-00 en color azul océano, con acabado elite.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Les Paul Custom Standard 68",
    "price": 31269.99,
    "stock": 17,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Les Paul Custom en color rojo cereza, con acabado standard.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Hummingbird Standard 92",
    "price": 105139.99,
    "stock": 11,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Hummingbird en color vino, con acabado standard.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Les Paul Custom Custom 423",
    "price": 39989.99,
    "stock": 19,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Les Paul Custom en color azul océano, con acabado custom.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Hummingbird Standard 93",
    "price": 61929.99,
    "stock": 19,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Hummingbird en color transparente, con acabado standard.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Les Paul Custom Deluxe 219",
    "price": 108719.99,
    "stock": 15,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Les Paul Custom en color natural, con acabado deluxe.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson Hummingbird Signature 144",
    "price": 87169.99,
    "stock": 14,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Hummingbird en color gris metálico, con acabado signature.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson ES-335 Deluxe 19",
    "price": 82289.99,
    "stock": 19,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo ES-335 en color sunburst, con acabado deluxe.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson J-45 Custom 228",
    "price": 70589.99,
    "stock": 12,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo J-45 en color vino, con acabado custom.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson SG Standard Custom 388",
    "price": 60629.99,
    "stock": 17,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo SG Standard en color azul océano, con acabado custom.",
    "category": "Guitarras Eléctricas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gibson J-200 Pro 316",
    "price": 113179.99,
    "stock": 11,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo J-200 en color vino, con acabado pro.",
    "category": "Guitarras Acústicas",
    "brand": "Gibson",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Juno Signature 921",
    "price": 13569.99,
    "stock": 18,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Juno en color sunburst, con acabado signature.",
    "category": "Sintetizadores",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 30
  },
  {
    "name": "Roland TD-27 Signature 629",
    "price": 20799.99,
    "stock": 15,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-27 en color natural, con acabado signature.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland GO:KEYS Signature 510",
    "price": 13789.99,
    "stock": 10,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo GO:KEYS en color vino, con acabado signature.",
    "category": "Teclados",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland AIRA Edition 55",
    "price": 2069.99,
    "stock": 12,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo AIRA en color natural, con acabado edition.",
    "category": "Audio",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Fantom Classic 574",
    "price": 44699.99,
    "stock": 18,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Fantom en color dorado, con acabado classic.",
    "category": "Sintetizadores",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-17 Special 977",
    "price": 58459.99,
    "stock": 12,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-17 en color sunburst, con acabado special.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland FP-30X Studio 575",
    "price": 10189.99,
    "stock": 12,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo FP-30X en color transparente, con acabado studio.",
    "category": "Teclados",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland AIRA Vintage 930",
    "price": 18799.99,
    "stock": 10,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo AIRA en color rojo cereza, con acabado vintage.",
    "category": "Audio",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Fantom II 692",
    "price": 13349.99,
    "stock": 18,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Fantom en color azul océano, con acabado ii.",
    "category": "Sintetizadores",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland SPD-SX Elite 895",
    "price": 18109.99,
    "stock": 12,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo SPD-SX en color azul océano, con acabado elite.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Juno-DS Pro 764",
    "price": 37359.99,
    "stock": 16,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Juno-DS en color blanco perla, con acabado pro.",
    "category": "Teclados",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Rubix Signature 816",
    "price": 14629.99,
    "stock": 16,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Rubix en color blanco perla, con acabado signature.",
    "category": "Audio",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Jupiter SE 214",
    "price": 50469.99,
    "stock": 17,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Jupiter en color azul océano, con acabado se.",
    "category": "Sintetizadores",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland V-Drums Vintage 238",
    "price": 10329.99,
    "stock": 13,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo V-Drums en color azul océano, con acabado vintage.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Juno-DS Deluxe 895",
    "price": 7429.99,
    "stock": 14,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Juno-DS en color natural, con acabado deluxe.",
    "category": "Teclados",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Duo-Capture Series 349",
    "price": 18909.99,
    "stock": 11,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Duo-Capture en color vino, con acabado series.",
    "category": "Audio",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland Fantom Classic 995",
    "price": 59149.99,
    "stock": 10,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Fantom en color transparente, con acabado classic.",
    "category": "Sintetizadores",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-17 Edition 756",
    "price": 53039.99,
    "stock": 16,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-17 en color rojo cereza, con acabado edition.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Steinway Boston Special 931",
    "price": 1186059.99,
    "stock": 14,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Boston en color gris metálico, con acabado special.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 10
  },
  {
    "name": "Steinway Model B Edition 542",
    "price": 1692089.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model B en color negro, con acabado edition.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Essex II 451",
    "price": 451469.99,
    "stock": 20,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Essex en color rojo cereza, con acabado ii.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model O Deluxe 747",
    "price": 1655069.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model O en color sunburst, con acabado deluxe.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model O Edition 422",
    "price": 1360959.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model O en color rojo cereza, con acabado edition.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model D II 690",
    "price": 1713529.99,
    "stock": 20,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model D en color gris metálico, con acabado ii.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Essex Classic 592",
    "price": 786379.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Essex en color transparente, con acabado classic.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model B Vintage 225",
    "price": 973339.99,
    "stock": 19,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model B en color natural, con acabado vintage.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Boston Deluxe 462",
    "price": 991139.99,
    "stock": 13,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Boston en color dorado, con acabado deluxe.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Boston SE 684",
    "price": 472959.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Boston en color blanco perla, con acabado se.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Essex Deluxe 848",
    "price": 1730399.99,
    "stock": 13,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Essex en color sunburst, con acabado deluxe.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Essex Vintage 835",
    "price": 638739.99,
    "stock": 10,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Essex en color azul océano, con acabado vintage.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model B Plus 635",
    "price": 1582119.99,
    "stock": 11,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model B en color dorado, con acabado plus.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model M Edition 209",
    "price": 1391609.99,
    "stock": 16,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model M en color transparente, con acabado edition.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model M Series 161",
    "price": 1301289.99,
    "stock": 10,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model M en color azul océano, con acabado series.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model B Edition 190",
    "price": 1515959.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model B en color azul océano, con acabado edition.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model M Standard 265",
    "price": 1680339.99,
    "stock": 11,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model M en color vino, con acabado standard.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Steinway Model M Elite 693",
    "price": 1120149.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model M en color dorado, con acabado elite.",
    "category": "Pianos",
    "brand": "Steinway & Sons",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Casio SA- Deluxe 637",
    "price": 15139.99,
    "stock": 18,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo SA- en color dorado, con acabado deluxe.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CDP-S X 771",
    "price": 30989.99,
    "stock": 17,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo CDP-S en color blanco perla, con acabado x.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Casiotone Plus 794",
    "price": 14559.99,
    "stock": 17,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Casiotone en color natural, con acabado plus.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio AP- Plus 460",
    "price": 8249.99,
    "stock": 14,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo AP- en color natural, con acabado plus.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CT-X Signature 337",
    "price": 16349.99,
    "stock": 11,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo CT-X en color rojo cereza, con acabado signature.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Privia PX Elite 402",
    "price": 26129.99,
    "stock": 13,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo Privia PX en color azul océano, con acabado elite.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CT-X Edition 348",
    "price": 10919.99,
    "stock": 16,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo CT-X en color gris metálico, con acabado edition.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Privia PX II 408",
    "price": 32249.99,
    "stock": 19,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo Privia PX en color gris metálico, con acabado ii.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio SA- Pro 399",
    "price": 9899.99,
    "stock": 15,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo SA- en color transparente, con acabado pro.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CDP-S Series 561",
    "price": 27679.99,
    "stock": 18,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo CDP-S en color gris metálico, con acabado series.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio SA- Plus 234",
    "price": 6739.99,
    "stock": 17,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo SA- en color dorado, con acabado plus.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Privia PX Series 694",
    "price": 25699.99,
    "stock": 16,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo Privia PX en color rojo cereza, con acabado series.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio SA- Classic 951",
    "price": 4479.99,
    "stock": 19,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo SA- en color dorado, con acabado classic.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio AP- Pro 616",
    "price": 22369.99,
    "stock": 10,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo AP- en color gris metálico, con acabado pro.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CT-X Edition 897",
    "price": 9659.99,
    "stock": 10,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo CT-X en color blanco perla, con acabado edition.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CDP-S Series 226",
    "price": 19189.99,
    "stock": 15,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo CDP-S en color rojo cereza, con acabado series.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Casiotone Signature 268",
    "price": 15449.99,
    "stock": 17,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Casiotone en color gris metálico, con acabado signature.",
    "category": "Teclados",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Privia PX Standard 239",
    "price": 24859.99,
    "stock": 20,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo Privia PX en color rojo cereza, con acabado standard.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Minilogue Pro 214",
    "price": 47289.99,
    "stock": 19,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Minilogue en color azul océano, con acabado pro.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Pa1000 Plus 494",
    "price": 26769.99,
    "stock": 19,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Pa1000 en color blanco perla, con acabado plus.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Volca X 795",
    "price": 24709.99,
    "stock": 19,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Volca en color natural, con acabado x.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Kronos Classic 120",
    "price": 23679.99,
    "stock": 14,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Kronos en color natural, con acabado classic.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Prologue Series 87",
    "price": 35429.99,
    "stock": 20,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Prologue en color azul océano, con acabado series.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Pa1000 Special 880",
    "price": 27269.99,
    "stock": 11,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Pa1000 en color natural, con acabado special.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Minilogue Studio 448",
    "price": 38759.99,
    "stock": 11,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Minilogue en color vino, con acabado studio.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Nautilus Pro 852",
    "price": 20669.99,
    "stock": 16,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Nautilus en color gris metálico, con acabado pro.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg microKORG X 455",
    "price": 15459.99,
    "stock": 18,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo microKORG en color blanco perla, con acabado x.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Nautilus SE 456",
    "price": 32079.99,
    "stock": 19,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Nautilus en color dorado, con acabado se.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg microKORG Deluxe 860",
    "price": 51869.99,
    "stock": 14,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo microKORG en color azul océano, con acabado deluxe.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg SV-2 Plus 593",
    "price": 24759.99,
    "stock": 16,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo SV-2 en color dorado, con acabado plus.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg microKORG Pro 881",
    "price": 22609.99,
    "stock": 17,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo microKORG en color dorado, con acabado pro.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Pa1000 Studio 358",
    "price": 13509.99,
    "stock": 19,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Pa1000 en color natural, con acabado studio.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg microKORG Pro 980",
    "price": 16179.99,
    "stock": 13,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo microKORG en color vino, con acabado pro.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg SV-2 SE 786",
    "price": 12179.99,
    "stock": 17,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo SV-2 en color vino, con acabado se.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Prologue X 105",
    "price": 21129.99,
    "stock": 16,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Prologue en color negro, con acabado x.",
    "category": "Sintetizadores",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Korg Pa1000 Vintage 387",
    "price": 20099.99,
    "stock": 18,
    "description": "Teclado versátil con amplia biblioteca de sonidos, ideal para práctica, composición y presentaciones en vivo. Modelo Pa1000 en color transparente, con acabado vintage.",
    "category": "Teclados",
    "brand": "Korg",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/YamahaKeyboard-2.jpg/500px-YamahaKeyboard-2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Artcore Edition 348",
    "price": 21479.99,
    "stock": 17,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Artcore en color vino, con acabado edition.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Talman Bass Vintage 246",
    "price": 10789.99,
    "stock": 13,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Talman Bass en color natural, con acabado vintage.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Artcore Special 983",
    "price": 39539.99,
    "stock": 12,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Artcore en color vino, con acabado special.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez GSR II 293",
    "price": 32229.99,
    "stock": 18,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo GSR en color dorado, con acabado ii.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez RGA Vintage 862",
    "price": 14549.99,
    "stock": 13,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo RGA en color sunburst, con acabado vintage.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Talman Bass Classic 24",
    "price": 31639.99,
    "stock": 12,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Talman Bass en color natural, con acabado classic.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Artcore Standard 576",
    "price": 18859.99,
    "stock": 12,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Artcore en color negro, con acabado standard.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez BTB Special 597",
    "price": 16599.99,
    "stock": 17,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo BTB en color negro, con acabado special.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez AZ Deluxe 998",
    "price": 8269.99,
    "stock": 17,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo AZ en color blanco perla, con acabado deluxe.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez SR Bass Custom 513",
    "price": 9129.99,
    "stock": 20,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo SR Bass en color gris metálico, con acabado custom.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Prestige Standard 162",
    "price": 41699.99,
    "stock": 14,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Prestige en color blanco perla, con acabado standard.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez SR Bass Plus 581",
    "price": 33639.99,
    "stock": 19,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo SR Bass en color sunburst, con acabado plus.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez RGA Plus 399",
    "price": 25829.99,
    "stock": 17,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo RGA en color vino, con acabado plus.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Talman Bass Edition 592",
    "price": 28549.99,
    "stock": 19,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Talman Bass en color natural, con acabado edition.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez Prestige Special 650",
    "price": 15289.99,
    "stock": 20,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Prestige en color azul océano, con acabado special.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez SR Bass Classic 187",
    "price": 26099.99,
    "stock": 12,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo SR Bass en color azul océano, con acabado classic.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez RG Edition 715",
    "price": 32129.99,
    "stock": 14,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo RG en color dorado, con acabado edition.",
    "category": "Guitarras Eléctricas",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez SR Bass Plus 733",
    "price": 16539.99,
    "stock": 17,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo SR Bass en color natural, con acabado plus.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure SM57 Plus 816",
    "price": 27889.99,
    "stock": 19,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo SM57 en color natural, con acabado plus.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 35
  },
  {
    "name": "Shure Beta 58A Edition 567",
    "price": 8569.99,
    "stock": 12,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo Beta 58A en color sunburst, con acabado edition.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure MV7 Elite 71",
    "price": 6559.99,
    "stock": 14,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MV7 en color sunburst, con acabado elite.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure MV7 X 489",
    "price": 24389.99,
    "stock": 16,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MV7 en color sunburst, con acabado x.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure MV7 SE 92",
    "price": 21299.99,
    "stock": 16,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MV7 en color dorado, con acabado se.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure PGA58 Signature 103",
    "price": 8709.99,
    "stock": 20,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo PGA58 en color negro, con acabado signature.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure SM58 Signature 51",
    "price": 26929.99,
    "stock": 12,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo SM58 en color transparente, con acabado signature.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure BLX Wireless X 195",
    "price": 34899.99,
    "stock": 16,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo BLX Wireless en color natural, con acabado x.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure BLX Wireless Custom 366",
    "price": 14829.99,
    "stock": 15,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo BLX Wireless en color dorado, con acabado custom.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure SM57 Classic 431",
    "price": 24559.99,
    "stock": 14,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo SM57 en color rojo cereza, con acabado classic.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure KSM8 Standard 100",
    "price": 11629.99,
    "stock": 15,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo KSM8 en color dorado, con acabado standard.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure SM57 Series 854",
    "price": 34599.99,
    "stock": 20,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo SM57 en color vino, con acabado series.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure BLX Wireless Edition 202",
    "price": 18579.99,
    "stock": 19,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo BLX Wireless en color negro, con acabado edition.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure BLX Wireless X 218",
    "price": 10009.99,
    "stock": 12,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo BLX Wireless en color negro, con acabado x.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure MV7 X 134",
    "price": 1889.99,
    "stock": 20,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MV7 en color dorado, con acabado x.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure Beta 58A Classic 574",
    "price": 1369.99,
    "stock": 16,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo Beta 58A en color natural, con acabado classic.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure SM57 Plus 482",
    "price": 33199.99,
    "stock": 20,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo SM57 en color sunburst, con acabado plus.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Shure SM7B SE 531",
    "price": 24959.99,
    "stock": 16,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo SM7B en color natural, con acabado se.",
    "category": "Micrófonos",
    "brand": "Shure",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Reference SE 477",
    "price": 39879.99,
    "stock": 16,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Reference en color azul océano, con acabado se.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 20
  },
  {
    "name": "Pearl Roadshow Elite 292",
    "price": 52269.99,
    "stock": 16,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Roadshow en color sunburst, con acabado elite.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Masters Maple Signature 299",
    "price": 49659.99,
    "stock": 19,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Masters Maple en color negro, con acabado signature.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Decade Maple SE 467",
    "price": 39169.99,
    "stock": 15,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Decade Maple en color blanco perla, con acabado se.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Masters Maple Series 965",
    "price": 27019.99,
    "stock": 13,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Masters Maple en color dorado, con acabado series.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Midtown Plus 402",
    "price": 22079.99,
    "stock": 16,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Midtown en color transparente, con acabado plus.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Export Deluxe 732",
    "price": 60159.99,
    "stock": 16,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Export en color dorado, con acabado deluxe.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Reference Elite 997",
    "price": 11079.99,
    "stock": 18,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Reference en color dorado, con acabado elite.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Decade Maple Deluxe 905",
    "price": 56329.99,
    "stock": 11,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Decade Maple en color sunburst, con acabado deluxe.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Decade Maple X 749",
    "price": 17079.99,
    "stock": 20,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Decade Maple en color negro, con acabado x.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Roadshow Custom 810",
    "price": 63279.99,
    "stock": 15,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Roadshow en color dorado, con acabado custom.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Decade Maple Series 882",
    "price": 27399.99,
    "stock": 20,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Decade Maple en color sunburst, con acabado series.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Decade Maple Series 651",
    "price": 49249.99,
    "stock": 17,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Decade Maple en color rojo cereza, con acabado series.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Decade Maple Standard 80",
    "price": 22149.99,
    "stock": 20,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Decade Maple en color transparente, con acabado standard.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Masters Maple Plus 454",
    "price": 63789.99,
    "stock": 20,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Masters Maple en color sunburst, con acabado plus.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Midtown Special 180",
    "price": 47869.99,
    "stock": 10,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Midtown en color dorado, con acabado special.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Export Deluxe 310",
    "price": 29079.99,
    "stock": 16,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Export en color negro, con acabado deluxe.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Pearl Roadshow Plus 431",
    "price": 40699.99,
    "stock": 12,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Roadshow en color vino, con acabado plus.",
    "category": "Baterías",
    "brand": "Pearl",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian K Custom Classic 634",
    "price": 12429.99,
    "stock": 19,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo K Custom en color sunburst, con acabado classic.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian I Family Plus 944",
    "price": 8919.99,
    "stock": 13,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo I Family en color dorado, con acabado plus.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian Avedis Signature 271",
    "price": 9939.99,
    "stock": 17,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo Avedis en color dorado, con acabado signature.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Zildjian Classic 462",
    "price": 13339.99,
    "stock": 19,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Zildjian en color sunburst, con acabado classic.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Zildjian Edition 477",
    "price": 12119.99,
    "stock": 13,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Zildjian en color natural, con acabado edition.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian Avedis SE 252",
    "price": 6459.99,
    "stock": 15,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo Avedis en color sunburst, con acabado se.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian FX Vintage 32",
    "price": 13739.99,
    "stock": 20,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo FX en color natural, con acabado vintage.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian Avedis Signature 589",
    "price": 12359.99,
    "stock": 10,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo Avedis en color negro, con acabado signature.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian FX SE 804",
    "price": 11549.99,
    "stock": 19,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo FX en color natural, con acabado se.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian Kerope Studio 661",
    "price": 4119.99,
    "stock": 14,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo Kerope en color azul océano, con acabado studio.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian I Family Elite 935",
    "price": 9459.99,
    "stock": 10,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo I Family en color sunburst, con acabado elite.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Zildjian X 603",
    "price": 6259.99,
    "stock": 12,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Zildjian en color negro, con acabado x.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Custom Vintage 775",
    "price": 6869.99,
    "stock": 13,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Custom en color rojo cereza, con acabado vintage.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian K Custom Studio 523",
    "price": 12949.99,
    "stock": 12,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo K Custom en color vino, con acabado studio.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Zildjian SE 774",
    "price": 12419.99,
    "stock": 11,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Zildjian en color natural, con acabado se.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian Avedis Custom 782",
    "price": 13599.99,
    "stock": 20,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo Avedis en color blanco perla, con acabado custom.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian I Family Series 384",
    "price": 2909.99,
    "stock": 16,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo I Family en color vino, con acabado series.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Electromatic Signature 136",
    "price": 35019.99,
    "stock": 20,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Electromatic en color vino, con acabado signature.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Broadkaster Series 120",
    "price": 36299.99,
    "stock": 17,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Broadkaster en color rojo cereza, con acabado series.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Electromatic Deluxe 236",
    "price": 45629.99,
    "stock": 20,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Electromatic en color transparente, con acabado deluxe.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Energy Vintage 129",
    "price": 17039.99,
    "stock": 10,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Energy en color gris metálico, con acabado vintage.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch White Falcon SE 109",
    "price": 22919.99,
    "stock": 18,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo White Falcon en color sunburst, con acabado se.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Renown Series 389",
    "price": 36139.99,
    "stock": 18,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Renown en color dorado, con acabado series.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch G5420 Elite 680",
    "price": 15449.99,
    "stock": 17,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo G5420 en color gris metálico, con acabado elite.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Energy Signature 716",
    "price": 25339.99,
    "stock": 17,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Energy en color negro, con acabado signature.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch G5420 Plus 111",
    "price": 63959.99,
    "stock": 15,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo G5420 en color rojo cereza, con acabado plus.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Broadkaster Standard 292",
    "price": 18839.99,
    "stock": 11,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Broadkaster en color gris metálico, con acabado standard.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch G5420 Custom 667",
    "price": 45179.99,
    "stock": 10,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo G5420 en color azul océano, con acabado custom.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Catalina Club Deluxe 138",
    "price": 40339.99,
    "stock": 13,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Catalina Club en color azul océano, con acabado deluxe.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Electromatic II 231",
    "price": 54719.99,
    "stock": 13,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Electromatic en color transparente, con acabado ii.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Broadkaster Elite 12",
    "price": 21989.99,
    "stock": 12,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Broadkaster en color transparente, con acabado elite.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Streamliner Signature 122",
    "price": 46359.99,
    "stock": 10,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo Streamliner en color blanco perla, con acabado signature.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch Renown Pro 818",
    "price": 40389.99,
    "stock": 19,
    "description": "Batería acústica con cascos de calidad y herrajes resistentes, lista para estudio o escenario. Modelo Renown en color rojo cereza, con acabado pro.",
    "category": "Baterías",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg/500px-Ringo_Starr%27s_Ludwig_Downbeat_Four-piece_drum_set_with_cymbals_%281963%29_-_Play_It_Loud._MET_%282019-05-13_18.37.59_by_Eden%2C_Janine_and_Jim%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Gretsch White Falcon Pro 281",
    "price": 12889.99,
    "stock": 16,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo White Falcon en color blanco perla, con acabado pro.",
    "category": "Guitarras Eléctricas",
    "brand": "Gretsch",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin HD-28 Special 497",
    "price": 66559.99,
    "stock": 15,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo HD-28 en color sunburst, con acabado special.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin HD-28 Special 525",
    "price": 40479.99,
    "stock": 19,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo HD-28 en color dorado, con acabado special.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin D-28 Vintage 668",
    "price": 125869.99,
    "stock": 10,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo D-28 en color dorado, con acabado vintage.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 15
  },
  {
    "name": "Martin OM-28 Series 712",
    "price": 27419.99,
    "stock": 17,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo OM-28 en color gris metálico, con acabado series.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin D-28 Custom 632",
    "price": 32059.99,
    "stock": 12,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo D-28 en color rojo cereza, con acabado custom.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin D-18 Deluxe 621",
    "price": 76019.99,
    "stock": 17,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo D-18 en color gris metálico, con acabado deluxe.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin HD-28 Edition 822",
    "price": 95709.99,
    "stock": 20,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo HD-28 en color sunburst, con acabado edition.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin D Junior II 472",
    "price": 117139.99,
    "stock": 16,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo D Junior en color gris metálico, con acabado ii.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin D-18 X 435",
    "price": 98909.99,
    "stock": 15,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo D-18 en color gris metálico, con acabado x.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin OM-28 Deluxe 393",
    "price": 124669.99,
    "stock": 20,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo OM-28 en color natural, con acabado deluxe.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin OM-28 Custom 861",
    "price": 24819.99,
    "stock": 16,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo OM-28 en color sunburst, con acabado custom.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin D-28 Studio 579",
    "price": 21899.99,
    "stock": 18,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo D-28 en color blanco perla, con acabado studio.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin HD-28 Deluxe 430",
    "price": 55669.99,
    "stock": 20,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo HD-28 en color sunburst, con acabado deluxe.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin OM-28 Standard 624",
    "price": 50939.99,
    "stock": 11,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo OM-28 en color natural, con acabado standard.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin HD-28 II 682",
    "price": 70459.99,
    "stock": 11,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo HD-28 en color blanco perla, con acabado ii.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin D-18 Studio 790",
    "price": 47039.99,
    "stock": 13,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo D-18 en color sunburst, con acabado studio.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Martin OM-28 Pro 961",
    "price": 90659.99,
    "stock": 14,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo OM-28 en color transparente, con acabado pro.",
    "category": "Guitarras Acústicas",
    "brand": "Martin (C.F. Martin & Co.)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor 114ce Classic 729",
    "price": 88149.99,
    "stock": 15,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo 114ce en color natural, con acabado classic.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 25
  },
  {
    "name": "Taylor GS Mini Pro 900",
    "price": 31179.99,
    "stock": 20,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo GS Mini en color blanco perla, con acabado pro.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor American Dream Custom 768",
    "price": 76259.99,
    "stock": 10,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo American Dream en color blanco perla, con acabado custom.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor 114ce II 439",
    "price": 59739.99,
    "stock": 12,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo 114ce en color gris metálico, con acabado ii.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor GS Mini Vintage 805",
    "price": 104609.99,
    "stock": 19,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo GS Mini en color rojo cereza, con acabado vintage.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor 114ce Standard 171",
    "price": 87409.99,
    "stock": 10,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo 114ce en color blanco perla, con acabado standard.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor 812ce Custom 463",
    "price": 78899.99,
    "stock": 17,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo 812ce en color natural, con acabado custom.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor Academy 12 X 289",
    "price": 37839.99,
    "stock": 18,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Academy 12 en color gris metálico, con acabado x.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor 114ce Studio 123",
    "price": 44059.99,
    "stock": 20,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo 114ce en color gris metálico, con acabado studio.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor Academy 12 SE 693",
    "price": 46379.99,
    "stock": 13,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Academy 12 en color vino, con acabado se.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor American Dream Standard 219",
    "price": 45739.99,
    "stock": 13,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo American Dream en color negro, con acabado standard.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor 214ce Signature 345",
    "price": 29039.99,
    "stock": 17,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo 214ce en color natural, con acabado signature.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor 812ce Edition 142",
    "price": 52979.99,
    "stock": 13,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo 812ce en color blanco perla, con acabado edition.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor Academy 12 Studio 416",
    "price": 97289.99,
    "stock": 10,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Academy 12 en color sunburst, con acabado studio.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor American Dream Pro 953",
    "price": 25169.99,
    "stock": 15,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo American Dream en color dorado, con acabado pro.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor Academy 12 Edition 424",
    "price": 83279.99,
    "stock": 16,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo Academy 12 en color transparente, con acabado edition.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Taylor GS Mini Special 31",
    "price": 106899.99,
    "stock": 12,
    "description": "Guitarra acústica con cuerpo resonante y acabado cuidado, perfecta para grabación y presentaciones en vivo. Modelo GS Mini en color gris metálico, con acabado special.",
    "category": "Guitarras Acústicas",
    "brand": "Taylor Guitars",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gibson_SJ200.jpg/500px-Gibson_SJ200.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Signature Clarinet X 100",
    "price": 54799.99,
    "stock": 11,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Signature Clarinet en color rojo cereza, con acabado x.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Series III Edition 420",
    "price": 63349.99,
    "stock": 16,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Series III en color transparente, con acabado edition.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer AS42 Deluxe 351",
    "price": 88359.99,
    "stock": 11,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo AS42 en color azul océano, con acabado deluxe.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Signature Clarinet Special 532",
    "price": 31009.99,
    "stock": 15,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Signature Clarinet en color vino, con acabado special.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer AS42 Elite 115",
    "price": 26359.99,
    "stock": 13,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo AS42 en color azul océano, con acabado elite.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Series III Elite 191",
    "price": 105229.99,
    "stock": 20,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Series III en color sunburst, con acabado elite.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer TS44 X 788",
    "price": 68789.99,
    "stock": 20,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo TS44 en color transparente, con acabado x.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Signature Clarinet Deluxe 164",
    "price": 55099.99,
    "stock": 17,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Signature Clarinet en color rojo cereza, con acabado deluxe.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer TS44 Vintage 615",
    "price": 17509.99,
    "stock": 18,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo TS44 en color natural, con acabado vintage.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Reference 54 Vintage 472",
    "price": 15689.99,
    "stock": 15,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Reference 54 en color dorado, con acabado vintage.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer AS42 Custom 639",
    "price": 70219.99,
    "stock": 16,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo AS42 en color sunburst, con acabado custom.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer TS44 Standard 940",
    "price": 91369.99,
    "stock": 20,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo TS44 en color dorado, con acabado standard.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Series III Deluxe 497",
    "price": 61139.99,
    "stock": 10,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Series III en color transparente, con acabado deluxe.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer TS44 Special 741",
    "price": 20269.99,
    "stock": 20,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo TS44 en color rojo cereza, con acabado special.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Series III Standard 734",
    "price": 54909.99,
    "stock": 17,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Series III en color azul océano, con acabado standard.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer Signature Clarinet Classic 391",
    "price": 101959.99,
    "stock": 16,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo Signature Clarinet en color rojo cereza, con acabado classic.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Selmer TS44 Deluxe 63",
    "price": 89349.99,
    "stock": 20,
    "description": "Instrumento de viento con afinación estable y respuesta cómoda en todos los registros. Modelo TS44 en color transparente, con acabado deluxe.",
    "category": "Instrumentos de Viento",
    "brand": "Selmer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Yamaha_Trumpet_YTR-8335LA_crop.jpg/500px-Yamaha_Trumpet_YTR-8335LA_crop.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Origin20 Custom 106",
    "price": 35689.99,
    "stock": 16,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Origin20 en color rojo cereza, con acabado custom.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 30
  },
  {
    "name": "Marshall Origin20 Signature 904",
    "price": 13279.99,
    "stock": 11,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Origin20 en color transparente, con acabado signature.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Code Elite 327",
    "price": 58229.99,
    "stock": 20,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Code en color rojo cereza, con acabado elite.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall MG Series Elite 735",
    "price": 56599.99,
    "stock": 14,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo MG Series en color transparente, con acabado elite.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Code Series 842",
    "price": 12029.99,
    "stock": 20,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Code en color rojo cereza, con acabado series.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Code Custom 530",
    "price": 24909.99,
    "stock": 15,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Code en color gris metálico, con acabado custom.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Origin20 Classic 359",
    "price": 57129.99,
    "stock": 17,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Origin20 en color azul océano, con acabado classic.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall JCM800 Plus 168",
    "price": 9249.99,
    "stock": 11,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo JCM800 en color blanco perla, con acabado plus.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Code Standard 907",
    "price": 47149.99,
    "stock": 12,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Code en color rojo cereza, con acabado standard.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Code Series 176",
    "price": 14949.99,
    "stock": 19,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Code en color blanco perla, con acabado series.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall JCM800 X 430",
    "price": 25039.99,
    "stock": 13,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo JCM800 en color negro, con acabado x.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall MG Series Vintage 249",
    "price": 34379.99,
    "stock": 14,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo MG Series en color dorado, con acabado vintage.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall MG Series II 704",
    "price": 57099.99,
    "stock": 17,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo MG Series en color rojo cereza, con acabado ii.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall MG Series Vintage 524",
    "price": 34019.99,
    "stock": 12,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo MG Series en color gris metálico, con acabado vintage.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall JCM800 Elite 63",
    "price": 40269.99,
    "stock": 15,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo JCM800 en color natural, con acabado elite.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall Code Special 881",
    "price": 11859.99,
    "stock": 11,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo Code en color vino, con acabado special.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Marshall JCM800 Signature 937",
    "price": 33239.99,
    "stock": 16,
    "description": "Amplificador con tono cálido y controles intuitivos, ideal tanto para ensayo como para conciertos. Modelo JCM800 en color dorado, con acabado signature.",
    "category": "Amplificadores",
    "brand": "Marshall",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marshall_5005_Lead_12_Mini-stack_White.jpg/500px-Marshall_5005_Lead_12_Mini-stack_White.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 330 Plus 915",
    "price": 55979.99,
    "stock": 10,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 330 en color dorado, con acabado plus.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 4003 Bass Standard 524",
    "price": 57439.99,
    "stock": 16,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 4003 Bass en color gris metálico, con acabado standard.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 330 Studio 38",
    "price": 54129.99,
    "stock": 11,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 330 en color azul océano, con acabado studio.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 620 Elite 49",
    "price": 52219.99,
    "stock": 17,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 620 en color blanco perla, con acabado elite.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 360 SE 640",
    "price": 35319.99,
    "stock": 11,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 360 en color dorado, con acabado se.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 330 Signature 865",
    "price": 43979.99,
    "stock": 19,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 330 en color azul océano, con acabado signature.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 325 Edition 804",
    "price": 52289.99,
    "stock": 14,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 325 en color sunburst, con acabado edition.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 330 Standard 439",
    "price": 73339.99,
    "stock": 19,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 330 en color azul océano, con acabado standard.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 4003 Bass Custom 866",
    "price": 89309.99,
    "stock": 19,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 4003 Bass en color sunburst, con acabado custom.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 325 Pro 598",
    "price": 49519.99,
    "stock": 12,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 325 en color vino, con acabado pro.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 620 Edition 639",
    "price": 56169.99,
    "stock": 19,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 620 en color negro, con acabado edition.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 4003 Bass Classic 546",
    "price": 93479.99,
    "stock": 11,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 4003 Bass en color sunburst, con acabado classic.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 325 Pro 904",
    "price": 63209.99,
    "stock": 20,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 325 en color gris metálico, con acabado pro.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 4003 Bass Studio 775",
    "price": 35979.99,
    "stock": 11,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 4003 Bass en color natural, con acabado studio.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 620 Plus 800",
    "price": 69919.99,
    "stock": 15,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 620 en color sunburst, con acabado plus.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 360 Standard 569",
    "price": 55319.99,
    "stock": 20,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 360 en color rojo cereza, con acabado standard.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Rickenbacker 360 X 656",
    "price": 45939.99,
    "stock": 12,
    "description": "Guitarra eléctrica con pastillas de alta definición y acabado premium, pensada para escenarios exigentes. Modelo 360 en color dorado, con acabado x.",
    "category": "Guitarras Eléctricas",
    "brand": "Rickenbacker",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Black_Strat.jpg/500px-Black_Strat.jpg",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 200 X 310",
    "price": 842709.99,
    "stock": 13,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 200 en color negro, con acabado x.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 200 Deluxe 537",
    "price": 1176989.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 200 en color natural, con acabado deluxe.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 130 Signature 781",
    "price": 1599739.99,
    "stock": 14,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 130 en color negro, con acabado signature.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 280 Standard 289",
    "price": 711609.99,
    "stock": 15,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 280 en color rojo cereza, con acabado standard.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 130 Series 926",
    "price": 2126019.99,
    "stock": 15,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 130 en color dorado, con acabado series.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 214VC SE 386",
    "price": 2071329.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 214VC en color dorado, con acabado se.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 280 Custom 90",
    "price": 1232039.99,
    "stock": 12,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 280 en color gris metálico, con acabado custom.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 280 Deluxe 91",
    "price": 1057469.99,
    "stock": 14,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 280 en color sunburst, con acabado deluxe.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 280 X 744",
    "price": 1224399.99,
    "stock": 17,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 280 en color transparente, con acabado x.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 280 X 754",
    "price": 1979069.99,
    "stock": 15,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 280 en color negro, con acabado x.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 130 Signature 86",
    "price": 1641019.99,
    "stock": 16,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 130 en color negro, con acabado signature.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 280 Classic 156",
    "price": 1942739.99,
    "stock": 20,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 280 en color negro, con acabado classic.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 130 Standard 78",
    "price": 901199.99,
    "stock": 20,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 130 en color blanco perla, con acabado standard.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 280 Studio 982",
    "price": 1464319.99,
    "stock": 19,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 280 en color gris metálico, con acabado studio.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 214VC X 390",
    "price": 1254699.99,
    "stock": 11,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 214VC en color rojo cereza, con acabado x.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 214VC Studio 331",
    "price": 1604259.99,
    "stock": 13,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 214VC en color gris metálico, con acabado studio.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Bösendorfer Model 200 Pro 521",
    "price": 1380169.99,
    "stock": 18,
    "description": "Piano de calidad profesional con mecanismo de acción refinado, ideal para intérpretes exigentes y espacios de concierto o estudio. Modelo Model 200 en color blanco perla, con acabado pro.",
    "category": "Pianos",
    "brand": "Bösendorfer",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Steinway_Vienna_002.JPG/500px-Steinway_Vienna_002.JPG",
    "discountPercent": 0
  },
  {
    "name": "Moog Subsequent 37 Signature 730",
    "price": 46809.99,
    "stock": 19,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Subsequent 37 en color natural, con acabado signature.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Grandmother SE 135",
    "price": 22589.99,
    "stock": 11,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Grandmother en color azul océano, con acabado se.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Matriarch Classic 99",
    "price": 75229.99,
    "stock": 15,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Matriarch en color dorado, con acabado classic.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog DFAM Studio 573",
    "price": 54289.99,
    "stock": 14,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo DFAM en color sunburst, con acabado studio.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Minimoog Model D Classic 530",
    "price": 29499.99,
    "stock": 13,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Minimoog Model D en color rojo cereza, con acabado classic.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Minimoog Model D Plus 36",
    "price": 40149.99,
    "stock": 19,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Minimoog Model D en color dorado, con acabado plus.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Grandmother X 142",
    "price": 59739.99,
    "stock": 11,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Grandmother en color vino, con acabado x.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Subsequent 37 Vintage 744",
    "price": 68079.99,
    "stock": 18,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Subsequent 37 en color gris metálico, con acabado vintage.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Matriarch Edition 85",
    "price": 21779.99,
    "stock": 15,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Matriarch en color transparente, con acabado edition.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog DFAM Custom 487",
    "price": 65049.99,
    "stock": 15,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo DFAM en color dorado, con acabado custom.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Minimoog Model D Classic 453",
    "price": 51229.99,
    "stock": 10,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Minimoog Model D en color blanco perla, con acabado classic.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Subsequent 37 Elite 178",
    "price": 24639.99,
    "stock": 13,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Subsequent 37 en color natural, con acabado elite.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Grandmother Vintage 266",
    "price": 27319.99,
    "stock": 18,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Grandmother en color sunburst, con acabado vintage.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Grandmother Elite 639",
    "price": 53619.99,
    "stock": 18,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Grandmother en color natural, con acabado elite.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog DFAM Classic 974",
    "price": 57299.99,
    "stock": 12,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo DFAM en color transparente, con acabado classic.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog DFAM Deluxe 52",
    "price": 76369.99,
    "stock": 10,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo DFAM en color transparente, con acabado deluxe.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Moog Subsequent 37 Standard 281",
    "price": 62789.99,
    "stock": 19,
    "description": "Sintetizador con motor de sonido versátil, ideal para producción musical moderna y presentaciones en vivo. Modelo Subsequent 37 en color transparente, con acabado standard.",
    "category": "Sintetizadores",
    "brand": "Moog",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/R.A.Moog_minimoog_2.jpg/500px-R.A.Moog_minimoog_2.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser EW 100 Pro 920",
    "price": 19269.99,
    "stock": 14,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo EW 100 en color dorado, con acabado pro.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser HD 280 Pro SE 834",
    "price": 17939.99,
    "stock": 16,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo HD 280 Pro en color azul océano, con acabado se.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser MD 421 X 715",
    "price": 2929.99,
    "stock": 17,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MD 421 en color sunburst, con acabado x.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser MKE 200 SE 218",
    "price": 8079.99,
    "stock": 12,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo MKE 200 en color dorado, con acabado se.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser MD 421 Deluxe 418",
    "price": 4969.99,
    "stock": 15,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MD 421 en color rojo cereza, con acabado deluxe.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser HD 25 Deluxe 487",
    "price": 3489.99,
    "stock": 17,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo HD 25 en color azul océano, con acabado deluxe.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser e945 Elite 61",
    "price": 9559.99,
    "stock": 16,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo e945 en color sunburst, con acabado elite.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser MKE 200 Plus 843",
    "price": 7809.99,
    "stock": 19,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo MKE 200 en color blanco perla, con acabado plus.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser MD 421 II 520",
    "price": 29889.99,
    "stock": 17,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MD 421 en color blanco perla, con acabado ii.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser MKE 200 Vintage 33",
    "price": 2809.99,
    "stock": 16,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo MKE 200 en color dorado, con acabado vintage.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser EW 100 Plus 607",
    "price": 11369.99,
    "stock": 10,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo EW 100 en color azul océano, con acabado plus.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser HD 280 Pro SE 913",
    "price": 18689.99,
    "stock": 20,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo HD 280 Pro en color transparente, con acabado se.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser EW 100 Vintage 18",
    "price": 25599.99,
    "stock": 16,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo EW 100 en color vino, con acabado vintage.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser Profile Signature 792",
    "price": 9409.99,
    "stock": 10,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Profile en color rojo cereza, con acabado signature.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser EW 100 Standard 585",
    "price": 6809.99,
    "stock": 18,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo EW 100 en color transparente, con acabado standard.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser HD 280 Pro Custom 526",
    "price": 10409.99,
    "stock": 18,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo HD 280 Pro en color gris metálico, con acabado custom.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser MD 421 Special 109",
    "price": 12549.99,
    "stock": 15,
    "description": "Micrófono profesional con captación clara y consistente, apto para voz e instrumentos en estudio o en vivo. Modelo MD 421 en color blanco perla, con acabado special.",
    "category": "Micrófonos",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Shure_mikrofon_55S.jpg/500px-Shure_mikrofon_55S.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-27 Series 779",
    "price": 57739.99,
    "stock": 19,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-27 en color azul océano, con acabado series.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland V-Drums Elite 401",
    "price": 45929.99,
    "stock": 15,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo V-Drums en color rojo cereza, con acabado elite.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland SPD-SX Series 855",
    "price": 35389.99,
    "stock": 19,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo SPD-SX en color natural, con acabado series.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-07 Vintage 785",
    "price": 26279.99,
    "stock": 12,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-07 en color gris metálico, con acabado vintage.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland SPD-SX Classic 429",
    "price": 16139.99,
    "stock": 10,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo SPD-SX en color negro, con acabado classic.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-27 X 510",
    "price": 53699.99,
    "stock": 20,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-27 en color dorado, con acabado x.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-17 SE 503",
    "price": 15109.99,
    "stock": 14,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-17 en color rojo cereza, con acabado se.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-27 Series 382",
    "price": 44379.99,
    "stock": 15,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-27 en color dorado, con acabado series.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland SPD-SX II 71",
    "price": 37019.99,
    "stock": 17,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo SPD-SX en color gris metálico, con acabado ii.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland V-Drums Standard 926",
    "price": 37139.99,
    "stock": 20,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo V-Drums en color transparente, con acabado standard.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-27 II 638",
    "price": 37769.99,
    "stock": 15,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-27 en color dorado, con acabado ii.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-27 Elite 876",
    "price": 22979.99,
    "stock": 16,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-27 en color dorado, con acabado elite.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland SPD-SX SE 823",
    "price": 35159.99,
    "stock": 11,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo SPD-SX en color azul océano, con acabado se.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-07 Signature 84",
    "price": 55949.99,
    "stock": 10,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-07 en color dorado, con acabado signature.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland SPD-SX Vintage 944",
    "price": 55349.99,
    "stock": 18,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo SPD-SX en color natural, con acabado vintage.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-17 Edition 318",
    "price": 52299.99,
    "stock": 15,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-17 en color gris metálico, con acabado edition.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Roland TD-17 X 669",
    "price": 41319.99,
    "stock": 11,
    "description": "Batería electrónica con parches sensibles y módulo de sonidos editables para práctica silenciosa o en vivo. Modelo TD-17 en color dorado, con acabado x.",
    "category": "Baterías Electrónicas",
    "brand": "Roland",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Roland_V-Drums_%282915493510%29.jpg/500px-Roland_V-Drums_%282915493510%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio AP- Classic 923",
    "price": 15819.99,
    "stock": 16,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo AP- en color gris metálico, con acabado classic.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Privia PX Special 976",
    "price": 20369.99,
    "stock": 17,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo Privia PX en color vino, con acabado special.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CDP-S II 87",
    "price": 30639.99,
    "stock": 19,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo CDP-S en color rojo cereza, con acabado ii.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CDP-S Pro 731",
    "price": 8029.99,
    "stock": 16,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo CDP-S en color natural, con acabado pro.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CDP-S Signature 440",
    "price": 15989.99,
    "stock": 16,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo CDP-S en color negro, con acabado signature.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio AP- Plus 803",
    "price": 10889.99,
    "stock": 13,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo AP- en color gris metálico, con acabado plus.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio Privia PX Elite 969",
    "price": 23539.99,
    "stock": 16,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo Privia PX en color rojo cereza, con acabado elite.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio PX-S Edition 61",
    "price": 24569.99,
    "stock": 14,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo PX-S en color dorado, con acabado edition.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio CDP-S II 943",
    "price": 20799.99,
    "stock": 19,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo CDP-S en color dorado, con acabado ii.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio PX-S Elite 819",
    "price": 27839.99,
    "stock": 15,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo PX-S en color natural, con acabado elite.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio PX-S Plus 265",
    "price": 32049.99,
    "stock": 20,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo PX-S en color blanco perla, con acabado plus.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio PX-S Special 374",
    "price": 17839.99,
    "stock": 16,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo PX-S en color azul océano, con acabado special.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Casio AP- Classic 610",
    "price": 30359.99,
    "stock": 10,
    "description": "Piano digital con teclas contrapesadas y sonido de piano acústico muestreado en alta resolución. Modelo AP- en color natural, con acabado classic.",
    "category": "Pianos Digitales",
    "brand": "Casio",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Digital-piano-423.jpg/500px-Digital-piano-423.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez GSR Custom 49",
    "price": 42119.99,
    "stock": 16,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo GSR en color vino, con acabado custom.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez GSR Series 78",
    "price": 41179.99,
    "stock": 12,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo GSR en color sunburst, con acabado series.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Precision Bass Plus 742",
    "price": 37929.99,
    "stock": 11,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Precision Bass en color negro, con acabado plus.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez GSR Vintage 32",
    "price": 20959.99,
    "stock": 10,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo GSR en color negro, con acabado vintage.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez SR Bass Special 362",
    "price": 18569.99,
    "stock": 19,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo SR Bass en color negro, con acabado special.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender American Ultra Bass Vintage 677",
    "price": 59069.99,
    "stock": 14,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo American Ultra Bass en color rojo cereza, con acabado vintage.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Fender Precision Bass Pro 500",
    "price": 28339.99,
    "stock": 12,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo Precision Bass en color dorado, con acabado pro.",
    "category": "Bajos Eléctricos",
    "brand": "Fender",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Ibanez BTB Pro 456",
    "price": 43109.99,
    "stock": 14,
    "description": "Bajo eléctrico con gran proyección de graves y ergonomía pensada para largas sesiones de tocada. Modelo BTB en color gris metálico, con acabado pro.",
    "category": "Bajos Eléctricos",
    "brand": "Ibanez",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Fender_Precision_Bass.jpg/500px-Fender_Precision_Bass.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha AG Series 740",
    "price": 8479.99,
    "stock": 12,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo AG en color negro, con acabado series.",
    "category": "Audio",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser HD 280 Pro Signature 910",
    "price": 7019.99,
    "stock": 18,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo HD 280 Pro en color natural, con acabado signature.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser HD 25 II 62",
    "price": 17299.99,
    "stock": 13,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo HD 25 en color vino, con acabado ii.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha Stagepass Signature 504",
    "price": 12489.99,
    "stock": 10,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Stagepass en color sunburst, con acabado signature.",
    "category": "Audio",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Yamaha AG Elite 447",
    "price": 10679.99,
    "stock": 18,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo AG en color sunburst, con acabado elite.",
    "category": "Audio",
    "brand": "Yamaha",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser Profile Custom 719",
    "price": 13219.99,
    "stock": 14,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Profile en color transparente, con acabado custom.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Sennheiser Profile SE 814",
    "price": 17309.99,
    "stock": 13,
    "description": "Equipo de audio profesional pensado para monitoreo y grabación con fidelidad de estudio. Modelo Profile en color rojo cereza, con acabado se.",
    "category": "Audio",
    "brand": "Sennheiser",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg/500px-PreSonus_Eris_E4.5_HD_Active_Studio_Monitor_with_popup_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian Avedis X 441",
    "price": 12129.99,
    "stock": 18,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo Avedis en color rojo cereza, con acabado x.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian Avedis Vintage 18",
    "price": 3599.99,
    "stock": 16,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo Avedis en color natural, con acabado vintage.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Custom Standard 810",
    "price": 11859.99,
    "stock": 10,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Custom en color azul océano, con acabado standard.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Custom Signature 377",
    "price": 10109.99,
    "stock": 15,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Custom en color dorado, con acabado signature.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  },
  {
    "name": "Zildjian A Custom Signature 564",
    "price": 4099.99,
    "stock": 11,
    "description": "Platillo con aleación de bronce de alta calidad, ofrece un brillo y sustain característicos. Modelo A Custom en color gris metálico, con acabado signature.",
    "category": "Platillos",
    "brand": "Zildjian",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ZildjianCustomRide.jpg/500px-ZildjianCustomRide.jpg",
    "discountPercent": 0
  }
];

module.exports = products;
