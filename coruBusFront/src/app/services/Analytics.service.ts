import { Injectable } from '@angular/core';
import { ParadasCounter } from '../models/Analytics';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly url = 'https://tu-backend.com/api/paradasCounter';

  constructor(private http: HttpClient) {
    // Arranca el intervalo nada más crearse el servicio
    // this.startSending();
  }

  // private startSending(): void {
  //   setInterval(() => {
  //     this.postParadasCounter();
  //   }, 60000); // cada 1 minuto
  // }

  public postParadasCounter(): void {
    const stored = localStorage.getItem('paradasCounter');
    if (!stored) return;

    const paradasCounter = JSON.parse(stored);

    this.http.post(this.url, paradasCounter).subscribe({
      next: () => {
        localStorage.removeItem('paradasCounter');
        console.log('Paradas enviadas y eliminadas del localStorage');
      },
      error: (err) => {
        console.error('Error al enviar paradas:', err);
      },
    });
  }

  public incrementParadaCount(id: number): void {
    const stored = localStorage.getItem('paradasCounter');
    let paradas: ParadasCounter[] = stored ? JSON.parse(stored) : [];

    const parada = paradas.find((p) => p.id === id);

    if (parada) {
      parada.count++;
    } else {
      paradas.push({ id, count: 1 });
    }

    localStorage.setItem('paradasCounter', JSON.stringify(paradas));
  }
}
