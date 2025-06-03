import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdiomaService {

  private idiomaSubject = new BehaviorSubject<string>(this.getIdiomaActual());
  idioma$ = this.idiomaSubject.asObservable(); // esto lo usan los componentes/servicios

  constructor() {}

  // selector de idioma. default "es"
  public selectLanguage(idiomaSeleccionado: string): void {
    localStorage.setItem('idioma', idiomaSeleccionado);
    this.idiomaSubject.next(idiomaSeleccionado); // emitimos el nuevo idioma
  }

   public getIdiomaActual(): string {
    return localStorage.getItem('idioma') ?? 'es';
  }
}
