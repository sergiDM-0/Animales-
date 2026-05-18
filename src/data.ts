import type { AnimalInput } from "./types"

/** Datos iniciales para el script de seed (no se usa en la app en runtime). */
export const animals: AnimalInput[] = [
  {
    "name": "León",
    "scientificName": "Panthera leo",
    "description": "El león es un mamífero carnívoro de la familia de los félidos y una de las cinco especies del género Panthera. Los leones salvajes viven en poblaciones cada vez más dispersas y fragmentadas del África subsahariana y una pequeña zona del noroeste de la India.",
    "habitat": "Sabanas y pastizales",
    "diet": "Carnívoro",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/002_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/330px-002_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Panthera_leo",
    "category": "Mamífero"
  },
  {
    "name": "Elefante Africano",
    "scientificName": "Loxodonta africana",
    "description": "El elefante africano de sabana es un mamífero proboscídeo de la familia de los elefántidos. Es el animal terrestre más grande que existe en la actualidad. Se caracteriza por su gran inteligencia y fuertes lazos familiares.",
    "habitat": "Sabanas, bosques y desiertos",
    "diet": "Herbívoro",
    "image": "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800",
    "wikiUrl": "https://es.wikipedia.org/wiki/Loxodonta_africana",
    "category": "Mamífero"
  },
  {
    "name": "Pingüino Emperador",
    "scientificName": "Aptenodytes forsteri",
    "description": "El pingüino emperador es una especie de ave esfenisciforme de la familia Spheniscidae. Es el más grande y pesado de todos los pingüinos y es endémico de la Antártida.",
    "habitat": "Antártida",
    "diet": "Carnívoro (peces y crustáceos)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg/330px-Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Aptenodytes_forsteri",
    "category": "Ave"
  },
  {
    "name": "Tigre de Bengala",
    "scientificName": "Panthera tigris tigris",
    "description": "El tigre de Bengala es una subespecie de tigre que habita en la India, Nepal, Bangladés, Bután, Birmania y Tíbet. Es el tigre más numeroso y el animal nacional de la India y Bangladés.",
    "habitat": "Selvas tropicales y sabanas",
    "diet": "Carnívoro",
    "image": "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
    "wikiUrl": "https://es.wikipedia.org/wiki/Panthera_tigris_tigris",
    "category": "Mamífero"
  },
  {
    "name": "Águila Real",
    "scientificName": "Aquila chrysaetos",
    "description": "El águila real es una de las aves de presa más conocidas y ampliamente distribuidas de la Tierra. Como todas las águilas, pertenece a la familia Accipitridae.",
    "habitat": "Montañas y acantilados",
    "diet": "Carnívoro",
    "image": "https://plus.unsplash.com/premium_photo-1661876880987-ba2efad30296?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWd1aWxhJTIwcmVhbHxlbnwwfHwwfHx8MA%3D%3D",
    "wikiUrl": "https://es.wikipedia.org/wiki/Aquila_chrysaetos",
    "category": "Ave"
  },
  {
    "name": "Tortuga Verde",
    "scientificName": "Chelonia mydas",
    "description": "La tortuga verde es una especie de tortuga marina de la familia Cheloniidae. Es una de las tortugas marinas más grandes y la única que es principalmente herbívora cuando es adulta.",
    "habitat": "Océanos tropicales y subtropicales",
    "diet": "Herbívoro",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Hawaii_turtle_2.JPG/330px-Hawaii_turtle_2.JPG?utm_source=es.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "wikiUrl": "https://es.wikipedia.org/wiki/Chelonia_mydas",
    "category": "Reptil"
  },
  {
    "name": "Panda Gigante",
    "scientificName": "Ailuropoda melanoleuca",
    "description": "El panda, oso panda o panda gigante es una especie de mamífero del orden de los carnívoros y aunque hay gran controversia al respecto, los últimos estudios de su ADN lo engloban entre los miembros de la familia de los osos.",
    "habitat": "Bosques de bambú en China",
    "diet": "Herbívoro (principalmente bambú)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/330px-Grosser_Panda.JPG",
    "wikiUrl": "https://es.wikipedia.org/wiki/Ailuropoda_melanoleuca",
    "category": "Mamífero"
  },
  {
    "name": "Delfín Mular",
    "scientificName": "Tursiops truncatus",
    "description": "El delfín mular o delfín nariz de botella es una especie de cetáceo odontoceto de la familia Delphinidae. Es la especie de delfín más común y conocida.",
    "habitat": "Océanos cálidos y templados",
    "diet": "Carnívoro (peces y calamares)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/330px-Tursiops_truncatus_01.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Tursiops_truncatus",
    "category": "Mamífero"
  },
  {
    "name": "Rana Arborícola",
    "scientificName": "Hylidae",
    "description": "Las ranas arborícolas son anfibios fascinantes maravillosamente adaptados a la vida en las alturas. Se caracterizan por poseer discos adhesivos en las puntas de sus dedos, lo que les permite trepar y adherirse a troncos, ramas y hojas con gran destreza. Además de sus colores vibrantes, que a menudo utilizan como camuflaje o como señal de advertencia para los depredadores, destacan por sus potentes cantos nocturnos, fundamentales para la comunicación y el apareamiento en los ecosistemas húmedos.",
    "habitat": "Bosques tropicales y subtropicales",
    "diet": "Insectívoro",
    "image": "https://assets.epuzzle.info/puzzle/079/520/original.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Hylidae",
    "category": "Anfibio"
  },
  {
    "name": "Pez Payaso",
    "scientificName": "Amphiprioninae",
    "description": "El pez payaso es un pequeño pez marino mundialmente reconocido por su vibrante color naranja brillante cruzado por franjas blancas. Su rasgo más fascinante es la relación simbiótica que establece con las anémonas de mar: gracias a una capa de mucosa especial en su piel, es inmune a las toxinas de la anémona, usando sus tentáculos como refugio seguro contra depredadores mientras él mismo limpia y protege a la anémona. Además, tienen una jerarquía social única donde todos nacen machos y el individuo dominante puede cambiar de sexo a hembra.",
    "habitat": "Arrecifes de coral en los océanos Índico y Pacífico",
    "diet": "Omnívoro",
    "image": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV6JTIwcGF5YXNvfGVufDB8fDB8fHww",
    "wikiUrl": "https://es.wikipedia.org/wiki/Amphiprioninae",
    "category": "Pez"
  },
  {
    "name": "Mariposa Monarca",
    "scientificName": "Danaus plexippus",
    "description": "La mariposa monarca es uno de los insectos más reconocidos del mundo, famosa por sus inconfundibles alas de color naranja brillante con venas negras y bordes punteados de blanco. Esta llamativa coloración es una advertencia para los depredadores de que son venenosas, característica que adquieren en su etapa de oruga al alimentarse exclusivamente de la planta de algodoncillo. Además de su belleza, son mundialmente famosas por su increíble migración anual, realizando un viaje épico de miles de kilómetros desde Estados Unidos y Canadá hasta los bosques de oyamel en México para pasar el invierno.",
    "habitat": "Praderas, campos y bosques de Norteamérica (inverna en los bosques de oyamel de México)",
    "diet": "Herbívoro (Néctar de flores)",
    "image": "https://wallpapers.com/images/hd/male-orange-monarch-butterfly-close-up-shot-84khcbg379em2lue.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Danaus_plexippus",
    "category": "Invertebrado"
  },
  {
    "name": "Canguro",
    "scientificName": "Macropus",
    "description": "Los canguros son marsupiales endémicos de Australia, conocidos por sus fuertes patas traseras y su forma de moverse a saltos.",
    "habitat": "Llanuras y bosques en Australia",
    "diet": "Herbívoro",
    "image": "https://wallpapers.com/images/featured/canguro-9884nd4b35ojdy2t.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Macropus",
    "category": "Mamífero"
  },
  {
    "name": "Colibrí",
    "scientificName": "Trochilidae",
    "description": "Los colibríes son aves pequeñas conocidas por su capacidad de volar en el mismo sitio y por alimentarse principalmente del néctar de las flores.",
    "habitat": "América (desde Alaska hasta Tierra del Fuego)",
    "diet": "Nectarívoro",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cuban_emerald_%28Chlorostilbon_ricordii_ricordii%29_male_cr.jpg/330px-Cuban_emerald_%28Chlorostilbon_ricordii_ricordii%29_male_cr.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Trochilidae",
    "category": "Ave"
  },
  {
    "name": "Pulpo",
    "scientificName": "Octopoda",
    "description": "Los pulpos son cefalópodos marinos muy inteligentes, conocidos por sus ocho brazos y su capacidad de camuflaje.",
    "habitat": "Océanos de todo el mundo",
    "diet": "Carnívoro (crustáceos, peces)",
    "image": "https://www.bab.com.ar/wp-content/uploads/2019/04/Pulpo.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Octopoda",
    "category": "Invertebrado"
  },
  {
    "name": "Perico",
    "scientificName": "Melopsittacus undulatus",
    "description": "El perico, también conocido como periquito, es una pequeña y carismática ave psitaciforme extremadamente popular por su naturaleza sociable, su gran inteligencia y su vistoso plumaje. En estado silvestre destacan por su brillante color verde y amarillo con distintivas ondulaciones negras, aunque hoy en día existen en una enorme variedad de colores. Son aves muy activas, curiosas y ruidosas, famosas por su capacidad para imitar sonidos e incluso palabras humanas. Tienen un fuerte instinto de rebaño, formando vínculos muy estrechos con su pareja y su grupo.",
    "habitat": "Matorrales, sabanas y praderas abiertas (originario de Australia)",
    "diet": "Granívoro (Semillas, frutas y verduras)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Wellensittich_maennchen_wildfarben.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Melopsittacus_undulatus",
    "category": "Ave"
  },
  {
    "name": "Búho",
    "scientificName": "Strigiformes",
    "description": "Los búhos son aves rapaces nocturnas extraordinarias, perfectamente adaptadas para la caza en la oscuridad. Destacan por sus enormes ojos orientados hacia adelante, que les proporcionan una excelente visión nocturna, y su asombrosa capacidad para girar la cabeza hasta 270 grados para compensar su incapacidad de mover los ojos en sus órbitas. Otra de sus adaptaciones más notables es la estructura de sus plumas, que amortigua el sonido y les permite un vuelo completamente silencioso para sorprender a sus presas. Son cazadores precisos y fundamentales para mantener el equilibrio en sus ecosistemas.",
    "habitat": "Diversos entornos a nivel mundial, incluyendo bosques, selvas, montañas e incluso zonas urbanas",
    "diet": "Carnívoro (Pequeños mamíferos, insectos, reptiles y otras aves)",
    "image": "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_2711514.webp?w=1600&h=2236&p=top",
    "wikiUrl": "https://es.wikipedia.org/wiki/Strigiformes",
    "category": "Ave"
  },
  {
    "name": "Gallina",
    "scientificName": "Gallus gallus domesticus",
    "description": "La gallina es el ave más numerosa del planeta, domesticada hace miles de años. Es conocida principalmente por su capacidad para poner huevos y por su complejo comportamiento social en parvadas, donde establecen una estricta jerarquía conocida como 'orden de picoteo'. Son aves muy activas y curiosas que pasan gran parte del día escarbando el suelo en busca de alimento. Además, disfrutan de darse baños de tierra y polvo, una práctica instintiva y esencial para mantener su plumaje limpio y libre de parásitos.",
    "habitat": "Granjas, zonas rurales y entornos domésticos a nivel mundial",
    "diet": "Omnívoro (Semillas, insectos, vegetales y pequeños invertebrados)",
    "image": "https://www.fincacasarejo.com/Docs/Productos/gallina-Sulmtaler-pareja.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Gallus_gallus_domesticus",
    "category": "Ave"
  },
  {
    "name": "Lagarto Acorazado Arnadillo",
    "scientificName": "Ouroborus catapharactus",
    "description": "Originario de Sudáfrica, este peculiar lagarto es conocido por su singular mecanismo de defensa: enrollarse en forma de bola y morderse la cola. Al hacerlo, se asemeja al antiguo símbolo del Ouroboros, lo cual se refleja en el nombre científico de la especie. El lagarto armadillo se alimenta principalmente de pequeños invertebrados. Es uno de los pocos lagartos que da a luz crías vivas (en lugar de poner huevos).",
    "habitat": "África (específicamente, Sudáfrica)",
    "diet": "termitas, pequeños invertebrados eje: escorpiones",
    "image": "https://www.activewild.com/wp-content/uploads/2023/04/Armadillo-Girdled-Lizard.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Ouroborus_cataphractus",
    "category": "Reptil"
  },
  {
    "name": "Tortuga gigante asiática de caparazón blando",
    "scientificName": "Pelochelys cantorii",
    "description": "Originaria del sudeste asiático, esta tortuga de agua dulce es una de las tortugas de caparazón blando más grandes y, al igual que otras tortugas de caparazón blando, posee un caparazón aplanado y coriáceo. Es principalmente carnívora y se alimenta de peces, crustáceos y moluscos. Esta tortuga de aspecto peculiar se encuentra en peligro crítico de extinción debido a la pérdida de su hábitat y la caza excesiva para el consumo de su carne.",
    "habitat": "Asia (Sudeste Asiático)",
    "diet": "Carnívora (Peces, crustáceos y moluscos)",
    "image": "https://www.activewild.com/wp-content/uploads/2022/06/Asian-Giant-Softshell-Turtle.jpg",
    "wikiUrl": "https://en-wikipedia-org.translate.goog/wiki/Asian_giant_softshell_turtle?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
    "category": "Reptil"
  },
  {
    "name": "Eslizones de lengua azul",
    "scientificName": "Tiliqua spp",
    "description": "Originarios de Australia, estos llamativos reptiles son conocidos por sus lenguas de un azul intenso, que exhiben ante posibles depredadores como una forma de exhibición de sobresalto (la visión de la lengua azul del lagarto puede asustar al depredador, permitiéndole escapar). Los eslizones de lengua azul son omnívoros y se alimentan de una variedad de plantas, insectos y pequeños animales",
    "habitat": "Australia",
    "diet": "Omnívoro (Plantas, insectos y pequeños animales)",
    "image": "https://www.activewild.com/wp-content/uploads/2018/04/blue-tongued-skink.jpg",
    "wikiUrl": "https://en-wikipedia-org.translate.goog/wiki/Blue-tongued_skink?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
    "category": "Reptil"
  },
  {
    "name": "Lagarto cocodrilo chino",
    "scientificName": "Shinisaurus crocodilurus",
    "description": "Este lagarto semiacuático, originario de China y Vietnam, tiene una apariencia distintiva, con escamas carenadas en el dorso y la cola que recuerdan a las de un cocodrilo. Se alimenta de diversos insectos, invertebrados y peces pequeños. Este peculiar lagarto se encuentra en peligro de extinción debido a la pérdida de su hábitat y a la caza furtiva para su venta como mascota",
    "habitat": "Asia (China y Vietnam)",
    "diet": "Carnívoro (Insectos, invertebrados y peces pequeños)",
    "image": "https://www.activewild.com/wp-content/uploads/2023/04/Chinese-Crocodile-Lizard.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Shinisaurus_crocodilurus",
    "category": "Reptil"
  },
  {
    "name": "Geckos voladores",
    "scientificName": "Gekko spp",
    "description": "Originarios del sudeste asiático, estos geckos arborícolas (que habitan en los árboles) poseen adaptaciones especializadas, como pliegues de piel y patas palmeadas, que les permiten planear distancias cortas entre los árboles. Se alimentan principalmente de insectos y otros pequeños invertebrados.",
    "habitat": "Asia (Sudeste Asiático)",
    "diet": "Carnívoro (Insectos y otros pequeños invertebrados)",
    "image": "https://www.activewild.com/wp-content/uploads/2023/04/Kuhls-Flying-Gecko-Ptychozoon-kuhli-CC.jpg",
    "wikiUrl": "https://es.wikipedia.org/wiki/Ptychozoon",
    "category": "Reptil"
  }
]
