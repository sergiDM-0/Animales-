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
      "https://images.unsplash.com/photo-1513628253939-010e64ac66cd?auto=format&fit=crop&q=80&w=800",
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
      "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&q=80&w=800",
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
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
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
      "https://images.unsplash.com/photo-1564349683136-77e08bef1ef1?auto=format&fit=crop&q=80&w=800",
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
]
