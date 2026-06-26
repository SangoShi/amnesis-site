export interface Character {
  nameRu: string;
  nameEn: string;
  codename: string;
  slug: string;
  status: 'active' | 'inactive' | 'frozen' | 'unknown';
  rarity: 'green' | 'red' | 'blue';
  classification: string;
  mutationsRu: string;
  mutationsEn: string;
  locationRu: string;
  locationEn: string;
  genderRu: string;
  genderEn: string;
  universe: string;
  type: 'character';
  tags: string[];
  portrait: string;
  order: number;
  body: string;
  name: string;
  mutations: string;
  location: string;
  gender: string;
}

export interface FloraFauna {
  nameRu: string;
  nameEn: string;
  slug: string;
  rarity: 'green' | 'red' | 'blue';
  type: 'flora' | 'fauna';
  dangerLevel: 'safe' | 'predator' | 'peaceful';
  universe: string;
  tags: string[];
  portrait: string;
  order: number;
  body: string;
  name: string;
}

export interface Universe {
  slug: string;
  nameRu: string;
  nameEn: string;
  descriptionRu: string;
  descriptionEn: string;
  status: 'locked' | 'active';
  order: number;
}

export interface Artifact {
  nameRu: string;
  nameEn: string;
  slug: string;
  rarity: 'green' | 'red' | 'blue';
  descriptionRu: string;
  descriptionEn: string;
  owner: string;
  universe: string;
  portrait: string;
  order: number;
  body: string;
  name: string;
}

export interface Faction {
  nameRu: string;
  nameEn: string;
  slug: string;
  descriptionRu: string;
  descriptionEn: string;
  universe: string;
  members: string[];
  portrait: string;
  order: number;
  body: string;
  name: string;
}

export type Locale = 'ru' | 'en';
