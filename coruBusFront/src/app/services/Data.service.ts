import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Linea } from '../models/linea';
import { Parada, ParadaInfo } from '../models/paradas';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  // carga las lineas -> devuelve observable ok
  public chargeLineas(): Observable<string> {
    const datosGuardados = sessionStorage.getItem('lineasData');
    if (datosGuardados) {
      return of('ok');
    } else {
      return this.http.get<Linea[]>('/api/getLineas').pipe(
        tap((response) => {
          sessionStorage.setItem('lineasData', JSON.stringify(response));
        }),
        map(() => 'ok')
      );
    }
  }

  // carga las paradas -> devuelve observable ok
  public chargeParadas(): Observable<string> {
    const datosGuardados = sessionStorage.getItem('paradasData');
    if (datosGuardados) {
      return of('ok');
    } else {
      return this.http.get<Parada[]>('/api/getParadas').pipe(
        tap((response) => {
          sessionStorage.setItem('paradasData', JSON.stringify(response));
        }),
        map(() => 'ok')
      );
    }
  }

  // Devuelve los datos para la parada solicitada
  public getDatosParada(idParada: number): Observable<ParadaInfo> {
    
    return this.http.post<ParadaInfo>('/api/getBusesParada', idParada);
  }

  // comprueba si session storage está activado -> devuelve boolean
  public checkSessionStorage(): boolean {
    try {
      const testKey = '__test__';
      sessionStorage.setItem(testKey, '1');
      sessionStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}
