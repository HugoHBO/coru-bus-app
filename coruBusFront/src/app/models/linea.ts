export interface Ruta {
  ruta: number;
  nombre_orig: string;
  nombre_dest: string;
  paradas: number[];
}

export interface Linea {
  id: number;
  lin_comer: string;
  nombre_orig: string;
  nombre_dest: string;
  color: string;
  rutas: Ruta[];
}

