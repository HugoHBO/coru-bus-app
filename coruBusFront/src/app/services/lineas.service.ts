import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LineasService {
  private lineaSeleccionada: any = null;

  setLinea(linea: any) {
    this.lineaSeleccionada = linea;
    localStorage.setItem('linea', JSON.stringify(linea));
  }

  getLinea(): any {
    if (this.lineaSeleccionada) return this.lineaSeleccionada;

    const guardada = localStorage.getItem('linea');
    if (guardada) {
      this.lineaSeleccionada = JSON.parse(guardada);
      return this.lineaSeleccionada;
    }

    return null;
  }
}
