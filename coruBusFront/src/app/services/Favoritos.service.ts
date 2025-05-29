import { Injectable } from '@angular/core';
import { Parada } from '../models/paradas';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritosService {  

  private favoritosSubject = new BehaviorSubject<Parada[]>(this.cargarFavoritos());  

  //** Observable para suscribirse a los cambios en favoritos */
  public favoritos$: Observable<Parada[]> = this.favoritosSubject.asObservable();

  //#region Public methods ------

  //** Devuelve la lista actual de favoritos en memoria */
  getFavoritos(): Parada[] {
    return this.favoritosSubject.getValue();
  }

  //** Añade una parada a favoritos si no está ya en la lista */
  addFavorito(parada: Parada): void {
    const actuales = this.getFavoritos();
    if (!actuales.some(fav => fav.id === parada.id)) {
      const nuevos = [...actuales, parada];
      this.guardarFavoritos(nuevos);
    }
  }

  //** Elimina una parada de favoritos por su id */
  eliminarFavorito(paradaId: number): void {
    const actuales = this.getFavoritos();
    const nuevos = actuales.filter(fav => fav.id !== paradaId);
    this.guardarFavoritos(nuevos);
  }

  //** Comprueba si una parada está en favoritos */
  esFavorito(paradaId: number): boolean {
    return this.getFavoritos().some(fav => fav.id === paradaId);
  }

  //#endregion -------------------

  //#region Private methods -----

  private cargarFavoritos(): Parada[] {
    const favoritosStr = localStorage.getItem('favoritos');
    return favoritosStr ? JSON.parse(favoritosStr) : [];
  }

  private guardarFavoritos(favoritos: Parada[]) {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.favoritosSubject.next(favoritos);
  }

  //#endregion -------------------
}
