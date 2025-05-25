export interface Parada {
  id: number;
  nombre: string;
  posx: number;
  posy: number;
  enlaces: number[];
}

export interface Bus {
  bus: number;
  tiempo: string;
  distancia: string;
  estado: number;
  ult_parada: number;
}

export interface Bus {
  bus: number;
  tiempo: string;
  distancia: string;
  estado: number;
  ult_parada: number;
}

export interface LineaInfo {
  linea: number;
  buses: Bus[];
}

export interface ParadaInfo {
  parada: number;
  lineas: LineaInfo[];
}


