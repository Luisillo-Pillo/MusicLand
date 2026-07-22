const products = [
  {
    "name": "Yamaha Guitarra Serie 3",
    "price": 1925,
    "category": "Cuerdas",
    "brand": "Yamaha",
    "description": "Guitarra de alta calidad de Yamaha. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Fender Piano Serie 4",
    "price": 8750,
    "category": "Teclados",
    "brand": "Fender",
    "description": "Piano de alta calidad de Fender. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Gibson Violín Serie 2",
    "price": 4375,
    "category": "Cuerdas",
    "brand": "Gibson",
    "description": "Violín de alta calidad de Gibson. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Roland Batería Serie 1",
    "price": 5250,
    "category": "Percusión",
    "brand": "Roland",
    "description": "Batería de alta calidad de Roland. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Pearl Flauta Serie 5",
    "price": 1225,
    "category": "Vientos",
    "brand": "Pearl",
    "description": "Flauta de alta calidad de Pearl. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Ibanez Saxofón Serie 2",
    "price": 7000,
    "category": "Vientos",
    "brand": "Ibanez",
    "description": "Saxofón de alta calidad de Ibanez. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Martin Trompeta Serie 4",
    "price": 3325,
    "category": "Metales",
    "brand": "Martin",
    "description": "Trompeta de alta calidad de Martin. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Taylor Ukulele Serie 3",
    "price": 1575,
    "category": "Cuerdas",
    "brand": "Taylor",
    "description": "Ukulele de alta calidad de Taylor. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Epiphone Bajo Serie 1",
    "price": 2450,
    "category": "Cuerdas",
    "brand": "Epiphone",
    "description": "Bajo de alta calidad de Epiphone. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Donner Teclado Serie 5",
    "price": 4375,
    "category": "Teclados",
    "brand": "Donner",
    "description": "Teclado de alta calidad de Donner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Casio Cello Serie 2",
    "price": 5250,
    "category": "Cuerdas",
    "brand": "Casio",
    "description": "Cello de alta calidad de Casio. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Kawai Clarinete Serie 4",
    "price": 2800,
    "category": "Vientos",
    "brand": "Kawai",
    "description": "Clarinete de alta calidad de Kawai. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Steinway Armónica Serie 3",
    "price": 875,
    "category": "Vientos",
    "brand": "Steinway",
    "description": "Armónica de alta calidad de Steinway. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Hohner Banjo Serie 1",
    "price": 3325,
    "category": "Cuerdas",
    "brand": "Hohner",
    "description": "Banjo de alta calidad de Hohner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Selmer Mandolina Serie 5",
    "price": 4375,
    "category": "Cuerdas",
    "brand": "Selmer",
    "description": "Mandolina de alta calidad de Selmer. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Yamaha Arpa Serie 2",
    "price": 12250,
    "category": "Cuerdas",
    "brand": "Yamaha",
    "description": "Arpa de alta calidad de Yamaha. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Fender Trombón Serie 4",
    "price": 5250,
    "category": "Metales",
    "brand": "Fender",
    "description": "Trombón de alta calidad de Fender. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Gibson Oboe Serie 3",
    "price": 7000,
    "category": "Vientos",
    "brand": "Gibson",
    "description": "Oboe de alta calidad de Gibson. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Roland Tuba Serie 1",
    "price": 8750,
    "category": "Metales",
    "brand": "Roland",
    "description": "Tuba de alta calidad de Roland. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Pearl Xilófono Serie 5",
    "price": 2800,
    "category": "Percusión",
    "brand": "Pearl",
    "description": "Xilófono de alta calidad de Pearl. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Ibanez Guitarra Serie 2",
    "price": 5250,
    "category": "Cuerdas",
    "brand": "Ibanez",
    "description": "Guitarra de alta calidad de Ibanez. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Martin Piano Serie 4",
    "price": 12250,
    "category": "Teclados",
    "brand": "Martin",
    "description": "Piano de alta calidad de Martin. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Taylor Violín Serie 3",
    "price": 4375,
    "category": "Cuerdas",
    "brand": "Taylor",
    "description": "Violín de alta calidad de Taylor. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Epiphone Batería Serie 1",
    "price": 7000,
    "category": "Percusión",
    "brand": "Epiphone",
    "description": "Batería de alta calidad de Epiphone. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Donner Flauta Serie 5",
    "price": 1925,
    "category": "Vientos",
    "brand": "Donner",
    "description": "Flauta de alta calidad de Donner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Kawai Saxofón Serie 2",
    "price": 8750,
    "category": "Vientos",
    "brand": "Kawai",
    "description": "Saxofón de alta calidad de Kawai. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Steinway Trompeta Serie 4",
    "price": 5250,
    "category": "Metales",
    "brand": "Steinway",
    "description": "Trompeta de alta calidad de Steinway. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Hohner Ukulele Serie 3",
    "price": 1575,
    "category": "Cuerdas",
    "brand": "Hohner",
    "description": "Ukulele de alta calidad de Hohner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Selmer Bajo Serie 1",
    "price": 3500,
    "category": "Cuerdas",
    "brand": "Selmer",
    "description": "Bajo de alta calidad de Selmer. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Yamaha Teclado Serie 5",
    "price": 5250,
    "category": "Teclados",
    "brand": "Yamaha",
    "description": "Teclado de alta calidad de Yamaha. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Fender Cello Serie 2",
    "price": 7000,
    "category": "Cuerdas",
    "brand": "Fender",
    "description": "Cello de alta calidad de Fender. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Gibson Clarinete Serie 4",
    "price": 3325,
    "category": "Vientos",
    "brand": "Gibson",
    "description": "Clarinete de alta calidad de Gibson. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Roland Armónica Serie 3",
    "price": 1225,
    "category": "Vientos",
    "brand": "Roland",
    "description": "Armónica de alta calidad de Roland. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Pearl Banjo Serie 1",
    "price": 4375,
    "category": "Cuerdas",
    "brand": "Pearl",
    "description": "Banjo de alta calidad de Pearl. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Ibanez Mandolina Serie 5",
    "price": 5250,
    "category": "Cuerdas",
    "brand": "Ibanez",
    "description": "Mandolina de alta calidad de Ibanez. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Martin Arpa Serie 2",
    "price": 14000,
    "category": "Cuerdas",
    "brand": "Martin",
    "description": "Arpa de alta calidad de Martin. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Taylor Trombón Serie 4",
    "price": 6125,
    "category": "Metales",
    "brand": "Taylor",
    "description": "Trombón de alta calidad de Taylor. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Epiphone Oboe Serie 3",
    "price": 7875,
    "category": "Vientos",
    "brand": "Epiphone",
    "description": "Oboe de alta calidad de Epiphone. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Donner Tuba Serie 1",
    "price": 9625,
    "category": "Metales",
    "brand": "Donner",
    "description": "Tuba de alta calidad de Donner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Casio Xilófono Serie 5",
    "price": 3325,
    "category": "Percusión",
    "brand": "Casio",
    "description": "Xilófono de alta calidad de Casio. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Kawai Guitarra Serie 2",
    "price": 6125,
    "category": "Cuerdas",
    "brand": "Kawai",
    "description": "Guitarra de alta calidad de Kawai. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Steinway Piano Serie 4",
    "price": 14000,
    "category": "Teclados",
    "brand": "Steinway",
    "description": "Piano de alta calidad de Steinway. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Hohner Violín Serie 3",
    "price": 5250,
    "category": "Cuerdas",
    "brand": "Hohner",
    "description": "Violín de alta calidad de Hohner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Selmer Batería Serie 1",
    "price": 7875,
    "category": "Percusión",
    "brand": "Selmer",
    "description": "Batería de alta calidad de Selmer. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Yamaha Flauta Serie 5",
    "price": 2450,
    "category": "Vientos",
    "brand": "Yamaha",
    "description": "Flauta de alta calidad de Yamaha. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Fender Saxofón Serie 2",
    "price": 9625,
    "category": "Vientos",
    "brand": "Fender",
    "description": "Saxofón de alta calidad de Fender. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Gibson Trompeta Serie 4",
    "price": 6125,
    "category": "Metales",
    "brand": "Gibson",
    "description": "Trompeta de alta calidad de Gibson. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Roland Ukulele Serie 3",
    "price": 1925,
    "category": "Cuerdas",
    "brand": "Roland",
    "description": "Ukulele de alta calidad de Roland. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Pearl Bajo Serie 1",
    "price": 4375,
    "category": "Cuerdas",
    "brand": "Pearl",
    "description": "Bajo de alta calidad de Pearl. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Ibanez Teclado Serie 5",
    "price": 6125,
    "category": "Teclados",
    "brand": "Ibanez",
    "description": "Teclado de alta calidad de Ibanez. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Martin Cello Serie 2",
    "price": 7875,
    "category": "Cuerdas",
    "brand": "Martin",
    "description": "Cello de alta calidad de Martin. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Taylor Clarinete Serie 4",
    "price": 4375,
    "category": "Vientos",
    "brand": "Taylor",
    "description": "Clarinete de alta calidad de Taylor. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Epiphone Armónica Serie 3",
    "price": 1225,
    "category": "Vientos",
    "brand": "Epiphone",
    "description": "Armónica de alta calidad de Epiphone. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Donner Banjo Serie 1",
    "price": 5250,
    "category": "Cuerdas",
    "brand": "Donner",
    "description": "Banjo de alta calidad de Donner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Casio Mandolina Serie 5",
    "price": 6125,
    "category": "Cuerdas",
    "brand": "Casio",
    "description": "Mandolina de alta calidad de Casio. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Kawai Arpa Serie 2",
    "price": 15750,
    "category": "Cuerdas",
    "brand": "Kawai",
    "description": "Arpa de alta calidad de Kawai. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Steinway Trombón Serie 4",
    "price": 7000,
    "category": "Metales",
    "brand": "Steinway",
    "description": "Trombón de alta calidad de Steinway. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Hohner Oboe Serie 3",
    "price": 8750,
    "category": "Vientos",
    "brand": "Hohner",
    "description": "Oboe de alta calidad de Hohner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Selmer Tuba Serie 1",
    "price": 10500,
    "category": "Metales",
    "brand": "Selmer",
    "description": "Tuba de alta calidad de Selmer. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Yamaha Xilófono Serie 5",
    "price": 3500,
    "category": "Percusión",
    "brand": "Yamaha",
    "description": "Xilófono de alta calidad de Yamaha. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Fender Guitarra Serie 2",
    "price": 7000,
    "category": "Cuerdas",
    "brand": "Fender",
    "description": "Guitarra de alta calidad de Fender. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Gibson Piano Serie 4",
    "price": 15750,
    "category": "Teclados",
    "brand": "Gibson",
    "description": "Piano de alta calidad de Gibson. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Roland Violín Serie 3",
    "price": 6125,
    "category": "Cuerdas",
    "brand": "Roland",
    "description": "Violín de alta calidad de Roland. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Pearl Batería Serie 1",
    "price": 8750,
    "category": "Percusión",
    "brand": "Pearl",
    "description": "Batería de alta calidad de Pearl. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Ibanez Flauta Serie 5",
    "price": 2800,
    "category": "Vientos",
    "brand": "Ibanez",
    "description": "Flauta de alta calidad de Ibanez. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Martin Saxofón Serie 2",
    "price": 10500,
    "category": "Vientos",
    "brand": "Martin",
    "description": "Saxofón de alta calidad de Martin. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Taylor Trompeta Serie 4",
    "price": 7000,
    "category": "Metales",
    "brand": "Taylor",
    "description": "Trompeta de alta calidad de Taylor. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Epiphone Ukulele Serie 3",
    "price": 2450,
    "category": "Cuerdas",
    "brand": "Epiphone",
    "description": "Ukulele de alta calidad de Epiphone. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Donner Bajo Serie 1",
    "price": 5250,
    "category": "Cuerdas",
    "brand": "Donner",
    "description": "Bajo de alta calidad de Donner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Casio Teclado Serie 5",
    "price": 7000,
    "category": "Teclados",
    "brand": "Casio",
    "description": "Teclado de alta calidad de Casio. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Kawai Cello Serie 2",
    "price": 8750,
    "category": "Cuerdas",
    "brand": "Kawai",
    "description": "Cello de alta calidad de Kawai. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Steinway Clarinete Serie 4",
    "price": 5250,
    "category": "Vientos",
    "brand": "Steinway",
    "description": "Clarinete de alta calidad de Steinway. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Hohner Armónica Serie 3",
    "price": 1575,
    "category": "Vientos",
    "brand": "Hohner",
    "description": "Armónica de alta calidad de Hohner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Selmer Banjo Serie 1",
    "price": 6125,
    "category": "Cuerdas",
    "brand": "Selmer",
    "description": "Banjo de alta calidad de Selmer. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Yamaha Mandolina Serie 5",
    "price": 7000,
    "category": "Cuerdas",
    "brand": "Yamaha",
    "description": "Mandolina de alta calidad de Yamaha. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Ibanez Arpa Serie 2",
    "price": 17500,
    "category": "Cuerdas",
    "brand": "Ibanez",
    "description": "Arpa de alta calidad de Ibanez. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Martin Trombón Serie 4",
    "price": 7875,
    "category": "Metales",
    "brand": "Martin",
    "description": "Trombón de alta calidad de Martin. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Taylor Oboe Serie 3",
    "price": 9625,
    "category": "Vientos",
    "brand": "Taylor",
    "description": "Oboe de alta calidad de Taylor. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Epiphone Tuba Serie 1",
    "price": 12250,
    "category": "Metales",
    "brand": "Epiphone",
    "description": "Tuba de alta calidad de Epiphone. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Donner Xilófono Serie 5",
    "price": 4375,
    "category": "Percusión",
    "brand": "Donner",
    "description": "Xilófono de alta calidad de Donner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Casio Guitarra Serie 2",
    "price": 7875,
    "category": "Cuerdas",
    "brand": "Casio",
    "description": "Guitarra de alta calidad de Casio. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": true
  },
  {
    "name": "Kawai Piano Serie 4",
    "price": 17500,
    "category": "Teclados",
    "brand": "Kawai",
    "description": "Piano de alta calidad de Kawai. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Steinway Violín Serie 3",
    "price": 7000,
    "category": "Cuerdas",
    "brand": "Steinway",
    "description": "Violín de alta calidad de Steinway. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Hohner Batería Serie 1",
    "price": 9625,
    "category": "Percusión",
    "brand": "Hohner",
    "description": "Batería de alta calidad de Hohner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Selmer Flauta Serie 5",
    "price": 3500,
    "category": "Vientos",
    "brand": "Selmer",
    "description": "Flauta de alta calidad de Selmer. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Yamaha Saxofón Serie 2",
    "price": 12250,
    "category": "Vientos",
    "brand": "Yamaha",
    "description": "Saxofón de alta calidad de Yamaha. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Fender Trompeta Serie 4",
    "price": 7875,
    "category": "Metales",
    "brand": "Fender",
    "description": "Trompeta de alta calidad de Fender. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Gibson Ukulele Serie 3",
    "price": 2800,
    "category": "Cuerdas",
    "brand": "Gibson",
    "description": "Ukulele de alta calidad de Gibson. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Roland Bajo Serie 1",
    "price": 6125,
    "category": "Cuerdas",
    "brand": "Roland",
    "description": "Bajo de alta calidad de Roland. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Pearl Teclado Serie 5",
    "price": 7875,
    "category": "Teclados",
    "brand": "Pearl",
    "description": "Teclado de alta calidad de Pearl. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Ibanez Cello Serie 2",
    "price": 9625,
    "category": "Cuerdas",
    "brand": "Ibanez",
    "description": "Cello de alta calidad de Ibanez. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": true
  },
  {
    "name": "Martin Clarinete Serie 4",
    "price": 6125,
    "category": "Vientos",
    "brand": "Martin",
    "description": "Clarinete de alta calidad de Martin. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Taylor Armónica Serie 3",
    "price": 1925,
    "category": "Vientos",
    "brand": "Taylor",
    "description": "Armónica de alta calidad de Taylor. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/251/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Epiphone Banjo Serie 1",
    "price": 7000,
    "category": "Cuerdas",
    "brand": "Epiphone",
    "description": "Banjo de alta calidad de Epiphone. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/180/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Donner Mandolina Serie 5",
    "price": 7875,
    "category": "Cuerdas",
    "brand": "Donner",
    "description": "Mandolina de alta calidad de Donner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/367/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Casio Arpa Serie 2",
    "price": 19250,
    "category": "Cuerdas",
    "brand": "Casio",
    "description": "Arpa de alta calidad de Casio. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/669/300/200",
    "stock": 26,
    "featured": false
  },
  {
    "name": "Kawai Trombón Serie 4",
    "price": 8750,
    "category": "Metales",
    "brand": "Kawai",
    "description": "Trombón de alta calidad de Kawai. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/20/300/200",
    "stock": 5,
    "featured": false
  },
  {
    "name": "Steinway Oboe Serie 3",
    "price": 10500,
    "category": "Vientos",
    "brand": "Steinway",
    "description": "Oboe de alta calidad de Steinway. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/1015/300/200",
    "stock": 12,
    "featured": false
  },
  {
    "name": "Hohner Tuba Serie 1",
    "price": 12250,
    "category": "Metales",
    "brand": "Hohner",
    "description": "Tuba de alta calidad de Hohner. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/133/300/200",
    "stock": 19,
    "featured": false
  },
  {
    "name": "Selmer Xilófono Serie 5",
    "price": 5250,
    "category": "Percusión",
    "brand": "Selmer",
    "description": "Xilófono de alta calidad de Selmer. Ideal para principiantes y profesionales. Excelente sonido y durabilidad.",
    "image": "https://picsum.photos/id/201/300/200",
    "stock": 26,
    "featured": false
  }
];

module.exports = products;
