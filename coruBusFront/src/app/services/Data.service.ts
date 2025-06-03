import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Linea } from '../models/linea';
import { Parada, ParadaInfo } from '../models/paradas';
import { Idioma } from '../models/Idioma';
import { IdiomaService } from './Idioma.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private http: HttpClient,
    private _IdiomaService: IdiomaService
  ) {}

  public chargeLineas(): Observable<string> {
    return this.fetchDataByLanguage<Linea[]>('/api/getLineas', 'lineasData');
  }

  public chargeParadas(): Observable<string> {
    return this.fetchDataByLanguage<Parada[]>('/api/getParadas', 'paradasData');
  }

  // Devuelve los datos para la parada solicitada
  public getDatosParada(idParada: number): Observable<ParadaInfo> {
    return this.http.post<ParadaInfo>('/api/getBusesParada', idParada);
  }

  // Emcapsula la lógica común para los metodos de carga de datos
  private fetchDataByLanguage<T>(
    endpoint: string,
    storageKey: string
  ): Observable<string> {
    const idioma = this._IdiomaService.getIdiomaActual();
    const idiomaRequest: Idioma = { idioma };

    return this.http.post<T>(endpoint, idiomaRequest).pipe(
      tap((response) => {
        sessionStorage.setItem(storageKey, JSON.stringify(response));
        localStorage.setItem('idioma', idioma);
      }),
      map(() => 'ok')
    );
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
