export interface Pokemon {
    id: string;
    name: string;
    imgSrc: string;
    weight?: number;
    height?: number;
    ability?: string;
    stats?: Array<BaseStat>;
    species: Species;
}

export interface BaseStat {
    name: string;
    colorClass: string;
    value: number;
}

export interface Species {
    name: string;
    url: string
    description?: string;
    evolutionUrl?: string;
}