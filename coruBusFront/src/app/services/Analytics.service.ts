import { Injectable } from '@angular/core';
import { ParadasCounter, TopParadas } from '../models/Analytics';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './AppConfig.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  /** recibe los datos de top3 paradas del api */
  public getTopParadas(): void {
    this.http.get(this.appConfig.apiUrl + '/getTopParadas').subscribe({
      next: (data) => {
        if (data) {
          localStorage.setItem('topParadas', JSON.stringify(data));
        }
      },
      error: (err) => {
        console.error('Error al obtener top paradas:', err);
      },
    });
  }

  /**  envía los datos de las paradas justo antes de cerrar la aplicación */
  public postParadasCounter(): void {
    const stored = localStorage.getItem(
      this.appConfig.apiUrl + 'paradasCounter'
    );
    if (!stored) return;

    const paradasCounter = JSON.parse(stored);

    // miro si sendBeacon está disponible en el navegador
    if (navigator.sendBeacon) {
      const url = '/sendParadasData';
      const data = JSON.stringify(paradasCounter);

      // Creao un Blob con el contenido JSON y el tipo correcto
      const blob = new Blob([data], { type: 'application/json' });

      // mando datos con sendBeacon (no bloquea el cierre)
      const enviado = navigator.sendBeacon(url, blob);

      if (enviado) {
        // si se envia correctamente, eliminamos el localStorage
        localStorage.removeItem('paradasCounter');
        console.log(
          'Paradas enviadas con sendBeacon y eliminadas del localStorage'
        );
      } else {
        console.warn('No se pudo enviar con sendBeacon, intentando con POST');
        // enviar con POST como fallback (menos fiable al cerrar)
        this.sendParadasPost(paradasCounter);
      }
    } else {
      // si no existe sendBeacon, envia con POST
      this.sendParadasPost(paradasCounter);
    }
  }

  /** método auxiliar para enviar por HTTP POST tradicional*/
  private sendParadasPost(data: any): void {
    this.http.post(this.appConfig.apiUrl + '/sendParadasData', data).subscribe({
      next: () => {
        localStorage.removeItem('paradasCounter');
        console.log('Paradas enviadas y eliminadas del localStorage (POST)');
      },
      error: (err) => {
        console.error('Error al enviar paradas:', err);
      },
    });
  }

  /** crea o ingrementa el numero de clics */
  public incrementParadaCount(id: number): void {
    const stored = localStorage.getItem('paradasCounter');
    let paradasCounter: ParadasCounter = stored
      ? JSON.parse(stored)
      : { Paradas: [] };
    const parada = paradasCounter.Paradas.find((p) => p.Id === id);
    if (parada) {
      parada.Count++;
    } else {
      paradasCounter.Paradas.push({ Id: id, Count: 1 });
    }
    localStorage.setItem('paradasCounter', JSON.stringify(paradasCounter));
  }

  /** devuelve el top de paradas de localStorage */
  public topParadas(): TopParadas | null {
    const top = localStorage.getItem('topParadas');
    return top ? JSON.parse(top) : null;
  }
}
