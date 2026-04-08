export interface Animal {
  id: string
  name: string
  scientificName: string
  description: string
  habitat: string
  diet: string
  image: string
  wikiUrl: string
  category: "Mamífero" | "Ave" | "Reptil" | "Anfibio" | "Pez" | "Invertebrado"
}

export const animals: Animal[] = [
  {
    id: "1",
    name: "León",
    scientificName: "Panthera leo",
    description:
      "El león es un mamífero carnívoro de la familia de los félidos y una de las cinco especies del género Panthera. Los leones salvajes viven en poblaciones cada vez más dispersas y fragmentadas del África subsahariana y una pequeña zona del noroeste de la India.",
    habitat: "Sabanas y pastizales",
    diet: "Carnívoro",
    image:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800",
    wikiUrl: "https://es.wikipedia.org/wiki/Panthera_leo",
    category: "Mamífero",
  },
  {
    id: "2",
    name: "Elefante Africano",
    scientificName: "Loxodonta africana",
    description:
      "El elefante africano de sabana es un mamífero proboscídeo de la familia de los elefántidos. Es el animal terrestre más grande que existe en la actualidad. Se caracteriza por su gran inteligencia y fuertes lazos familiares.",
    habitat: "Sabanas, bosques y desiertos",
    diet: "Herbívoro",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800",
    wikiUrl: "https://es.wikipedia.org/wiki/Loxodonta_africana",
    category: "Mamífero",
  },
  {
    id: "3",
    name: "Pingüino Emperador",
    scientificName: "Aptenodytes forsteri",
    description:
      "El pingüino emperador es una especie de ave esfenisciforme de la familia Spheniscidae. Es el más grande y pesado de todos los pingüinos y es endémico de la Antártida.",
    habitat: "Antártida",
    diet: "Carnívoro (peces y crustáceos)",
    image:
      "https://images.unsplash.com/photo-1661353913861-6f6f41bc40fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    wikiUrl: "https://es.wikipedia.org/wiki/Aptenodytes_forsteri",
    category: "Ave",
  },
  {
    id: "4",
    name: "Tigre de Bengala",
    scientificName: "Panthera tigris tigris",
    description:
      "El tigre de Bengala es una subespecie de tigre que habita en la India, Nepal, Bangladés, Bután, Birmania y Tíbet. Es el tigre más numeroso y el animal nacional de la India y Bangladés.",
    habitat: "Selvas tropicales y sabanas",
    diet: "Carnívoro",
    image:
      "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
    wikiUrl: "https://es.wikipedia.org/wiki/Panthera_tigris_tigris",
    category: "Mamífero",
  },
  {
    id: "5",
    name: "Águila Real",
    scientificName: "Aquila chrysaetos",
    description:
      "El águila real es una de las aves de presa más conocidas y ampliamente distribuidas de la Tierra. Como todas las águilas, pertenece a la familia Accipitridae.",
    habitat: "Montañas y acantilados",
    diet: "Carnívoro",
    image:
      "https://plus.unsplash.com/premium_photo-1661876880987-ba2efad30296?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWd1aWxhJTIwcmVhbHxlbnwwfHwwfHx8MA%3D%3D",
    wikiUrl: "https://es.wikipedia.org/wiki/Aquila_chrysaetos",
    category: "Ave",
  },
  {
    id: "6",
    name: "Tortuga Verde",
    scientificName: "Chelonia mydas",
    description:
      "La tortuga verde es una especie de tortuga marina de la familia Cheloniidae. Es una de las tortugas marinas más grandes y la única que es principalmente herbívora cuando es adulta.",
    habitat: "Océanos tropicales y subtropicales",
    diet: "Herbívoro",
    image:
      "https://plus.unsplash.com/premium_photo-1684358604861-485e918547fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    wikiUrl: "https://es.wikipedia.org/wiki/Chelonia_mydas",
    category: "Reptil",
  },
  {
    id: "7",
    name: "Panda Gigante",
    scientificName: "Ailuropoda melanoleuca",
    description:
      "El panda, oso panda o panda gigante es una especie de mamífero del orden de los carnívoros y aunque hay gran controversia al respecto, los últimos estudios de su ADN lo engloban entre los miembros de la familia de los osos.",
    habitat: "Bosques de bambú en China",
    diet: "Herbívoro (principalmente bambú)",
    image:
      "https://images.unsplash.com/photo-1707478491406-36d8e44c10ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    wikiUrl: "https://es.wikipedia.org/wiki/Ailuropoda_melanoleuca",
    category: "Mamífero",
  },
  {
    id: "8",
    name: "Delfín Mular",
    scientificName: "Tursiops truncatus",
    description:
      "El delfín mular o delfín nariz de botella es una especie de cetáceo odontoceto de la familia Delphinidae. Es la especie de delfín más común y conocida.",
    habitat: "Océanos cálidos y templados",
    diet: "Carnívoro (peces y calamares)",
    image:
      "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&q=80&w=800",
    wikiUrl: "https://es.wikipedia.org/wiki/Tursiops_truncatus",
    category: "Mamífero",
  },
  {
    
      id: "9",
      name: "Rana Arborícola",
      scientificName: "Hylidae",
      description: "Las ranas arborícolas son anfibios fascinantes maravillosamente adaptados a la vida en las alturas. Se caracterizan por poseer discos adhesivos en las puntas de sus dedos, lo que les permite trepar y adherirse a troncos, ramas y hojas con gran destreza. Además de sus colores vibrantes, que a menudo utilizan como camuflaje o como señal de advertencia para los depredadores, destacan por sus potentes cantos nocturnos, fundamentales para la comunicación y el apareamiento en los ecosistemas húmedos.",
      habitat: "Bosques tropicales y subtropicales",
      diet: "Insectívoro",
      image: "https://assets.epuzzle.info/puzzle/079/520/original.jpg",
      wikiUrl: "https://es.wikipedia.org/wiki/Hylidae",
      category: "Anfibio"
  
  },
  {
    
      id: "10",
      name: "Pez Payaso",
      scientificName: "Amphiprioninae",
      description: "El pez payaso es un pequeño pez marino mundialmente reconocido por su vibrante color naranja brillante cruzado por franjas blancas. Su rasgo más fascinante es la relación simbiótica que establece con las anémonas de mar: gracias a una capa de mucosa especial en su piel, es inmune a las toxinas de la anémona, usando sus tentáculos como refugio seguro contra depredadores mientras él mismo limpia y protege a la anémona. Además, tienen una jerarquía social única donde todos nacen machos y el individuo dominante puede cambiar de sexo a hembra.",
      habitat: "Arrecifes de coral en los océanos Índico y Pacífico",
      diet: "Omnívoro",
      image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV6JTIwcGF5YXNvfGVufDB8fDB8fHww",
      wikiUrl: "https://es.wikipedia.org/wiki/Amphiprioninae",
      category: "Pez"
  
  },
  {
  
      id: "11",
      name: "Mariposa Monarca",
      scientificName: "Danaus plexippus",
      description: "La mariposa monarca es uno de los insectos más reconocidos del mundo, famosa por sus inconfundibles alas de color naranja brillante con venas negras y bordes punteados de blanco. Esta llamativa coloración es una advertencia para los depredadores de que son venenosas, característica que adquieren en su etapa de oruga al alimentarse exclusivamente de la planta de algodoncillo. Además de su belleza, son mundialmente famosas por su increíble migración anual, realizando un viaje épico de miles de kilómetros desde Estados Unidos y Canadá hasta los bosques de oyamel en México para pasar el invierno.",
      habitat: "Praderas, campos y bosques de Norteamérica (inverna en los bosques de oyamel de México)",
      diet: "Herbívoro (Néctar de flores)",
      image: "https://wallpapers.com/images/hd/male-orange-monarch-butterfly-close-up-shot-84khcbg379em2lue.jpg",
      wikiUrl: "https://es.wikipedia.org/wiki/Danaus_plexippus",
      category: "Invertebrado"
  
  },
  {
    id: "12",
    name: "Canguro",
    scientificName: "Macropus",
    description:
      "Los canguros son marsupiales endémicos de Australia, conocidos por sus fuertes patas traseras y su forma de moverse a saltos.",
    habitat: "Llanuras y bosques en Australia",
    diet: "Herbívoro",
    image:
      "https://wallpapers.com/images/featured/canguro-9884nd4b35ojdy2t.jpg",
    wikiUrl: "https://es.wikipedia.org/wiki/Macropus",
    category: "Mamífero",
  },
  {
    id: "13",
    name: "Colibrí",
    scientificName: "Trochilidae",
    description:
      "Los colibríes son aves pequeñas conocidas por su capacidad de volar en el mismo sitio y por alimentarse principalmente del néctar de las flores.",
    habitat: "América (desde Alaska hasta Tierra del Fuego)",
    diet: "Nectarívoro",
    image:
      "https://images.pexels.com/photos/705314/pexels-photo-705314.jpeg",
    wikiUrl: "https://es.wikipedia.org/wiki/Trochilidae",
    category: "Ave",
  },
  {
    id: "14",
    name: "Pulpo",
    scientificName: "Octopoda",
    description:
      "Los pulpos son cefalópodos marinos muy inteligentes, conocidos por sus ocho brazos y su capacidad de camuflaje.",
    habitat: "Océanos de todo el mundo",
    diet: "Carnívoro (crustáceos, peces)",
    image:
      "https://www.bab.com.ar/wp-content/uploads/2019/04/Pulpo.jpg",
    wikiUrl: "https://es.wikipedia.org/wiki/Octopoda",
    category: "Invertebrado",
  },
  {
    id: "15",
    name: "Perico",
    scientificName: "Melopsittacus undulatus",
    description: "El perico, también conocido como periquito, es una pequeña y carismática ave psitaciforme extremadamente popular por su naturaleza sociable, su gran inteligencia y su vistoso plumaje. En estado silvestre destacan por su brillante color verde y amarillo con distintivas ondulaciones negras, aunque hoy en día existen en una enorme variedad de colores. Son aves muy activas, curiosas y ruidosas, famosas por su capacidad para imitar sonidos e incluso palabras humanas. Tienen un fuerte instinto de rebaño, formando vínculos muy estrechos con su pareja y su grupo.",
    habitat: "Matorrales, sabanas y praderas abiertas (originario de Australia)",
    diet: "Granívoro (Semillas, frutas y verduras)",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Wellensittich_maennchen_wildfarben.jpg",
    wikiUrl: "https://es.wikipedia.org/wiki/Melopsittacus_undulatus",
    category: "Ave"
  },
  {
    id: "16",
    name: "Búho",
    scientificName: "Strigiformes",
    description: "Los búhos son aves rapaces nocturnas extraordinarias, perfectamente adaptadas para la caza en la oscuridad. Destacan por sus enormes ojos orientados hacia adelante, que les proporcionan una excelente visión nocturna, y su asombrosa capacidad para girar la cabeza hasta 270 grados para compensar su incapacidad de mover los ojos en sus órbitas. Otra de sus adaptaciones más notables es la estructura de sus plumas, que amortigua el sonido y les permite un vuelo completamente silencioso para sorprender a sus presas. Son cazadores precisos y fundamentales para mantener el equilibrio en sus ecosistemas.",
    habitat: "Diversos entornos a nivel mundial, incluyendo bosques, selvas, montañas e incluso zonas urbanas",
    diet: "Carnívoro (Pequeños mamíferos, insectos, reptiles y otras aves)",
    image: "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_2711514.webp?w=1600&h=2236&p=top",
    wikiUrl: "https://es.wikipedia.org/wiki/Strigiformes",
    category: "Ave"
  },
  
  {
    id: "17",
    name: "Gallina",
    scientificName: "Gallus gallus domesticus",
    description: "La gallina es el ave más numerosa del planeta, domesticada hace miles de años. Es conocida principalmente por su capacidad para poner huevos y por su complejo comportamiento social en parvadas, donde establecen una estricta jerarquía conocida como 'orden de picoteo'. Son aves muy activas y curiosas que pasan gran parte del día escarbando el suelo en busca de alimento. Además, disfrutan de darse baños de tierra y polvo, una práctica instintiva y esencial para mantener su plumaje limpio y libre de parásitos.",
    habitat: "Granjas, zonas rurales y entornos domésticos a nivel mundial",
    diet: "Omnívoro (Semillas, insectos, vegetales y pequeños invertebrados)",
    image: "https://www.fincacasarejo.com/Docs/Productos/gallina-Sulmtaler-pareja.jpg",
    wikiUrl: "https://es.wikipedia.org/wiki/Gallus_gallus_domesticus",
    category: "Ave"
  },
  
];
