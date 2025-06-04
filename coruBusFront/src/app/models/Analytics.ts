export interface Parada {
  Id: number;
  Count: number
}

export interface ParadasCounter {
  Paradas: Parada[];
}

export interface TopParada {
  id: number;
  count: number;
}

export type TopParadas = TopParada[];