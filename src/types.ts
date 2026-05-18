export type AnimalCategory =
  | "Mamífero"
  | "Ave"
  | "Reptil"
  | "Anfibio"
  | "Pez"
  | "Invertebrado"

export interface Animal {
  id: string
  name: string
  scientificName: string
  description: string
  habitat: string
  diet: string
  image: string
  wikiUrl: string
  category: AnimalCategory
}

export type AnimalInput = Omit<Animal, "id">
